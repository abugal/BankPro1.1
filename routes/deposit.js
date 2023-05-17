const express = require('express')
const {
  getDeposits,
  getDeposit,
  createDeposit,
  deleteDeposit,
  updateDeposit
} = require("../controllers/depositController");
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

// fire the middlewire function before any other function
router.use(requireAuth)

//GET all deposits
router.get('/', getDeposits)

//GET a single deposit
router.get("/:id", getDeposit);

// POST a new deposit
router.post("/", createDeposit );

// DELETE a deposit
router.delete("/:id", deleteDeposit);

// UPDATE deposit
router.patch("/:id", updateDeposit);

module.exports = router