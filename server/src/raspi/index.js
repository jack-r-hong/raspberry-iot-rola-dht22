"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaspiHandler = void 0;
const raspi = __importDefault(require("raspi"));
const Serial = require("raspi-serial").Serial;
const PrismaClient = require("@prisma/client").PrismaClient;

// sudo systemctl stop serial-getty@ttyAMA0.service

const prisma = new PrismaClient();

class RaspiHandler {
  recHand = new ReceiveHandler();
  isOK = false;
  constructor() {
    if (!this.isOK) {
      this.run();
    }
  }

  run() {
    raspi.init(() => {
      const serial = new Serial({baudRate: 115200});
      serial.open(() => {
        serial.on('data', (data) => {
          this.recHand.readLines(data.toString('utf8'));
        });
        serial.write('AT\r\n');
      });
    });
  }
}
exports.RaspiHandler = RaspiHandler;

class ReceiveHandler {
  tempBuffer = '';

  readLines(rec) {
    this.tempBuffer += rec;
    const endIndex = this.tempBuffer.indexOf('\n');

    if (~endIndex) {
      console.log(this.tempBuffer);

      const data = this.atRcvHandle(this.tempBuffer);
      if (data) {
        prisma.dht22.create({
          data: {
            humi: data.humi,
            temp: data.temp,
          },
        }).catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
        // return result;
      }

      this.tempBuffer = this.tempBuffer.substr(endIndex + 1);
    }
  }

  atRcvHandle() {
    if (this.tempBuffer.includes('+RCV')) {
      const jsonStart = this.tempBuffer.indexOf('{');
      const jsonEnd = this.tempBuffer.lastIndexOf('}');
      const jsonStr = this.tempBuffer.substring(jsonStart, jsonEnd + 1);
      const json = JSON.parse(jsonStr);
      return json;
    }
    return false;
  }
}

