'use client';

import { Task } from '@/lib/types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TaskForm from './TaskForm';

export default function TaskItem({ 
  task, 
  onEdit, 
  onDelete,
  onAddSubtasks 
}: {
  task: Task;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onAddSubtasks: (id: string, subtasks: string[]) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestSubtasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to get suggestions');
      
      const { subtasks } = await response.json();
      onAddSubtasks(task.id, subtasks);
      toast.success('Subtasks generated!');
    } catch (error) {
      toast.error('Failed to generate subtasks');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="p-4 mb-4 bg-white rounded-lg shadow">
        <TaskForm
          initialData={task}
          onSave={(updatedTask) => {
            onEdit(task.id, updatedTask);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-bold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-3 pl-4 border-l-2 border-gray-200">
          <h4 className="text-sm font-medium mb-2">Subtasks:</h4>
          <ul className="list-disc list-inside space-y-1">
            {task.subtasks.map((subtask, index) => (
              <li key={index} className="text-sm text-gray-700">
                {subtask}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <button
        onClick={handleSuggestSubtasks}
        disabled={isLoading}
        className={`mt-3 text-sm ${isLoading ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'} text-white px-3 py-1 rounded`}
      >
        {isLoading ? 'Generating...' : 'Suggest Subtasks'}
      </button>
    </div>
  );
}