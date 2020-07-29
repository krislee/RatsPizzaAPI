// bring in mongoose library to create Schema
// the schema acts like a filter of data: data going into the database and going out of the database has to match the Schema
// model data goes into the collection must follow the schema
const mongoose = require('mongoose')
const {Schema, model} = mongoose

const PizzaSchema = new Schema(
    {
        name: String,
        toppings: [String],
    },  
    {timestamps: true} //create a new pizza: shows time stamp; pizza updated: shows time stamp
)

// where does the schema go? model fucntion connect our collection database and schema
const Pizza = model('pizza', PizzaSchema)
module.exports = Pizza

// model object allows us to do the queries on the data