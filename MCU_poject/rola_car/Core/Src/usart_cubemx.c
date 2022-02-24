/*-----------------------------------------------------------------------------
 * Name:    usart_user.c
 * Purpose: STDOUT User Template
 * Rev.:    1.0.0
 *-----------------------------------------------------------------------------*/
 
 
#include "stm32f0xx.h"                  // Device header
#include "RTE_Components.h"             // Component selection

//-------- <<< Use Configuration Wizard in Context Menu >>> --------------------

// <h>STDOUT USART Interface

//   <o>USART Clock
#define USART_CLK               48000000u
//   <o>Baudrate
 #define USART_BAUDRATE         115200u

// Define  USART
#define USARTx  USART2
  
 /**
  Initialize stdout
  \return          0 on success, or -1 on error.
*/
void stdout_init (void) {

#ifdef RTE_Compiler_IO_STDOUT_User
  RCC->AHBENR  |=  (   1ul << 17);         /* Enable GPIOA clock              */
  RCC->APB1ENR |=  (   1ul << 17);         /* Enable USART#2 clock            */

  /* Configure PA3 to USART2_RX, PA2 to USART2_TX */
  GPIOA->AFR[0] &= ~((15ul << 4* 2) | (15ul << 4* 3));
  GPIOA->AFR[0] |=  (( 1ul << 4* 2) | ( 1ul << 4* 3));
  GPIOA->MODER  &= ~(( 3ul << 2* 2) | ( 3ul << 2* 3));
  GPIOA->MODER  |=  (( 2ul << 2* 2) | ( 2ul << 2* 3));

  USARTx->BRR  = USART_CLK/USART_BAUDRATE;         /* 115200 baud @ 48MHz   */

	 /* no flow control, 1 stop bit             */
  USARTx->CR1   = ((   1ul <<  2) |        /* enable RX                       */
                   (   1ul <<  3) |        /* enable TX                       */
                   (   0ul << 12) |        /* 1 start bit, 8 data bits        */
                   (   1ul <<  0) );       /* enable USART                    */
#endif
  
}


/*---------------------------------------------------------------------------*/
//  Put a character to the stdout
//     \param[in]   ch  Character to output
//     \return          The character written, 
/*---------------------------------------------------------------------------*/
int stdout_putchar (int ch) {

#ifdef RTE_Compiler_IO_STDOUT_User
  while (!(USARTx->ISR & (1ul << 7)));            // check bit 7 if transmit data register empty ? 1 means empty
		
     USARTx->TDR = (ch & 0x1FF);                  // put the data to Transmit data register ; only bit 0 - 8 is valuable
	                                                // bit 9 - 31 have to keep 0   
#endif
  return (ch);
}

 
/*-----------------------------------------------------------------------------*/
// Initialize stdin
/*-----------------------------------------------------------------------------*/
void stdin_init (void) {
  
#ifndef RTE_Compiler_IO_STDOUT_User
  RCC->AHBENR  |=  (   1ul << 17);         /* Enable GPIOA clock              */
  RCC->APB1ENR |=  (   1ul << 17);         /* Enable USART#2 clock            */

  /* Configure PA3 to USART2_RX, PA2 to USART2_TX */
  GPIOA->AFR[0] &= ~((15ul << 4* 2) | (15ul << 4* 3));
  GPIOA->AFR[0] |=  (( 1ul << 4* 2) | ( 1ul << 4* 3));
  GPIOA->MODER  &= ~(( 3ul << 2* 2) | ( 3ul << 2* 3));
  GPIOA->MODER  |=  (( 2ul << 2* 2) | ( 2ul << 2* 3));

	USARTx->BRR  = USART_CLK/USART_BAUDRATE;         /* 115200 baud @ 48MHz   */
	
#endif
	
#ifdef RTE_Compiler_IO_STDIN_User	

	 /* no flow control, 1 stop bit             */
  USARTx->CR1   |= ((  1ul <<  2) |        /* enable RX                       */
                    (  1ul <<  0) );       /* enable USART                    */
#endif	
	
}
 
 
/*----------------------------------------------------------------------------*/
//  Get a character from stdin
//  \return     The next character from the input, or -1 on read error.
/*----------------------------------------------------------------------------*/
int stdin_getchar (void) {
  int receive_buf;
   	
#ifdef RTE_Compiler_IO_STDIN_User
  while (!(USARTx->ISR & USART_ISR_RXNE))
      receive_buf= USARTx->RDR;
#endif
  return (receive_buf);
	
}
 