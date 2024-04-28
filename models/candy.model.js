const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");



const CandySchema = mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Please enter the name."]
        },

        type: {
            type: String,
            required: [true, "Please enter the type of candy (Chocolate, Cookie, Hard candy...)"]
        },
        
        details: {
            type: String,
            required: [false]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price:{
            type: Number,
            required: [true, "Please enter the price of the candy."]
        },
    },
    {
        timestamps: true,
    }
);

const Candy = mongoose.model("Candy", CandySchema)


module.exports = Candy;
