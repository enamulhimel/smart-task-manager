'use client';

import { createContext, useState, ReactNode } from 'react';
import { Task, TaskContextType } from '@/lib/types';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const editTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addSubtasks = (id: string, subtasks: string[]) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, subtasks } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, addSubtasks }}>
      {children}
    </TaskContext.Provider>
  );
};