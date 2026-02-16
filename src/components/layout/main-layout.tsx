import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract active module from current path
  const getActiveModule = () => {
    const path = location.pathname;
    if (path.includes('/tutor')) return 'tutor';
    if (path.includes('/flashcards')) return 'flashcards';
    if (path.includes('/content')) return 'content';
    if (path.includes('/quizzes')) return 'quizzes';
    if (path.includes('/pomodoro')) return 'pomodoro';
    if (path.includes('/profile')) return 'profile';
    return 'dashboard';
  };

  const activeModule = getActiveModule();

  const handleModuleChange = (module: string) => {
    navigate(`/${module}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={handleModuleChange} 
      />
      
      <div className="ml-64 p-8">
        <main className="max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
