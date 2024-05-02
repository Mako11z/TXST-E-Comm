const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4oefzyg.mongodb.net/?retryWrites=true&w=majority&appName=commerce`;

exports.createTransaction = async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db("ecommerce");
        let Transaction = database.collection("carts");

        const { items, userName } = req.body;  // Extract userName from the incoming request
        if (!userName) {
            res.status(400).json({ message: "User name is required" });
            return;
        }
        
        const newTransaction = await Transaction.insertOne({ items, userName });
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(400).json({ message: "Failed to create transaction", error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db("ecommerce");
        const Transaction = database.collection("carts");
        const transactions = await Transaction.find().toArray();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Failed to get transactions", error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    const client = new MongoClient(uri);
    const transactionId = req.params.id;  // ID from the URL parameters
    try {
      await client.connect();
      const database = client.db("ecommerce");
      let transactionsCollection = database.collection("carts");
  
      // Convert transactionId to ObjectId
      const objectId = new ObjectId(transactionId);
  
      const deletedTransaction = await transactionsCollection.deleteOne({_id: objectId});
      if (deletedTransaction.deletedCount === 0) {  // Check if the document was deleted
        return res.status(404).json({ message: "Transaction not found!" });
      }
      res.status(200).json({message: "Transaction deleted successfully!"})
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      await client.close();  // Ensure the client is closed after operations
    }
  };