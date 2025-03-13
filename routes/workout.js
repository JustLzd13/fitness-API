const express = require('express');
const { verify } = require("../auth"); 
const workoutController = require('../controllers/workout');

const router = express.Router();

router.post('/addWorkout', verify, workoutController.addWorkout);
router.get('/getMyWorkouts', verify, workoutController.getMyWorkouts);
router.get('/getWorkoutById/:id', verify, workoutController.getWorkoutById);
router.put('/updateWorkout/:id', verify, workoutController.updateWorkout);
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);
router.get('/completeWorkoutStatus', verify, workoutController.getCompletedWorkouts);

module.exports = router;
