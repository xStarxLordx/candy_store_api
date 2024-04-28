const User = require("../models/user.model")
const express = require("express");
const app = express();
const bcryptjs = require("bcryptjs");
const cors= require("cors");
app.use(cors());

const createUser = async (req, res) => {
    console.log("try to add user")
    const {userName, email, password} = req.body;
    const encryptedPsw = await bcryptjs.hash(password, 10)
    try {
        const checkUser = await User.findOne({email});
        console.log(checkUser)
        if (checkUser) {
            console.log("Ccheck user true")
            return res.send({status:"Email already exists"})
        }
        await User.create({
            userName: userName,
            email: email,
            password: encryptedPsw,
        });
        console.log("fine")
        res.send({status:"ok"})
    } catch (error) {
        console.log("error")
        res.status(500).json({ message: error.message })
    }finally{console.log("Finish create user")}
}

module.exports = {
    createUser,
}