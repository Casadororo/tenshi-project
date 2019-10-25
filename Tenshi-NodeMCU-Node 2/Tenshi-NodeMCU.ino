#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>

#define FIREBASE_HOST "tenshi-project.firebaseio.com"
#define FIREBASE_AUTH "TZrqd8FgKpN1Ov5V1oMeiSDbITxoMN2FwpZ6aPq5"
#define WIFI_SSID "TCC"
#define WIFI_PASSWORD "daniellindo"

String nodeId = "IoNEEAiafnI142QKeR9P";
FirebaseData con;
//bool led, porta;
//String switchs[10];
int ports[6] = {1, 2, 3, 4, 5, 6};

void setup()
{
  Serial.begin(115200);

  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
  pinMode(D3, OUTPUT);
  pinMode(D4, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(D6, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  delay(1000);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  delay(1000);
}
//-----------------------------------------------------------------------------------
void loop() {
  delay(3000);
  for (int x = 0; x < 6; x++) {
    if (Firebase.getString(con, "/node/" + nodeId + "/D"+ports[x]+ "/stats")) {
      Serial.println("PASSED");
      Serial.println("PATH: " + con.dataPath());
      Serial.println("TYPE: " + con.dataType());
      Serial.print("VALUE: ");
      if (con.dataType() == "int")
        Serial.println(con.intData());
      else if (con.dataType() == "float")
        Serial.println(con.floatData(), 5);
      else if (con.dataType() == "boolean")
        Serial.println(con.boolData() == 1 ? "true" : "false");
      else if (con.dataType() == "string")
        Serial.println(con.stringData());
      else if (con.dataType() == "json")
        Serial.println(con.jsonData());
      Serial.println("------------------------------------");
      Serial.println();
     switch (ports[x]) {
        case 1:
          if (con.stringData() == "true")
            digitalWrite(D1, HIGH);
          else
            digitalWrite(D1, LOW);
          break;

        case 2:
          if (con.stringData() == "true")
            digitalWrite(D2, HIGH);
          else
            digitalWrite(D2, LOW);
          break;

        case 3:
          if (con.stringData() == "true")
            digitalWrite(D3, HIGH);
          else
            digitalWrite(D3, LOW);
          break;

        case 4:
          if (con.stringData() == "true")
            digitalWrite(D4, HIGH);
          else
            digitalWrite(D4, LOW);
          break;

        case 5:
          if (con.stringData() == "true")
            digitalWrite(D5, HIGH);
          else
            digitalWrite(D5, LOW);
          break;

        case 6:
          if (con.stringData() == "true")
            digitalWrite(D6, HIGH);
          else
            digitalWrite(D6, LOW);
          break;
      }
    }
    else
    {
      Serial.println("FAILED");
      Serial.println("REASON: " + con.errorReason());
      Serial.println("------------------------------------");
      Serial.println();
    }
  }


  /*
    if (Firebase.getString(con, "/users/" + uid + "/switchs")) {
    String switchRetrived = con.stringData();
    Serial.println("" + switchRetrived);
    int index = 0;
    int cont = 0;
    while (switchRetrived.indexOf(".", index) != -1) {
      int tempIndex = switchRetrived.indexOf(".", index);
      switchs[cont] = switchRetrived.substring(index, tempIndex);
      ports[cont] = switchRetrived.substring(tempIndex + 2, tempIndex + 3).toInt();
      index = tempIndex + 4;
      cont++;
    }
    for (int x = 0; x < cont; x++) {
      Serial.println("Switch:" + switchs[x] + " Port:" + ports[x]);
      if (Firebase.getBool(con, "/users/" + uid + "/" + switchs[x] + "/stats")) {
        Serial.println("PASSED");
        Serial.println("PATH: " + con.dataPath());
        Serial.println("TYPE: " + con.dataType());
        Serial.print("VALUE: ");
        if (con.dataType() == "int")
          Serial.println(con.intData());
        else if (con.dataType() == "float")
          Serial.println(con.floatData(), 5);
        else if (con.dataType() == "boolean")
          Serial.println(con.boolData() == 1 ? "true" : "false");
        else if (con.dataType() == "string")
          Serial.println(con.stringData());
        else if (con.dataType() == "json")
          Serial.println(con.jsonData());
        Serial.println("------------------------------------");
        Serial.println();

        switch (ports[x]) {
          case 1:
            if (con.boolData())
              digitalWrite(D1, HIGH);
            else
              digitalWrite(D1, LOW);
            break;

          case 2:
            if (con.boolData())
              digitalWrite(D2, HIGH);
            else
              digitalWrite(D2, LOW);
            break;

          case 3:
            if (con.boolData())
              digitalWrite(D3, HIGH);
            else
              digitalWrite(D3, LOW);
            break;

          case 4:
            if (con.boolData())
              digitalWrite(D4, HIGH);
            else
              digitalWrite(D4, LOW);
            break;

          case 5:
            if (con.boolData())
              digitalWrite(D5, HIGH);
            else
              digitalWrite(D5, LOW);
            break;

          case 6:
            if (con.boolData())
              digitalWrite(D6, HIGH);
            else
              digitalWrite(D6, LOW);
            break;
        }
      }
      else
      {
        Serial.println("FAILED");
        Serial.println("REASON: " + con.errorReason());
        Serial.println("------------------------------------");
        Serial.println();
      }
    }
    }*/
}
