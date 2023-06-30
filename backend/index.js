require("dotenv").config();

const mongoose = require("mongoose");

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      process.env.DB_URI
    );
  } catch (e) {
    console.log("could not connect");
  }

const yourSchema = new mongoose.Schema({
    time: Date,
    svgData: String,
    contentType: String
  });

// create a Mongoose model for the 'messages' collection
const Message = mongoose.model('messages', yourSchema);

// For backend and express
const express = require("express");
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");

app.use(express.json());
app.use(cors());
app.get("/", async (req, resp) => {
  resp.send("IADMFR Worldmap backend is Working");
});

app.post("/message", async (req, resp) => {
    const request = req.body
    
    const newMessage = new Message({
        time: new Date(),
        svgData: request.data,
        contentType: 'image/svg+xml'
    })
    // newMessage.save();
    console.log("Message posted")
});

app.get("/message", async (req, resp) => {
    resp.send({data: 'answerr'})
});

app.listen(5000);
