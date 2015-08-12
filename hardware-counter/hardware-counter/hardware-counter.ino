/* 
 * Autores: 
 * Andres Sabas <sabasjimenez@gmail.com>
 * Iddar Olivares <iddar@dbug.mx>
 * Creado: Julio 2015
 * Contador de personas con
 * ESP8266 Version 12
 */

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>
#include <Hash.h>

WebSocketsClient webSocket;


const char* ssid     = "INFINITUM38FA71";
const char* password = "22B578FD01";

#define USE_SERIAL Serial

void webSocketEvent(WStype_t type, uint8_t * payload, size_t lenght) {

  switch(type) {
    case WStype_DISCONNECTED:
      USE_SERIAL.printf("[WSc] Disconnected!\n");
      break;
    case WStype_CONNECTED:
      USE_SERIAL.printf("[WSc] Connected to url: %s\n",  payload);
      break;
  }

}


void setup() {
  pinMode(4,INPUT);
  pinMode(13,INPUT);
  pinMode(0,INPUT);
  pinMode(5,OUTPUT);
  pinMode(12,OUTPUT);
  
  attachInterrupt(0, inPeople, RISING);
  attachInterrupt(4, inPeople, RISING);
  attachInterrupt(13, outPeople, RISING);
  
  USE_SERIAL.begin(115200);
  USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println();
  USE_SERIAL.println();

  for(uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }
      
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }

  webSocket.begin("192.168.1.65", 3000);
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
}

void inPeople() {
  webSocket.sendTXT("in", 2);
}

void outPeople() {
  webSocket.sendTXT("out", 3);
}
