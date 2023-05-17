const Deposit = require("../models/depositModel");
const mongoose = require('mongoose')

// GET all deposit
const getDeposits = async (req, res) => {
    const user_id = req.user._id 

    const deposit = await Deposit.find({user_id}).sort({createdAt: -1})

    res.status(200).json(deposit)
}

// GET a single deposit
const getDeposit = async (req, res) => {
    const { id } = req.params

    // check if the Id is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "The record doesn't exist"})
    }

    const deposit = await Deposit.findById(id)

    if (!deposit) {
        return res.status(404).json({error: "The deposit doesn't exist"})
    }

    res.status(200).json(deposit)
}

// CREATE a new deposit
const createDeposit = async (req, res) => {
    const { customerId, name, amount } = req.body;
    
    let emptyFields = []

    if(!name) {
      emptyFields.push('name')
    }
    if(!amount) {
      emptyFields.push('amount')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Fill all the fields, please!', emptyFields})
    }

    // add record to the database
    try {      
      const user_id = req.user._id // grab the user id
      const deposit = await Deposit.create({ customerId, name, amount, user_id });
      res.status(200).json(deposit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

// DELETE a deposit
const deleteDeposit = async (req, res) => {
  const { id } = req.params;

  // check if the Id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The record doesn't exist" });
  }

  const deposit = await Deposit.findByIdAndDelete({_id: id})

  if (!deposit) {
    return res.status(400).json({ error: "The deposit doesn't exist" });
  }

  res.status(200).json(deposit)
}

// UPDATE a deposit

const updateDeposit = async (req, res) => {
  const { id } = req.params;

  // check if the Id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "The record doesn't exist" });
  }

  const deposit = await Deposit.findByIdAndUpdate({_id: id}, {
    ...req.body 
    })

    if (!deposit) {
      return res.status(400).json({ error: "The deposit doesn't exist" });
    }

    res.status(200).json(deposit)


}

module.exports = {
    getDeposits,
    getDeposit,
    createDeposit,
    deleteDeposit,
    updateDeposit    
}