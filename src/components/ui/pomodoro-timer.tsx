import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface PomodoroTimerProps {
  timeLeft: number;
  isRunning: boolean;
  progress: number;
  sessionDisplay: { text: string; color: string };
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  timeLeft,
  isRunning,
  progress,
  sessionDisplay,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  const radius = 120;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getSessionColor = (color: string) => {
    const colors: Record<string, string> = {
      red: 'from-red-500 to-red-600',
      green: 'from-green-500 to-green-600',
      blue: 'from-blue-500 to-blue-600',
    };
    return colors[color] || colors.red;
  };

  const getSessionBgColor = (color: string) => {
    const colors: Record<string, string> = {
      red: 'bg-red-50 dark:bg-red-950',
      green: 'bg-green-50 dark:bg-green-950',
      blue: 'bg-blue-50 dark:bg-blue-950',
    };
    return colors[color] || colors.red;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Session Type */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {sessionDisplay.text}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isRunning ? 'En progreso' : 'Pausado'}
        </p>
      </div>

      {/* Timer Circle */}
      <div className="relative">
        <svg
          width={radius * 2}
          height={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted opacity-20"
          />
          
          {/* Progress circle */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`transition-all duration-1000 ease-linear ${getSessionColor(sessionDisplay.color).split(' ')[0]}`}
          />
        </svg>
        
        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-center ${getSessionBgColor(sessionDisplay.color)} rounded-full w-32 h-32 flex items-center justify-center`}>
            <span className="text-4xl font-bold text-foreground tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-3">
        {!isRunning ? (
          <button
            onClick={onStart}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-105 active:scale-95 bg-gradient-to-r ${getSessionColor(sessionDisplay.color)} hover:shadow-lg`}
          >
            <Play className="w-5 h-5 mr-2" />
            Iniciar
          </button>
        ) : (
          <button
            onClick={onPause}
            className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pausar
          </button>
        )}
        
        <button
          onClick={onReset}
          className="px-4 py-3 rounded-lg font-medium text-muted-foreground bg-muted hover:bg-muted/80 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={onSkip}
          className="px-4 py-3 rounded-lg font-medium text-muted-foreground bg-muted hover:bg-muted/80 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
