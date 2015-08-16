/*
 * Autores:
 * Andres Sabas <s@theinventorhouse.org>
 * Iddar Olivares <iddar@dbug.mx>
 * Creado: Julio 2015
 * Contador de personas con
 * ESP8266 Version 12
 */

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>
#include <Hash.h>

#define SSID "Wifi Name"
#define PASSWORD "Wifi password"
#define SERVER_PORT 3000
#define SERVER_IP "104.236.241.103"
#define USE_SERIAL Serial

WebSocketsClient webSocket;
int StatusFlag = 0;

void webSocketEvent(WStype_t type, uint8_t * payload, size_t lenght) {
  switch(type) {
    case WStype_DISCONNECTED:
      USE_SERIAL.printf("[WSc] Disconnected!\n");
      break;
    case WStype_CONNECTED:
      USE_SERIAL.print("[WSc] Connected to url:dbug.mx ");
      break;
  }

}

void setup() {
  pinMode(4,INPUT);
  pinMode(13,INPUT);
  pinMode(5,OUTPUT);

  attachInterrupt(13, inPeople, RISING);
  attachInterrupt(4, outPeople, RISING);
  digitalWrite(5,HIGH);

  //Informacion de Depuración
  USE_SERIAL.begin(115200);
  USE_SERIAL.setDebugOutput(true);

  USE_SERIAL.println();
  USE_SERIAL.println();

  for(uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }

  //Conexion al servidor
  webSocket.begin(SERVER_IP, SERVER_PORT);
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
  //Activacion de interrupciones
  attachInterrupt(13, inPeople, RISING);
  attachInterrupt(4, outPeople, RISING);

  // Envio de datos a servidor
  if(StatusFlag == 1) {
    webSocket.sendTXT("in", 2);
    StatusFlag = 0;
    USE_SERIAL.println("in");
  }

  if(StatusFlag == 2) {
    webSocket.sendTXT("out", 3);
    StatusFlag = 0;
    USE_SERIAL.println("out");
  }

  delay(1500);
}

void inPeople() {
  while(digitalRead(13))
   {
    detachInterrupt(4);
   }

   StatusFlag = 1;
}

void outPeople() {
  while(digitalRead(4))
   {
     detachInterrupt(13);
   }

    StatusFlag = 2;
}
