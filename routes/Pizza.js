const express = require('express')
const PizzaRouter = express.Router()
const {index, create, update, destroy} = require('../controllers/Pizza.js')

// ROUTES

// get all pizzas
PizzaRouter.get("/", index)

// create a new pizza
PizzaRouter.post("/", create)

// update a pizza
PizzaRouter.put("/:id", update)

// destroy a pizza
PizzaRouter.delete("/:id", destroy)

module.exports = PizzaRouter

// create endpoints and delivers JSON = API (some people can take the JSON data, but you don't need to inherently make a front-end API)
// any program 
