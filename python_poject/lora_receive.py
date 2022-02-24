#!/usr/bin/python3
#coding=utf-8

from dotenv import load_dotenv

load_dotenv()

import pymysql

import serial
from time import sleep
import json
import os

SQL_HOST = os.getenv('SQL_HOST')
SQL_USER = os.getenv('SQL_USER')
SQL_PASSWORD = os.getenv('SQL_PASSWORD')
SQL_DATABASE = os.getenv('SQL_DATABASE')


print ("start\r\n") 

ser = serial.Serial ("/dev/ttyAMA0", 115200)    #Open port with baud rate

print (f"serial is open? {ser.is_open}\r\n") 
# ser.write(bytes("AT\r\n", 'utf-8')) 

# ser.write(bytes("AT+IPR=115200\r\n", 'utf-8'))

ser.write(bytes("AT+ADDRESS=50\r\n", 'utf-8'))

while True:
    sleep(0.1)
    received_data = ser.readline()
    decode_data = bytes(received_data).decode()

    try:
        if decode_data.index("+RCV") == 0:
            data = decode_data.split(",", 2)[2].rpartition(",")[0].rpartition(",")[0]
            print(decode_data)
            # print(data)
            data_p = json.loads(data)
            # print(data_p)
            # Open database connection
            connection = pymysql.connect(host=SQL_HOST,
                                        user=SQL_USER,
                                        password=SQL_PASSWORD,
                                        database=SQL_DATABASE,
                                        cursorclass=pymysql.cursors.DictCursor)            

            with connection:
                with connection.cursor() as cursor:
                    # Create a new record
                    sql = "INSERT INTO `dht22` (`temp`, `humi`) VALUES (%s, %s)"
                    cursor.execute(sql, (data_p['temp'] / 10, data_p['humi'] / 10))

                # connection is not autocommit by default. So you must commit to save
                # your changes.
                connection.commit()

    except:
        None