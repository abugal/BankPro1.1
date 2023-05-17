const express = require('express')
const {
    createTransaction,
    getTransactions,
    getTransaction,
    deleteTransaction,
    updateTransaction
} = require('../controllers/genLedgerController')


const router = express.Router()


// GET all transactions
router.get('/', getTransactions)

// GET a SINGLE transaction
router.get('/:id', getTransaction)

// POST a new transaction
router.post('/', createTransaction)

// DELET a transaction
router.delete('/:id', deleteTransaction)

// UPDATE a transaction
router.patch('/:id', updateTransaction)



module.exports = router