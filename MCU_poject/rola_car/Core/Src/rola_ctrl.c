#include "rola_ctrl.h"
#include "main.h"
#include <stdio.h>
#include "string.h"
extern UART_HandleTypeDef huart1;
#define UART huart1
#define MAX_BUFFER_SIZE 1024

volatile uint8_t rec_data[1024];
volatile uint8_t new_data_f = 0;
volatile uint8_t send_data_f = 1;

uint8_t rola_rx_data[MAX_BUFFER_SIZE];
volatile int rx_len=0;
uint8_t buffer;
char temp;
uint16_t count = 0;

void clear_buffer(){
	memset(rola_rx_data,0, rx_len);
	rx_len=0;
	HAL_UART_Receive_IT(&UART, &buffer,1);
}


void rola_init(void){
	clear_buffer();
	HAL_UART_Receive_IT(&UART, &buffer, 1);
}


void rola_send_at(void){
//	HAL_UART_Transmit_IT(&UART, (uint8_t *)"AT\r\n", 6);
	if(send_data_f){
		HAL_UART_Transmit(&UART, (uint8_t *)"AT+SEND=51,5,hhhhh\r\n", 20, 1000);
		send_data_f  = 0;
	}
	
}

void rola_send(uint16_t address, char* data){
//	HAL_UART_Transmit_IT(&UART, (uint8_t *)"AT\r\n", 6);
	if(send_data_f){
		char buffer[strlen(data)];
		
		sprintf(buffer, "AT+SEND=%d,%d,%s\r\n", address, strlen(data), data);
		
		
//		
//		printf("buffer: %s\r\n", buffer);
		HAL_UART_Transmit(&UART, (uint8_t *) buffer, strlen(buffer), 1000);
		send_data_f  = 0;
	}
	
}

void rola_IRQ_Handle(void){
	
	temp = USART1->RDR;
	
	if(temp == 0xA) {
		for(int i = 0; i < rx_len; i++ ){
			rec_data[i] = rola_rx_data[i];
		}
		new_data_f = 1;
		send_data_f = 1;
		
		clear_buffer();
	}else{
		rola_rx_data[rx_len] = temp;
		if(rx_len < MAX_BUFFER_SIZE)
			rx_len++;	
	}

}

void rola_receive(void){
	HAL_UART_Receive(&UART, rola_rx_data,20, 1000);
}

void show_now_data(void){
	if(new_data_f){
		count++;
		printf("recdata:\r\n%s\r\ncount:%d\r\n", rec_data, count);
		new_data_f = 0;
	}
}
