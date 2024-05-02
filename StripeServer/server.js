import express from "express";
import cors from "cors";
import { config } from "dotenv";
import stripePackage from "stripe";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import path from 'path'; // Import the path module
import fs from 'fs'; // Import the fs module
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables from .env file
config();

const stripe = new stripePackage(process.env.STRIPE_SECRET_TEST);

const PORT = 5050;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Middleware to enable CORS
app.use(cors({
  origin: "*",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// Resolve __dirname and __filename
const __filenameFromUrl = fileURLToPath(import.meta.url);
const __dirname = dirname(__filenameFromUrl);

const jsonFilePath = path.join(__dirname, '../Frontend/src/products.json');

// Serve JSON data
app.get("/products", cors(), (req, res) => {
  // Read the JSON file and send it as a response
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.status(200).json(JSON.parse(data));
  });
});

// Route for updating JSON data
app.post("/updateData", cors(), (req, res) => {
  const newData = req.body;

  // Write the updated JSON data to the file
  fs.writeFile(jsonFilePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Data updated successfully' });
  });
});

// Delete item from json file
app.delete("/deleteItem/:id", cors(), (req, res) => {
  const itemId = req.params.id;
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading from JSON file', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    let jsonData = JSON.parse(data);
    const index = jsonData.findIndex(item => item.id === itemId);
    if (index === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    jsonData.splice(index, 1);
    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to json file', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    })
  })
});

// Route for processing payments
app.post("/payment", cors(), async (req, res) => {
  let { amount, id, return_url } = req.body;
  console.log("amount",amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Item 1",
      payment_method: id,
      confirm: true,
      return_url
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment Successful",
      success: true
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false
    });
  }
});

// Create a SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'team9cs4398@gmail.com',
        pass: 'ftup pxjx kjym oznh'
    }
});

// Route to handle email submission
app.post('/send-email', (req, res) => {
    const formData = req.body;

    // Compose email message
    const mailOptions = {
        from: formData.email,
        to: 'team9cs4398@gmail.com',
        subject: `New Message from ${formData.name}`,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    };

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.json({ success: false });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true });
        }
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
