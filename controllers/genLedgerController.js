const Transaction = require("../models/genLedgerModel");
const mongoose = require('mongoose')

// GET all transactions
const getTransactions = async (req, res) => {
    const transactions = await Transaction.find({}).sort({createdAt: -1})

    res.status(200).json(transactions)
}


// GET a single transaction
const getTransaction = async (req, res) => {
    const { id } = req.params 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'The transaction doesnt exist'})
    }

    const transaction = await Transaction.findById(id)

    if (!transaction) {
        return res.status(404).json({error: "There is no such transaction"})
    }

    res.status(200).json(transaction)

}

// CREATE a new transction
const createTransaction = async (req, res) => {
    const {
      senderId,
      receiverId,
      receiverFName,
      receiverLName,
      senderLName,
      amount,
      desc,
    } = req.body;

    // add a transaction to the database
    try {
      const transaction = await Transaction.create({
        senderId,
        receiverId,
        receiverFName,
        receiverLName,
        senderLName,
        amount,
        desc,
      });
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

// DELETE a transaction
const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "The transaction doesnt exist" });
    }

    const transaction = await Transaction.findByIdAndDelete({_id: id})

    if (!transaction) {
      return res.status(400).json({ error: "There is no such transaction" });
    }
    
    res.status(200).json(transaction)

}

// UPDATE a transction
const updateTransaction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "The transaction doesnt exist" });
    }

    const transaction = await Transaction.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!transaction) {
      return res.status(400).json({ error: "There is no such transaction" });
    }

    res.status(200).json(transaction)
}

module.exports = {
    getTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction
    
}