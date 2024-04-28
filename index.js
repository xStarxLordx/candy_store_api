const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Candy = require("./models/candy.model");
const User = require("./models/user.model");
const candyRoute = require("./routes/candy.route");
const jsonwebtoken = require("jsonwebtoken")
const JWT_SECRET ="1234567890qwertyuiopasdfghjklñzxcvbnm"
const bcryptjs = require("bcryptjs");
const cors= require("cors");
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(4000, () => {
    console.log("Server running")
})

// Database conection
mongoose.connect('mongodb+srv://adminF:CAMJy9qWXN57lGYX@cluster0.1vdxgk7.mongodb.net/CANDY?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected!')
    })
    .catch(() => {
        console.log("Conection failed")
    }).catch((e)=> console.log(e))

// Candy routes
app.use("/api/candy", candyRoute)

// User routes



app.get("/", (req, res) => {
    res.send("Hello from Node API...");
});

// User SignIn

app.post("/api/users/SignIn", async (req, res) => {
    const {email, password} = req.body;
    console.log("try to signin")
    try {
        const checkUser = await User.findOne({email});
        console.log("pass check user "+checkUser)
        console.log("Found password: "+checkUser.password+" Given password: "+password)
        if (!checkUser) {
            console.log("Check user signin false")
            return res.send({status:"Email not found"})
        }
        if( await bcryptjs.compare(password, checkUser.password) ){
            console.log("Pass compare passwords")
            const token = jsonwebtoken.sign({email:checkUser.email}, JWT_SECRET)
            if(res.status(201)){
                return res.json({status:"ok", data: token})
            }else{
                console.log("error on else")
                return res.json({error: "error"})
            }
        }
        res.json({status: "error", error: "Wrong password"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})


// User SignUp

app.post("/api/users/SignUp", async (req, res) => {
    console.log("try to add user")
    const {userName, email, password} = req.body;
    const encryptedPsw = await bcryptjs.hash(password, 10)
    try {
        const checkUser = await User.findOne({email});
        console.log(checkUser)
        if (checkUser) {
            console.log("Check user true")
            return res.json({status:"Email already exists"})
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

})  

// Get User

app.post("/api/users/geUser", async(req, res)=>{
    console.log("try to get user")
    const { token } = req.body;
    try{
        const user = await jsonwebtoken.verify(token,JWT_SECRET);
        User.findOne({email:user.email})
        .then((data) => {
            res.send({status:"ok", data:data});
        })
        .catch((error) => {
            res.send({status:"error", data: error})
        })
    }catch(error){
        console.log("error")
        res.status(500).json({ message: error.message })
    }
})


