import React from 'react';
import { format, parseISO } from 'date-fns';
import { Dumbbell, Timer, Trash2 } from 'lucide-react';
import { useWorkoutStore } from '../store';

const WorkoutList: React.FC = () => {
  const { workouts, removeWorkout } = useWorkoutStore();

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2">
                <Dumbbell className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">
                  {format(parseISO(workout.date), 'MMMM d, yyyy')}
                </h3>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Timer className="h-4 w-4 mr-1" />
                <span>{workout.duration} minutes</span>
              </div>
            </div>
            <button
              onClick={() => removeWorkout(workout.id)}
              className="p-2 hover:bg-red-50 rounded-full"
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </button>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Exercises:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workout.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  <h5 className="font-medium">{exercise.name}</h5>
                  <div className="text-sm text-gray-600 mt-1">
                    {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}lbs
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;