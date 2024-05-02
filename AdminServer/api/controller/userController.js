const { MongoClient, ObjectId  } = require('mongodb');
const User = require("../models/User");

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@commerce.oj3zjii.mongodb.net/?retryWrites=true&w=majority&appName=commerce`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4oefzyg.mongodb.net/?retryWrites=true&w=majority&appName=commerce`;


// Function to get all users available in database
async function getAllUsers(req, res) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db("ecommerce");
        const usersCollection = database.collection("users");
        const users = await usersCollection.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await client.close();
    }
}

// Function to post a new user
const createUser = async (req, res) => {
  const client = new MongoClient(uri);
  const user = req.body;
  
  try {
    await client.connect();
    const database = client.db("ecommerce");
    let usersCollection = database.collection("users");
    
    // Check if user with the same email already exists
    const existingUser = await usersCollection.findOne({ email: user.email });
    if (existingUser) {
      return res.status(302).json({ message: "User already exists!" });
    }
    const result = await usersCollection.insertOne(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
};

//Function to delete a user
const deleteUser = async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.params.id;
  try {
    await client.connect();
    const database = client.db("ecommerce");
    let usersCollection = database.collection("users");

    // Convert userId to ObjectId
    const objectId = new ObjectId(userId);

    const deletedUser = await usersCollection.deleteOne({_id: objectId});
    // if user not found
    if(!deletedUser){
        return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({message: "User deleted successfully!"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally{
    await client.close();
  }
};
/*
// get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = {email: email};
  try {
      // Fecth user
      const user = await User.findOne(query);
      // const user = await User.findOne({ email: user.email });
      // console.log(user)
      // if(email !== req.decoded.email){
         // return res.status(403).send({message: "Forbidden access"})
      //}
      //let admin = false;
      //if(user ){
       //   admin = user?.role === "admin";
     // }
      //res.status(200).json({admin})
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (email !== req.decoded.email) {
        return res.status(403).json({ message: 'Forbidden access' });
      }
      const isAdmin = user.role === "admin";
      res.status(200).json({ admin: isAdmin });
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
*/


const getAdmin = async (req, res) => {
  const email = req.params.email;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("ecommerce");
    const usersCollection = database.collection("users");
    
    const user = await usersCollection.findOne({ email }); // Directly fetching user by email
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is an admin
    const isAdmin = user.role === 'admin';

    // Respond with whether the user is an admin or not
    res.status(200).json({ admin: isAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
};





// make admin of a user
const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const {name, email, role} = req.body;
  try {
      const updatedUser = await User.findByIdAndUpdate(
          userId, 
          {role: "admin"},
          {new: true, runValidators: true}
      );

      if(!updatedUser){
          return res.status(404).json({message: "User not found"})
      }
      res.status(200).json(updatedUser)
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getAdmin,
    makeAdmin
};

