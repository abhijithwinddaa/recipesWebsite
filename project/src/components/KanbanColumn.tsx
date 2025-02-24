import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Task } from '../store';

interface KanbanColumnProps {
  title: string;
  status: string;
  tasks: Task[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, status, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-white rounded-lg shadow p-4"
    >
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      <SortableContext
        items={tasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;