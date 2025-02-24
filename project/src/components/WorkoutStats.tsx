import React from 'react';
import { Dumbbell, Flame, Clock } from 'lucide-react';
import { useWorkoutStore } from '../store';

const WorkoutStats: React.FC = () => {
  const { workouts } = useWorkoutStore();

  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((acc, curr) => acc + curr.duration, 0);
  const totalExercises = workouts.reduce((acc, curr) => acc + curr.exercises.length, 0);

  const stats = [
    {
      label: 'Total Workouts',
      value: totalWorkouts,
      icon: Dumbbell,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Total Minutes',
      value: totalDuration,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Exercises Done',
      value: totalExercises,
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Workout Statistics</h2>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center p-4 rounded-lg bg-gray-50"
          >
            <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutStats;