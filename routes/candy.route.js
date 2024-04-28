const express = require("express")
const Candy = require("../models/candy.model")
const router = express.Router();
const {getCandy, getCandies, createCandy, updateCandy, deleteCandy} = require("../controller/candy.controller")

router.get("/", getCandies)

router.get("/name", getCandy)

router.post("/", createCandy)

router.put("/", updateCandy)

router.delete("/", deleteCandy)

module.exports = router;