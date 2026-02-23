import { useState, useEffect, useCallback } from 'react';

export type ActivityType = 'quiz' | 'flashcard' | 'pomodoro' | 'tutor';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  timestamp: Date;
  score?: string;
  duration?: string;
  trend: 'up' | 'down' | 'neutral';
}

const ACTIVITY_STORAGE_KEY = 'vetstudy-activity-log';
const MAX_ACTIVITIES = 10;

const loadActivityFromStorage = (): Activity[] | null => {
  try {
    const saved = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((activity: any) => ({
        ...activity,
        timestamp: new Date(activity.timestamp),
      }));
    }
  } catch (error) {
    console.error('Error loading activity from storage:', error);
  }
  return null;
};

const saveActivityToStorage = (activities: Activity[]) => {
  try {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activities));
  } catch (error) {
    console.error('Error saving activity to storage:', error);
  }
};

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Justo ahora';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  if (diffDays === 1) return 'Ayer';
  return `Hace ${diffDays} días`;
};

export const useActivity = () => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    return loadActivityFromStorage() || [];
  });

  useEffect(() => {
    saveActivityToStorage(activities);
  }, [activities]);

  const addActivity = useCallback((activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setActivities(prev => {
      const updated = [newActivity, ...prev].slice(0, MAX_ACTIVITIES);
      return updated;
    });
  }, []);

  const logQuizCompletion = useCallback((subject: string, score: number, passed: boolean) => {
    addActivity({
      type: 'quiz',
      title: `Quiz completado: ${subject}`,
      detail: `Puntuación: ${Math.round(score)}%`,
      score: `${Math.round(score)}%`,
      trend: passed ? 'up' : 'neutral',
    });
  }, [addActivity]);

  const logFlashcardSession = useCallback((cardsStudied: number, correctAnswers: number) => {
    const accuracy = cardsStudied > 0 ? Math.round((correctAnswers / cardsStudied) * 100) : 0;
    addActivity({
      type: 'flashcard',
      title: 'Sesión de flashcards',
      detail: `${cardsStudied} tarjetas estudiadas`,
      score: `${accuracy}% acierto`,
      trend: accuracy >= 70 ? 'up' : accuracy >= 50 ? 'neutral' : 'down',
    });
  }, [addActivity]);

  const logPomodoroSession = useCallback((duration: number, subject?: string) => {
    const durationMin = Math.round(duration / 60);
    addActivity({
      type: 'pomodoro',
      title: 'Sesión Pomodoro completada',
      detail: subject ? `Materia: ${subject}` : 'Estudio general',
      duration: `${durationMin} minutos`,
      trend: 'up',
    });
  }, [addActivity]);

  const logTutorInteraction = useCallback((subject: string) => {
    addActivity({
      type: 'tutor',
      title: 'Consulta al Tutor IA',
      detail: `Materia: ${subject}`,
      trend: 'neutral',
    });
  }, [addActivity]);

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, []);

  const recentActivities = activities.map(activity => ({
    ...activity,
    time: formatTimeAgo(activity.timestamp),
  }));

  return {
    activities: recentActivities,
    addActivity,
    logQuizCompletion,
    logFlashcardSession,
    logPomodoroSession,
    logTutorInteraction,
    clearActivities,
  };
};
