const { Timestamp, Collection } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        userName:{
                type: String,
                required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    },
    
)

const User = mongoose.model("User", UserSchema)
module.exports = User;