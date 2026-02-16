import React from 'react';
import { Home, Brain, BookOpen, FileText, BarChart3, Timer, User, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/theme-toggle';

interface SidebarProps {
  activeModule?: string;
  onModuleChange?: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule = 'dashboard', onModuleChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'tutor', label: 'Tutor IA', icon: Brain },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'content', label: 'Contenido', icon: FileText },
    { id: 'quizzes', label: 'Quizzes', icon: BarChart3 },
    { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="w-64 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-screen p-4 fixed left-0 top-0 z-50">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            VetStudy AI Pro
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">Asistente de estudio veterinario</p>
      </div>
      
      <div className="mb-6">
        <ThemeToggle />
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
              onClick={() => onModuleChange?.(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Estudiante: Usuario Demo</p>
            <p>Materias: <span className="text-blue-500 font-medium">3 activas</span></p>
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-green-500">● Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
