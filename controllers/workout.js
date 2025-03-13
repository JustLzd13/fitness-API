const Workout = require('../models/Workout');

module.exports.addWorkout = (req, res) => {
    const { name, duration } = req.body;
    const userId = req.user.id;

    if (!name) {
        return res.status(400).send({ error: "Workout name is required" });
    }

    if (!duration) {
        return res.status(400).send({ error: "Workout duration is required" });
    }

    let newWorkout = new Workout({
        userId,
        name,
        duration,
        status: "pending"
    });

    newWorkout.save()
        .then(workout => res.status(201).send(workout))
        .catch(err => {
            console.error("Error in saving workout: ", err);
            return res.status(500).send({ error: "Internal server error" });
        });
};

module.exports.getMyWorkouts = (req, res) => {
    const userId = req.user.id;

    Workout.find({ userId })
        .then(workouts => {
            res.status(200).send(workouts); // Always return 200 with an array (empty or filled)
        })
        .catch(err => res.status(500).send({ error: "Internal server error" }));
};

module.exports.getWorkoutById = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    Workout.findOne({ _id: id, userId })
        .then(workout => {
            if (!workout) {
                return res.status(404).send({ error: "Workout not found" });
            }
            res.status(200).send(workout);
        })
        .catch(err => res.status(500).send({ error: "Internal server error" }));
};

module.exports.updateWorkout = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, duration, status } = req.body;

    Workout.findOneAndUpdate(
        { _id: id, userId },
        { name, duration, status },
        { new: true }
    )
        .then(updatedWorkout => {
            if (!updatedWorkout) {
                return res.status(404).send({ error: "Workout not found" });
            }
            res.status(200).send(updatedWorkout);
        })
        .catch(err => res.status(500).send({ error: "Internal server error" }));
};

module.exports.deleteWorkout = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    Workout.findOneAndDelete({ _id: id, userId })
        .then(deletedWorkout => {
            if (!deletedWorkout) {
                return res.status(404).send({ error: "Workout not found" });
            }
            res.status(200).send({ message: "Workout deleted successfully" });
        })
        .catch(err => res.status(500).send({ error: "Internal server error" }));
};

module.exports.getCompletedWorkouts = (req, res) => {
    const userId = req.user.id;

    Workout.find({ userId, status: 'completed' })
        .then(completedWorkouts => {
            res.status(200).send(completedWorkouts);
        })
        .catch(err => res.status(500).send({ error: "Internal server error" }));
};
