const mongoose = require('mongoose')

// schema for our app, structure  for our object
const TaskSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'must provide a name'], trim: true, maxLength:[20, ' name cannot be more than 20 characters']  },
    completed: {type: Boolean, default: false}
})

//model is an instance of the schema to create multiple type of tasks with name and completed

//after exporting we can use it in our controllers or anywhere neccessary 
module.exports = mongoose.model('Task', TaskSchema)