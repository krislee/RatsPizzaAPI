const Rat = require('../models/Rat.js')
const Pizza = require('../models/Pizza.js')

// INDEX - get all the rats with their pizzas

const index = async (req, res) => {
    try {
        // get array rats w/ pizza ids
        const allRats = await Rat.find({}) //gets all the Rats, but doesn't come automatically with the Pizza, so get Pizza for each rat
        // create a new array of rats w/ the pizza info (so we will take one array and make a new array using map function):
        // console.log(allRats)
        const rats = allRats.map(async (rat) => {
            // console.log(rat)
            const thePizza = await Pizza.findById(rat.pizza)
            // console.log(thePizza)
            return {
                _id: rat._id,
                name: rat.name, 
                pizza: thePizza //pizza = pizza model
            }
        })
        // console.log(rats)
        const rats2 = await Promise.all (rats) //don't do anything until all promises are resolved
        res.status(200).json(rats2)
    } catch(error) {
        res.status(400).send(error)
    }
}

const create = async (req, res) => {
    try {
        const newRat = await Rat.create(req.body)
        res.status(200).json(newRat)
    } catch(error) {
        res.status(400).send(error)
    }
}

const update = async (req, res) => {
    try {
        const updatedRat = await Rat.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedRat)
    } catch(error) {
        res.status(400).send(error)
    }
}

// DELETE

const destroy = async (req, res) => {
    try {
        const deletedRat= await Rat.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedRat)
    } catch(error) {
        res.status(400).send(error)
    }
}

module.exports = {index, create, update, destroy}