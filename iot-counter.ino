/* 
 * Por Andres Sabas e Iddar
 * Julio 2015
 * Contador de personas con
 * ESP8266 Version 12
 */

volatile int pwm_value = 0;
volatile int prev_time = 0;
volatile int personas = 0;

void setup() {
  Serial.begin(115200);
  // when pin GPIO4 goes high, call the rising function
  //attachInterrupt(4, rising, RISING);
  pinMode(4,INPUT);
  pinMode(5,OUTPUT);
  pinMode(13,INPUT);
  analogWriteFreq(30000);
  analogWrite(5,1023);
  analogWrite(12,1023);
  attachInterrupt(4, contador, RISING);
  attachInterrupt(13, contador2, RISING);
}
 
void loop() { }
 
void contador() {
  personas++; 
  Serial.println(personas);
  while(digitalRead(4))
  {
    
  }
}
 
void contador2() {
  
  personas--;  
}
