const express = require("express")
const User = require("../models/user.model")
const router = express.Router();
const {createUser} = require("../controller/user.controller")

/* router.get("/", getCandies)

router.get("/:id", getCandy) */

router.post("/registerUser", createUser)

/* router.put("/:id", updateCandy)

router.delete("/:id", deleteCandy)
 */
module.exports = router;