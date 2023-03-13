const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout =async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Please enter valid id'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'Oops! No such user exists'})
    }
    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res)=> {
    const {Name, Age, Email, Gender, Mobile, Birthday, City, State, Country } = req.body

    
    try{

        const workout = await Workout.create({Name, Age, Email, Gender, Mobile, Birthday, City, State, Country })
        res.status(200).json({message: 'User Profile created successfully'})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Please enter valid id'})
    }
    
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'Oops! No such user exists'})
    }
    res.status(200).json({error: "User deleted successfully"})


}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found'})
    }
 
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'Oops! No such user exists'})
    }
    res.status(200).json({message: 'Updated Successfully'})

}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}