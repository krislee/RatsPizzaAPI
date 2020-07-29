const express = require ('express')
const RatRouter = express.Router()
const {index, create, update, destroy} = require('../controllers/Rat.js')

// GET ALL RATS
RatRouter.get("/", index)

// CREATE NEW RATS
RatRouter.post("/", create)

// UPDATE A RAT
RatRouter.put("/:id", update)

// DESTROY A RAT
RatRouter.delete("/:id", destroy)

module.exports = RatRouter