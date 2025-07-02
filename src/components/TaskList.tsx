// 'use client';

// import { useContext, useState } from 'react';
// import { TaskContext } from '@/context/TaskContext';
// import TaskItem from './TaskItem';
// import TaskForm from './TaskForm';

// export default function TaskList() {
//   const { tasks, addTask, editTask, deleteTask, addSubtasks } = useContext(TaskContext)!;
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Smart Task Manager</h1>
      
//       <div className="mb-6">
//         {showForm ? (
//           <div className="p-4 mb-4 bg-white rounded-lg shadow">
//             <TaskForm
//               onSave={(task) => {
//                 addTask(task);
//                 setShowForm(false);
//               }}
//               onCancel={() => setShowForm(false)}
//             />
//           </div>
//         ) : (
//           <button
//             onClick={() => setShowForm(true)}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Add New Task
//           </button>
//         )}
//       </div>
      
//       <div className="space-y-4">
//         {tasks.length === 0 ? (
//           <p className="text-gray-500">No tasks yet. Add your first task!</p>
//         ) : (
//           tasks.map((task) => (
//             <TaskItem
//               key={task.id}
//               task={task}
//               onEdit={editTask}
//               onDelete={deleteTask}
//               onAddSubtasks={addSubtasks}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }