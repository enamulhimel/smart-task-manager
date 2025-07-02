// 'use client';

// import { useState } from 'react';
// import { Task } from '@/lib/types';
// import toast from 'react-hot-toast';

// export default function TaskForm({ 
//   initialData = null, 
//   onSave, 
//   onCancel 
// }: {
//   initialData?: Task | null;
//   onSave: (task: Omit<Task, 'id'>) => void;
//   onCancel: () => void;
// }) {
//   const [task, setTask] = useState<Omit<Task, 'id'>>(
//     initialData || {
//       title: '',
//       description: '',
//       status: 'pending',
//       dueDate: new Date().toISOString().split('T')[0],
//     }
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!task.title.trim()) {
//       toast.error('Title is required');
//       return;
//     }
//     onSave(task);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium">Title*</label>
//         <input
//           type="text"
//           value={task.title}
//           onChange={(e) => setTask({ ...task, title: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium">Description</label>
//         <textarea
//           value={task.description}
//           onChange={(e) => setTask({ ...task, description: e.target.value })}
//           className="w-full p-2 border rounded"
//           rows={3}
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium">Due Date</label>
//         <input
//           type="date"
//           value={task.dueDate}
//           onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
//           className="w-full p-2 border rounded"
//         />
//       </div>
      
//       <div>
//         <label className="block text-sm font-medium">Status</label>
//         <select
//           value={task.status}
//           onChange={(e) => setTask({ ...task, status: e.target.value as 'pending' | 'completed' })}
//           className="w-full p-2 border rounded"
//         >
//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>
      
//       <div className="flex justify-end space-x-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           {initialData ? 'Update' : 'Add'} Task
//         </button>
//       </div>
//     </form>
//   );
// }