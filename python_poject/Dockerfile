FROM arm32v7/node as base

WORKDIR /usr/src/app/


RUN apt-get update
RUN apt-get install python3
RUN apt-get install -y  python3-pip
RUN pip install python-dotenv
RUN pip install PyMySQL
RUN pip install pyserial

COPY lora_receive.py .
COPY .env.dev .

