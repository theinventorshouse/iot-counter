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

WebSocketsClient webSocket;


const char* ssid     = "Wifi Name";
const char* password = "Wifi password";

#define USE_SERIAL Serial
int a=0;

void webSocketEvent(WStype_t type, uint8_t * payload, size_t lenght) {

  switch(type) {
    case WStype_DISCONNECTED:
      USE_SERIAL.printf("[WSc] Disconnected!\n");
      break;
    case WStype_CONNECTED:
      USE_SERIAL.printf("[WSc] Connected to url: %s\n",  payload);
      break;
      // echo data back to Server
      
      
      if(a==1){
        webSocket.sendTXT("in", 2);  
      }
      break;
      if(a==2){
        webSocket.sendTXT("out", 3);
        a=0;
        break;  
      }
      
  }

}


void setup() {
  pinMode(4,INPUT);
  pinMode(13,INPUT);
  pinMode(5,OUTPUT);
  
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

  webSocket.begin("192.168.0.43", 8080);
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
}

void inPeople() {
  while(digitalRead(13))
   {
    detachInterrupt(4);
   }
    a=1;
}

void outPeople() {
  //webSocket.sendTXT("out", 3);
   
  while(digitalRead(4))
   {
     detachInterrupt(13); 
   }
    a=2;
}
