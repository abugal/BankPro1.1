const mongoose = require('mongoose')

const Schema = mongoose.Schema

const genLedgerSchema = new Schema({
    
        senderId: {
            type: Number,
        },
        receiverId: {
            type: Number,
        },
        receiverFName: {
            type: String,
        },
        receiverLName: {
            type: String,
        },
        senderFName: {
            type: String,
        },
        senderLName: {
            type: String,
        },
        amount: {
            type: Number,
        },
        desc: {
            type: String
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model('genLedger', genLedgerSchema)