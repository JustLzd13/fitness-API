const express = require('express');
const { verify } = require("../auth"); 
const workoutController = require('../controllers/workout');

const router = express.Router();

router.post('/createWorkout', verify, workoutController.createWorkout);
router.get('/getMyWorkouts', verify, workoutController.getWorkouts);
router.get('/getWorkoutById/:id', verify, workoutController.getWorkoutById);
router.put('/updateWorkout/:id', verify, workoutController.updateWorkout);
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);

module.exports = router;
