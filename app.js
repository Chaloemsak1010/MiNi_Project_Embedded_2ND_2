// IDEA: Use a website as a publisher, passing data via an API to send topics and messages to HiveMQTT.
//       ESP32 devices will subscribe to HiveMQTT to receive these messages to turn on FAN and LED.

// Author : Chaloemsak Arsung
//////////////////////////////////////////////////////////////////
// ======================= Dev: Mike016 ======================= //
//////////////////////////////////////////////////////////////////

// Import 
const express = require("express");
const mqtt = require("mqtt");
var path = require('path');
// Create app express
const app = express();
// Add CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
// Express route to publish message
app.post("/publish", (req, res) => {
  const { topic, message } = req.body;
  //console.log(message);

  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message are required" });
  }
  // Publish message to the specified topic
  mqttClient.publish(topic, message, (err) => {
    if (err) {
      console.error("Error publishing message:", err);
      return res.status(500).json({ error: "Error publishing message" });
    }
    console.log("Published message to", topic , message);
    res.status(200).json({ message: "Message published successfully" });
  });
});
// for home page: http://localhost:3000/home
app.get("/home", (req, res) => {
    // Read the HTML file
    const htmlFilePath = path.join(__dirname, 'button.html');
    // Send the HTML file with additional text
    res.sendFile(htmlFilePath, (err) => {
        if (err) {
            console.error('Error sending file: ', err);
            res.status(err.status).end();
        } else {
            console.log('File sent successfully');
        }
    });
});
// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\nServer is running on port ${PORT}\n`);
  console.log("Author : Chaloemsak Arsung");
  console.log('//////////////////////////////////////////////////////////////////');
  console.log("// ======================= Dev: Mike016 ======================= //");
  console.log('//////////////////////////////////////////////////////////////////\n');
});
// Example for subscriber data (Optional)
// // Define a variable to store the latest MQTT message 
// let latestMessage = "";
// //Subscribe to the 'temp' topic
// mqttClient.on("message", function (topic, message) {
//     // Store the latest message
//     latestMessage = message.toString();
// });
// // sub temp topic from hive mqtt clound
// mqttClient.subscribe("temp");
// // for sub
// app.get("/sub", (req, res) => {
//     res.send({ t: latestMessage });
// });
