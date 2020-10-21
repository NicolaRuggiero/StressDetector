#include <dht_nonblocking.h>
#define DHT_SENSOR_TYPE DHT_TYPE_11

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include "wifi_cred.h"

static const int DHT_SENSOR_PIN = 2;
DHT_nonblocking dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

ESP8266WebServer server(80);   //instantiate server at port 80 (http port)

// Set your Static IP address
IPAddress local_IP(192, 168, 1, 134);
// Set your Gateway IP address
IPAddress gateway(192, 168, 1, 1);

IPAddress subnet(255, 255, 0, 0);
IPAddress primaryDNS(8, 8, 8, 8);   //optional
IPAddress secondaryDNS(8, 8, 4, 4); //optional
 
String page = "";
double dataT;
double dataH;


void setup() {
  // put your setup code here, to run once:  
  delay(1000);
  Serial.begin(115200);
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
  Serial.println("STA Failed to configure");
  }
  WiFi.begin(WIFI_SSID, WIFI_PW); //begin WiFi connection
  Serial.println("");
  
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  server.on("/", [](){
    page = "<h1>Sensor to Node MCU Web Server</h1><h3>Data:</h3> <h4>Temp: "+String(dataT)+" deg. C</h4> <h4>Humidity: "+String(dataH)+"%</h4>";
    server.send(200, "text/html", page);
  });
  
  server.begin();
  Serial.println("Web server started!");
}

static bool measure_environment(float *temperature, float *humidity)
{
  static unsigned long measurement_timestamp = millis();

  if(millis() - measurement_timestamp > 3000ul)
  {
    if(dht_sensor.measure(temperature, humidity) == true)
    {
      measurement_timestamp = millis();
      return true;
    }
  }
  return false;
}

void loop() {
  // put your main code here, to run repeatedly:
  float temperature;
  float humidity;

  unsigned long timestamp = millis();
  if(measure_environment(&temperature, &humidity) == true)
  {
    Serial.print("T = ");
    Serial.print(temperature, 1);
    Serial.print("°C, hum = ");
    Serial.print(humidity, 1);
    Serial.println("%");
    dataT = temperature;
    dataH = humidity;
    delay(1000);
    server.handleClient();
  }
}
