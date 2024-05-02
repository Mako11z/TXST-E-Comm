const express = require('express');
const app = express();
const cors = require ("cors");
const mongoose = require("mongoose");


const port = process.env.port || 4000;
require('dotenv').config()


//middleware...
app.use(cors());
app.use(express.json());

//Mongodb config
//keep below's connection string to avoid futur Hu
// `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@commerce.oj3zjii.mongodb.net/?retryWrites=true&w=majority&appName=commerce`
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4oefzyg.mongodb.net/?retryWrites=true&w=majority&appName=commerce`
  )
  .then(
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  )
  .catch((error) => console.log("Unable to connect", error));




//import routes here
const userRoute = require('./api/routes/userRoute');
app.use('/users', userRoute);

const transactionRoutes = require('./api/routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

