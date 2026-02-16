import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSubjects } from '@/hooks/use-subjects';
import { 
  Brain, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Calendar,
  Target,
  Sparkles,
  ArrowUp,
  BarChart3,
  Timer
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { activeSubjects } = useSubjects();
  
  const stats = [
    {
      title: "Tarjetas para repasar hoy",
      value: "23",
      description: "Repetición espaciada",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Sesiones de estudio esta semana",
      value: "12",
      description: "Total: 6.5 horas",
      icon: Clock,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Progreso general",
      value: "78%",
      description: "+5% esta semana",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Materias activas",
      value: activeSubjects.length.toString(),
      description: activeSubjects.map(s => s.name).join(", "),
      icon: Target,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      textColor: "text-orange-600 dark:text-orange-400"
    }
  ];

  const recentActivity = [
    { time: "Hace 2 horas", activity: "Completado quiz de Virología", score: "85%", trend: "up" },
    { time: "Hace 5 horas", activity: "Sesión de flashcards", cards: "15 tarjetas", trend: "neutral" },
    { time: "Ayer", activity: "Nuevo contenido añadido", topic: "Retrovirus", trend: "neutral" },
    { time: "Ayer", activity: "Sesión Pomodoro", duration: "25 minutos", trend: "up" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground">Bienvenido de vuelta! Aquí está tu progreso de estudio.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 ${stat.bgColor} group`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              Acciones Rápidas
            </CardTitle>
            <CardDescription>
              Comienza una sesión de estudio rápidamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start h-12 hover:scale-105 transition-transform duration-200" 
              variant="outline"
              onClick={() => navigate('/flashcards')}
            >
              <BookOpen className="mr-3 h-4 w-4 text-blue-500" />
              Repasar Flashcards
              <span className="ml-auto bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                23 pendientes
              </span>
            </Button>
            <Button 
              className="w-full justify-start h-12 hover:scale-105 transition-transform duration-200" 
              variant="outline"
              onClick={() => navigate('/tutor')}
            >
              <Brain className="mr-3 h-4 w-4 text-purple-500" />
              Preguntar al Tutor IA
              <span className="ml-auto bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                Online
              </span>
            </Button>
            <Button 
              className="w-full justify-start h-12 hover:scale-105 transition-transform duration-200" 
              variant="outline"
              onClick={() => navigate('/pomodoro')}
            >
              <Timer className="mr-3 h-4 w-4 text-green-500" />
              Iniciar Sesión Pomodoro
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Tus últimas sesiones de estudio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{activity.activity}</p>
                      <p className="text-muted-foreground text-xs">
                        {activity.score || activity.cards || activity.topic || activity.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {activity.trend === 'up' && <ArrowUp className="h-3 w-3 text-green-500" />}
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Section */}
      <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
            Tus Materias
          </CardTitle>
          <CardDescription>
            Materias activas para este semestre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSubjects.map((subject) => (
              <div 
                key={subject.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
                onClick={() => navigate('/quizzes')}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${subject.color}-500 to-${subject.color}-600 flex items-center justify-center text-white text-xl font-bold`}>
                    {subject.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{subject.name}</h4>
                    <p className="text-xs text-muted-foreground">{subject.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={(e) => { e.stopPropagation(); navigate('/tutor'); }}>
                    <Brain className="w-3 h-3 mr-1" />
                    Tutor
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={(e) => { e.stopPropagation(); navigate('/quizzes'); }}>
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Quiz
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={(e) => { e.stopPropagation(); navigate('/flashcards'); }}>
                    <BookOpen className="w-3 h-3 mr-1" />
                    Cards
                  </Button>
                </div>
              </div>
            ))}
            
            {activeSubjects.length === 0 && (
              <div className="col-span-full text-center py-8">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No hay materias activas
                </h3>
                <p className="text-muted-foreground mb-4">
                  Agrega tus materias en Configuración para comenzar
                </p>
                <Button
                  onClick={() => navigate('/settings')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  Ir a Configuración
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
