// routes need to interact with database (instead of a set data provided last week):
const Pizza = require("../models/Pizza.js")

// INDEX - GETS ALL PIZZA
/* async/await makes promises easier */

const index = async(req, res) => {
    try { //try the code inside
        const AllPizza = await Pizza.find({}) /* Pizza.find({}) returns a promise, await waits for the 
        promise to be resolved, then store it in allPizza variable (await only returns a resolved promise ??? 9:53) */
        res.status(200).json(AllPizza) //send back all the pizza in json format
    } catch(error) {
        res.status(400).send(error) //if while you're running the code, then run the catch 
        //res.status changes the status code and then res.send also sends the error
    }
}
/* Instead of doing above:
const index = async (req, res) => {
    Pizza.find({}, (err, res) => {res.json(res)}) // version1: callback function
    since you didnt pass a callback, oh you're sending a promise: wait till we're done ???: (9:30)
    Pizza.find({}).then(res => {res.json(res)}))
} */

/* No need for show since the front-end can pull apart the json if we're doing one HTML file (single-page application), 
but if we're doing more than 1 HTML file (multi-page application) then you will do show route and all other 7 RESTFUL routes (new, edit, show) */


// CREATE - MAKE A NEW PIZZA
const create = async (req,res) => {
    try {
        const newPizza = await Pizza.create(req.body) //get data from body to create
        // Pizza.create(req.body): creates a new pizza in the database, then we are storing the new database in newPizza
        res.status(200).json(newPizza)
    } catch(error) {
        res.status(400).send(error)
    }
}

// UPDATE - UPDATES A PIZZA
const update = async (req,res) => {
    try {
        const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {new: true}) //await means wait until everything is done before putting it into a variable
        // req.params.id: get id from URL params, req.body: pass in an updated object, send back the new version, which will store in updatedPizza
        res.status(200).json(updatedPizza)
    } catch(error) {
        res.status(400).send(error)
    }
}
//5f203c6aa45ee011bc578739
//DESTROY - DELETES A PIZZA
const destroy = async(req, res) => {
    try{
        const deletedPizza = await Pizza.findByIdAndDelete (req.params.id) //the pizza that is deleted is stored in deletedPizza variable
        res.status(200).json(deletedPizza)
    } catch(error) {
        res.status(400).send(error)
    }
}


/* Essentially, the IDs will be created in the database and added to the URL simultaneously 
by looping through the json data 10:05 ??????? */

module.exports = {index, create, update, destroy}