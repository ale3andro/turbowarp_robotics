#include <SoftwareSerial.h>
#include <TB6612FNG.h>

SoftwareSerial BTSerial(0, 1); // RX, TX
int btByte=0;

TB6612FNG tb_alx(5,4,6,7);
int value_x;
float duration;
int led=0;
const int trigPin = A0;
const int echoPin = 2;

void setup() 
{
  BTSerial.begin(9600);
  // TODO you setup code
  pinMode(trigPin, OUTPUT);  
	pinMode(echoPin, INPUT);
  pinMode(12, OUTPUT);
}

void loop() 
{ 
  if (BTSerial.available() > 0) {
    btByte = BTSerial.read();
    if (btByte==97) { // english letter a lowercase
          if (led==0) {
            digitalWrite(12, HIGH);
            Serial.println("HIGH");
            led=1;
          } else if (led==1) {
            digitalWrite(12, LOW);
            Serial.println("LOW");
            led=0;
          }
    }
  }
}