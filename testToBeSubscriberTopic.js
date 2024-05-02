// Author : Chaloemsak Arsung
//////////////////////////////////////////////////////////////////
// ======================= Dev: Mike016 ======================= //
//////////////////////////////////////////////////////////////////

// Test to be subscriber (Open new window VScode to run this code on your pc)
const mqtt = require("mqtt");
// MQTT options
const mqttOptions = {
    host: "YOURhivemqtthostURL.s1.eu.hivemq.cloud",
    port: 8883,
    protocol: "mqtts",
    username: "usernameAccess",
    password: "password",
  };
// Initialize the MQTT client
const mqttClient = mqtt.connect(mqttOptions);
// Setup MQTT client callbacks
mqttClient.on("connect", function () {
  console.log("Connected to MQTT broker");
});
// Detect error
mqttClient.on("error", function (error) {
  console.error("MQTT Error:", error);
});

//Subscribe to the 'temp' topic
mqttClient.on("message", function (topic, message) {
    console.log('topic: ' ,topic.toString(),' message arrived :', message.toString());
});
// sub temp topic from hive mqtt clound for test to be subscriber
mqttClient.subscribe("fan");
mqttClient.subscribe("led");

console.log("Author : Chaloemsak Arsung");
console.log('//////////////////////////////////////////////////////////////////');
console.log("// ======================= Dev: Mike016 ======================= //");
console.log('//////////////////////////////////////////////////////////////////');
