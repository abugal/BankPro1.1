const mongoose = require('mongoose')

const Schema = mongoose.Schema

const depositSchema = new Schema(
    {
            customerId: {
            type: Number,
            },

            name: {
            type: String,
            required: true
            },

            amount: {
            type: Number,
            required: true
            },

            user_id: {
              type: String,
              required: true
            }
    },
    {
        timestamps: true,
    },  
    { collection: "depositData" }
    ); 

    module.exports = mongoose.model("DepositModel", depositSchema);