import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useWorkoutStore } from '../store';

const ExerciseChart: React.FC = () => {
  const { workouts } = useWorkoutStore();

  const chartData = workouts
    .slice()
    .reverse()
    .map((workout) => ({
      date: workout.date,
      duration: workout.duration,
      exercises: workout.exercises.length,
    }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="duration"
            stroke="#3B82F6"
            name="Duration (min)"
          />
          <Line
            type="monotone"
            dataKey="exercises"
            stroke="#10B981"
            name="Exercises"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExerciseChart;