
const Candy = require("../models/candy.model")

const getCandies = async (req, res) => {

    try {
        const candy = await Candy.find({});
        res.status(200).json(candy);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
const getCandy = async (req, res) => {

    try {
        const { id } =req.params;
        const candy = await Candy.findOne({name:id});
        res.status(200).json(candy);
        console.log(res.body)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const createCandy = async (req, res) => {
    try {
        const candy = await Candy.create(req.body);
        res.status(200).json(candy)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateCandy = async (req, res) => {
    try {
        
        const candy = await Candy.findByIdAndUpdate(req.body._id, req.body)

        console.log(req.body._id)
        if (!candy) {
            console.log("candy not found")
            return res.status(404).json({ message: "This candy does not exists" })
        }
        const updatedCandy = await Candy.findById(req.body._id)
        res.status(200).json(updatedCandy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCandy = async (req, res) => {
    try {
        
        const candy = await Candy.findByIdAndDelete(req.body._id)
        console.log("delete function started "+req.body._id)
        if (!candy) {
            console.log("candy not found")
            return res.status(404).json({ message: "This candy does not exists" })
        }
        console.log(candy.name+" DELETED")
        res.status(200).json({ message: "Candy deleted: " + candy.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getCandy,
    getCandies,
    createCandy,
    updateCandy,
    deleteCandy
}
