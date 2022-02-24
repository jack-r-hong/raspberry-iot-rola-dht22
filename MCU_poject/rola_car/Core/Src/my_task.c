#include "main.h"
#include "my_task.h"
#include "cmsis_os.h"
#include <stdio.h>
#include "rola_ctrl.h"
#include "sensor.h"


extern volatile dht22_data_t dht22_data;



void StartSendRolaDHT22(void *argument)
{
  /* USER CODE BEGIN 5 */
	char buffer[100];
  /* Infinite loop */
  for(;;)
  {
    osDelay(1);
//		sprintf(buffer, "{\"temp\": \"%d\", \"humd\": \"%d\"}", 1, 1);
		
//		sprintf((char*)buffer, "{\"temp\": \"%0.2f\", \"humd\": \"%0.2f\"}", dht22_data.temperature, dht22_data.humdity);

//		printf("buffer: %s\r\n", buffer);
		show_now_data();
		
  }
  /* USER CODE END 5 */
}

void StartReadDHT22Task(void *argument)
{
  /* USER CODE BEGIN StartReadDHT22Task */
	
  /* Infinite loop */
  for(;;)
  {
		char buffer[100];
    osDelay(1000);
		
		while(getTempData_DHT22(buffer));
		
		rola_send(50, buffer);
		

  }
  /* USER CODE END StartReadDHT22Task */
}