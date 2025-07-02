import TaskList from '@/components/TaskList';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <TaskList />
      <Toaster position="top-right" />
    </main>
  );
}