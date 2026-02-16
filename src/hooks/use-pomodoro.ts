import { useState, useEffect, useCallback, useRef } from 'react';
import { useSubjects } from './use-subjects';

export interface PomodoroSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  longBreakInterval: number; // after how many pomodoros
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  soundEnabled: boolean;
}

export interface PomodoroSession {
  id: string;
  type: 'work' | 'shortBreak' | 'longBreak';
  duration: number; // in seconds
  completedAt: Date;
  subject?: string;
}

export interface PomodoroStats {
  todayPomodoros: number;
  todayTotalTime: number; // in minutes
  weekPomodoros: number;
  weekTotalTime: number; // in minutes
  currentStreak: number;
  bestStreak: number;
}

const defaultSettings: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartWork: false,
  soundEnabled: true,
};

export const usePomodoro = () => {
  const { activeSubjects } = useSubjects();
  const [settings, setSettings] = useState<PomodoroSettings>(defaultSettings);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(activeSubjects[0]?.name || 'Estudio General');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate stats
  const stats: PomodoroStats = {
    todayPomodoros: sessions.filter(s => 
      new Date(s.completedAt).toDateString() === new Date().toDateString()
    ).length,
    todayTotalTime: sessions
      .filter(s => new Date(s.completedAt).toDateString() === new Date().toDateString())
      .reduce((acc, s) => acc + s.duration / 60, 0),
    weekPomodoros: sessions.filter(s => {
      const sessionDate = new Date(s.completedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= weekAgo;
    }).length,
    weekTotalTime: sessions
      .filter(s => {
        const sessionDate = new Date(s.completedAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return sessionDate >= weekAgo;
      })
      .reduce((acc, s) => acc + s.duration / 60, 0),
    currentStreak: 7, // Mock data
    bestStreak: 21, // Mock data
  };

  // Get current session duration
  const getCurrentDuration = useCallback(() => {
    switch (currentSession) {
      case 'work':
        return settings.workDuration * 60;
      case 'shortBreak':
        return settings.shortBreakDuration * 60;
      case 'longBreak':
        return settings.longBreakDuration * 60;
      default:
        return settings.workDuration * 60;
    }
  }, [currentSession, settings]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  // Handle session completion
  const handleSessionComplete = useCallback(() => {
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      type: currentSession,
      duration: getCurrentDuration(),
      completedAt: new Date(),
      subject: selectedSubject,
    };

    setSessions(prev => [...prev, newSession]);

    if (currentSession === 'work') {
      setCompletedPomodoros(prev => prev + 1);
      
      // Play sound if enabled
      if (settings.soundEnabled) {
        playNotificationSound();
      }

      // Determine next session
      const nextPomodoroCount = completedPomodoros + 1;
      if (nextPomodoroCount % settings.longBreakInterval === 0) {
        setCurrentSession('longBreak');
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setCurrentSession('shortBreak');
        setTimeLeft(settings.shortBreakDuration * 60);
      }

      // Auto-start break if enabled
      if (settings.autoStartBreaks) {
        setTimeout(() => setIsRunning(true), 1000);
      }
    } else {
      // Break completed, go back to work
      setCurrentSession('work');
      setTimeLeft(settings.workDuration * 60);

      // Auto-start work if enabled
      if (settings.autoStartWork) {
        setTimeout(() => setIsRunning(true), 1000);
      }
    }
  }, [currentSession, completedPomodoros, settings, getCurrentDuration]);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  // Control functions
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getCurrentDuration());
  }, [getCurrentDuration]);

  const skipToNext = useCallback(() => {
    setIsRunning(false);
    handleSessionComplete();
  }, [handleSessionComplete]);

  const updateSettings = useCallback((newSettings: Partial<PomodoroSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Format time display
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Get session type display
  const getSessionDisplay = useCallback(() => {
    switch (currentSession) {
      case 'work':
        return { text: 'Tiempo de Trabajo', color: 'red' };
      case 'shortBreak':
        return { text: 'Descanso Corto', color: 'green' };
      case 'longBreak':
        return { text: 'Descanso Largo', color: 'blue' };
      default:
        return { text: 'Tiempo de Trabajo', color: 'red' };
    }
  }, [currentSession]);

  return {
    // State
    timeLeft,
    isRunning,
    currentSession,
    completedPomodoros,
    sessions,
    settings,
    stats,
    selectedSubject,
    activeSubjects,
    
    // Computed
    formattedTime: formatTime(timeLeft),
    sessionDisplay: getSessionDisplay(),
    progress: ((getCurrentDuration() - timeLeft) / getCurrentDuration()) * 100,
    
    // Actions
    start,
    pause,
    reset,
    skip: skipToNext,
    updateSettings,
    setSelectedSubject,
  };
};
