#include "main.h"

void rola_init(void);
void rola_IRQ_Handle(void);
void rola_send_at(void);
void rola_receive(void);
void show_now_data(void);
void rola_send(uint16_t address, char* data);