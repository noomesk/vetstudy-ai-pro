import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import Sidebar from './sidebar';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
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

  const handleAuth = () => {
    if (user) {
      logout();
      navigate('/auth');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={handleModuleChange}
        user={user}
        onAuthClick={handleAuth}
      />
      <main className="lg:ml-64 transition-all duration-300">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
