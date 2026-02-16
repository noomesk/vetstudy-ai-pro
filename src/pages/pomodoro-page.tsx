import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PomodoroTimer from '@/components/ui/pomodoro-timer';
import { usePomodoro } from '@/hooks/use-pomodoro';
import { 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

const PomodoroPage: React.FC = () => {
  const {
    timeLeft,
    isRunning,
    currentSession,
    completedPomodoros,
    sessions,
    settings,
    stats,
    formattedTime,
    sessionDisplay,
    progress,
    start,
    pause,
    reset,
    skip: skipToNext,
    selectedSubject,
    activeSubjects,
    setSelectedSubject,
    updateSettings,
  } = usePomodoro();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Pomodoro
              </h1>
              <p className="text-muted-foreground">Técnica de estudio enfocado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                Temporizador
              </CardTitle>
              <CardDescription>
                {sessionDisplay.text} - Pomodoro #{completedPomodoros + 1}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-8">
              <PomodoroTimer
                timeLeft={timeLeft}
                isRunning={isRunning}
                progress={progress}
                sessionDisplay={sessionDisplay}
                onStart={start}
                onPause={pause}
                onReset={reset}
                onSkip={skipToNext}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Subject Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Materia de Estudio
              </CardTitle>
              <CardDescription>
                Selecciona la materia para esta sesión de Pomodoro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {activeSubjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.icon} {subject.name}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Configuración
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Duración de Trabajo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="15"
                    max="60"
                    value={settings.workDuration}
                    onChange={(e) => updateSettings({ workDuration: parseInt(e.target.value) })}
                    className="flex-1"
                    disabled={isRunning}
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {settings.workDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Descanso Corto
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={settings.shortBreakDuration}
                    onChange={(e) => updateSettings({ shortBreakDuration: parseInt(e.target.value) })}
                    className="flex-1"
                    disabled={isRunning}
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {settings.shortBreakDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Descanso Largo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="30"
                    value={settings.longBreakDuration}
                    onChange={(e) => updateSettings({ longBreakDuration: parseInt(e.target.value) })}
                    className="flex-1"
                    disabled={isRunning}
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {settings.longBreakDuration}m
                  </span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Sesiones hasta descanso largo
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={settings.longBreakInterval} 
                    onChange={(e) => updateSettings({ longBreakInterval: parseInt(e.target.value) })}
                    className="w-16 px-2 py-1 border rounded bg-background text-center"
                    disabled={isRunning}
                  />
                  <span className="text-sm text-muted-foreground">sesiones</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-medium">Sonido</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                  className="p-2"
                >
                  {settings.soundEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Hoy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pomodoros completados</span>
                <span className="font-medium">{stats.todayPomodoros}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tiempo total</span>
                <span className="font-medium">{Math.round(stats.todayTotalTime)} min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Racha actual</span>
                <span className="font-medium text-green-600">{stats.currentStreak} días</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mejor racha</span>
                <span className="font-medium text-blue-600">{stats.bestStreak} días</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            Sesiones Recientes
          </CardTitle>
          <CardDescription>
            Historial de tus sesiones de estudio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.slice(-5).reverse().map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    session.type === 'work' ? 'bg-red-500' :
                    session.type === 'shortBreak' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium">
                      {session.type === 'work' ? 'Trabajo' :
                       session.type === 'shortBreak' ? 'Descanso Corto' : 'Descanso Largo'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.subject || 'Sin materia asignada'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{Math.round(session.duration / 60)} min</p>
                  <p className="text-xs text-muted-foreground">
                    {session.completedAt.toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {sessions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay sesiones registradas aún</p>
                <p className="text-sm">Comienza tu primera sesión de Pomodoro</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PomodoroPage;
