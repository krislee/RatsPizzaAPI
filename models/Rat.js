const {Schema, model} = require('mongoose')

const RatSchema = new Schema(
    {
        name: String,
        pizza: String
    }, 
    {timestamps: true}
)

// instead of storing the full pizza here, we will do a reference to the pizza collection with the pizza models
//  pizza and rat in different collections, grab a rat and then grab a pizza: referenced relationship
// save pizza in the RatSchema, just the id and the Stringindex route get the RatSchema, then look for the pizza

const Rat = model ("rat", RatSchema)
module.exports = Rat