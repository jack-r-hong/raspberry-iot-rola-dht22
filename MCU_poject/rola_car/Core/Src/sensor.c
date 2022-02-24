#include "sensor.h"
#include <stdio.h>

volatile dht22_data_t dht22_data;


void Set_Pin_Output (GPIO_TypeDef *GPIOx, uint16_t GPIO_Pin)
{
	GPIO_InitTypeDef GPIO_InitStruct = {0};
	GPIO_InitStruct.Pin = GPIO_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
	HAL_GPIO_Init(GPIOx, &GPIO_InitStruct);
}

void Set_Pin_Input (GPIO_TypeDef *GPIOx, uint16_t GPIO_Pin)
{
	GPIO_InitTypeDef GPIO_InitStruct = {0};
	GPIO_InitStruct.Pin = GPIO_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
	GPIO_InitStruct.Pull = GPIO_PULLUP;
	HAL_GPIO_Init(GPIOx, &GPIO_InitStruct);
}

void DHT22_Start(void){
	Set_Pin_Output(DHT22_IO_GPIO_Port,  DHT22_IO_Pin);
	HAL_GPIO_WritePin  (DHT22_IO_GPIO_Port,  DHT22_IO_Pin,  1 ); 
	delay(50);
	HAL_GPIO_WritePin  (DHT22_IO_GPIO_Port,  DHT22_IO_Pin,  0 ); 
	delay(5);
	HAL_GPIO_WritePin  (DHT22_IO_GPIO_Port,  DHT22_IO_Pin,  1 ); 
}

uint8_t getTempData_DHT22(char* buffer){
	uint8_t dataFlag;
	uint32_t startTick;
	uint32_t pulseWidth;
	uint32_t data[43];
	uint32_t dataValue,parityData,calculateParity,dataTemp;
	uint32_t temperatureValue, humidityValue;
	float tempReal, humdityReal;
	
	dataFlag=1;
	
	DHT22_Start();
	
	Set_Pin_Input(DHT22_IO_GPIO_Port,  DHT22_IO_Pin);
	
	startTick = timer7_tick;
	
	for(int i=0; i<42; i++){
		pulseWidth=0;
		while(HAL_GPIO_ReadPin (DHT22_IO_GPIO_Port, DHT22_IO_Pin) == 0){
			pulseWidth++;
			if(timer7_tick - startTick >500){
				dataFlag=0;
				break;
			}
		}		
		
		while(HAL_GPIO_ReadPin (DHT22_IO_GPIO_Port, DHT22_IO_Pin)){
			pulseWidth++;
			if(timer7_tick - startTick >500){
				dataFlag=0;
				break;
			}
		}				
		
		data[i] = pulseWidth;
	}
	
//	for(int i=0; i<42;i++){
//		printf("data value %d = %d \n\r", i, data[i]);
//	}
	
	if(dataFlag==0){
		return dataFlag;
	}
	
	dataValue=0;
	parityData=0;
	for(int i=2; i<42; i++){
		if(i<34){
			if(data[i] >120)
				dataValue |= 0x1ul;
			if(i<33)
				dataValue = dataValue<<1;
			
		}else{
			if(data[i] >120)
				parityData |= 0x1ul;
			if(i<41)
				parityData = parityData<<1;			
		}
	}
	
//	printf("data value = %x\n\r",dataValue);
//	printf("parityData = %x\n\r",parityData);
	
	calculateParity=0;
	dataTemp=dataValue;
	
	for(int i=0; i<4; i++){
		calculateParity += (dataTemp & 0xfful);
		dataTemp >>= 8;
	}
	
//	printf("parity data = %x \n\r", calculateParity);
	
	if((calculateParity & 0xfful) == parityData){
		temperatureValue =dataValue & 0xfffful;
		humidityValue = (dataValue >> 16) & 0xfffful;
		
		
		
		tempReal = temperatureValue/10.0;
		humdityReal = humidityValue/10.0;
		
		dht22_data.temperature = tempReal;
		dht22_data.humdity = humdityReal;
		
		sprintf((char*)buffer, "{\"temp\": %d, \"humi\": %d}", temperatureValue, humidityValue);
		
		dataFlag = 1;
		

	}else{
		printf("parity check error.\n\r");
		dataFlag=0;
	}
	
	return dataFlag;
}