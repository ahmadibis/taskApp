
//instance of the model is called await
const Task = require('../models/Task')

const asyncWrapper = require('../middleware/async')
const {createCustomError} = require("../errors/custom-error")

const getAllTasks = asyncWrapper (async (req, res) => {
        const allTasks = await Task.find({})
        res.status(200).json({allTasks})
        // res.json({success: true, data: allTasks})
} )

const createTask = async (req, res) => {
    //grab the body from the client 
    try {
         const task = await Task.create(req.body);
         res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({msg: err})
    }
   
}

const getSingleTask = async (req, res, next) => {
    try {
        //using alias
        const {id: taskID} = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {

            //creating custom error 
            // const error = new Error('Not Found')
            // error.status = 404
            // return next(error)

            //creating custom errors and which gets passed as middleware
            return next(createCustomError(`no task for the task id ${taskID}`, 404)); 

            //return res.status(404).json({ msg: `no task for the task id ${taskID}` });
        }
        res.status(200).json({task})
    } catch (err) {
        res.status(500).json({ msg: err });
    }
  
};

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
       //look for the task to update
        //pass the new body , pass the options new to include the new updated values , runvalidotores to enforce validations
        
        const updateTask = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {new: true, runValidators:true})
          if (!updateTask) {
            return res
              .status(404)
              .json({ msg: `no task for the task id ${taskID}` });
          }
    
   } catch (error) {
        res.status(500).json({ msg: error });
   }
}

const deleteTask = async (req, res) => {
    
    try {

        const { id: taskID } = req.params
        const deleteTask = await Task.findByIdAndDelete({ _id: taskID })
        
        if (!deleteTask) {
            return res.status(404).json({ msg: `no task with the ${taskID}`})
        }

        res.status(204).json({deleteTask})

    } catch (err) {
        res.status(500).json({msg: err})
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}