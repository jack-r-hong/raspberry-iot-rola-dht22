#include "timer.h"

extern  TIM_HandleTypeDef htim6;
#define TIM htim6
void delay (uint16_t time)
{
	/* change your code here for the delay in microseconds */
	HAL_TIM_Base_Start(&TIM);
	__HAL_TIM_SET_COUNTER(&TIM, 0);
	while ((__HAL_TIM_GET_COUNTER(&TIM))<time);
	HAL_TIM_Base_Stop(&TIM);
}