#include "main.h"
#include <stdio.h>
#include "timer.h"

extern volatile uint32_t timer7_tick;
extern volatile uint32_t count_sec;

struct DHT22_Data{
	float temperature;
	float humdity;
}typedef dht22_data_t;



uint8_t getTempData_DHT22(char* buffer);