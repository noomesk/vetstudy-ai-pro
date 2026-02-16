import { useState, useCallback, useEffect } from 'react';
import { useSubjects } from './use-subjects';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: Date;
  isStudying?: boolean;
}

export interface FlashcardStats {
  total: number;
  mastered: number;
  learning: number;
  toReview: number;
  streak: number;
}

const generateFlashcardsForSubjects = (subjects: any[]): Flashcard[] => {
  const allFlashcards: Flashcard[] = [];
  
  subjects.forEach(subject => {
    switch (subject.id) {
      case 'virology':
        allFlashcards.push(
          {
            id: 'virology-1',
            front: '¿Qué es un retrovirus y cuál es su mecanismo de replicación?',
            back: 'Un retrovirus es un virus que contiene ARN y utiliza la enzima transcriptasa inversa para convertir su ARN en ADN, que luego se integra en el genoma de la célula huésped. Ejemplos: VIH, HTLV, virus de la leucemia felina.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'virology-2',
            front: '¿Cuál es la diferencia entre virus ADN y ARN?',
            back: 'Los virus ADN tienen ADN como material genético (ej: Herpesvirus, Poxvirus) mientras que los virus ARN tienen ARN (ej: Retrovirus, Flavivirus). Esta diferencia afecta su replicación y estrategias de evasión inmune.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'parasitology':
        allFlashcards.push(
          {
            id: 'parasitology-1',
            front: '¿Cómo se clasifican los protozoos de importancia veterinaria?',
            back: 'Se clasifican en: Amoebidae (Entamoeba), Flagellata (Giardia, Trichomonas), Ciliophora (Balantidium), y Apicomplexa (Eimeria, Cryptosporidium, Toxoplasma). Cada grupo tiene características distintivas de movimiento y reproducción.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'parasitology-2',
            front: '¿Cuál es el ciclo de vida de Toxocara canis?',
            back: 'Toxocara canis tiene un ciclo directo: huevos en heces → larva L1-L2-L3 en ambiente → infección por ingestión → larvas migran en hígado/pulmón → regreso a intestino → adulto. Transmisión transplacentaria y lactogénica también ocurren.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'ecology':
        allFlashcards.push(
          {
            id: 'ecology-1',
            front: '¿Qué es una pirámide ecológica y qué representa?',
            back: 'Una pirámide ecológica representa la estructura trófica de un ecosistema, mostrando la transferencia de energía entre niveles. La base son productores, seguidos de consumidores primarios, secundarios y terciarios. La energía disminuye en cada nivel (~10%).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'ecology-2',
            front: '¿Cuál es la diferencia entre hábitat y nicho ecológico?',
            back: 'Hábitat es el lugar físico donde vive un organismo (ej: bosque, río), mientras que nicho ecológico es el rol funcional que desempeña en el ecosistema (qué come, cómo se reproduce, sus interacciones). Varios organismos pueden compartir hábitat pero tener nichos diferentes.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'literature':
        allFlashcards.push(
          {
            id: 'literature-1',
            front: '¿Cuáles son los principales géneros literarios?',
            back: 'Los tres grandes géneros son: 1) Lírico (expresión de sentimientos, poesía), 2) Narrativo (relato de historias, novela, cuento), 3) Dramático (obras teatrales, diálogo entre personajes). Cada género tiene características y subgéneros específicos.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'literature-2',
            front: '¿Qué es el narrador y qué tipos existen?',
            back: 'El narrador es la voz que cuenta la historia. Tipos principales: 1) Primera persona ("yo"), 2) Tercera persona limitada (sabe pensamientos de un personaje), 3) Tercera persona omnisciente (sabe todo), 4) Segunda persona ("tú", poco común).',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'cinematography':
        allFlashcards.push(
          {
            id: 'cinematography-1',
            front: '¿Cuáles son los tipos básicos de planos cinematográficos?',
            back: 'Planos principales: 1) Gran plano (detalle), 2) Primer plano (rostro), 3) Plano medio (cintura arriba), 4) Plano entero (cuerpo completo), 5) Plano general (contexto completo), 6) Gran plano general (vista amplia del entorno).',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'cinematography-2',
            front: '¿Qué es el montaje paralelo y para qué se usa?',
            back: 'El montaje paralelo muestra dos o más acciones simultáneas en diferentes lugares, creando tensión o revelando conexiones. Ejemplo: héroe corriendo a rescatar vs bomba haciendo cuenta regresiva. Crea ritmo y significado a través de yuxtaposición.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
        
      case 'english':
        allFlashcards.push(
          {
            id: 'english-1',
            front: 'What are the main verb tenses in English?',
            back: 'Main tenses: 1) Present (simple, continuous, perfect, perfect continuous), 2) Past (simple, continuous, perfect, perfect continuous), 3) Future (simple, continuous, perfect, perfect continuous). Each tense has specific usage rules.',
            subject: subject.name,
            difficulty: 'medium',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          },
          {
            id: 'english-2',
            front: 'When do we use "a" vs "an"?',
            back: 'Use "an" before vowel sounds (a, e, i, o, u sounds): an apple, an hour, an MBA. Use "a" before consonant sounds: a book, a university, a European. It depends on pronunciation, not spelling.',
            subject: subject.name,
            difficulty: 'easy',
            interval: 1,
            repetition: 0,
            easeFactor: 2.5,
            nextReview: new Date(),
            isStudying: false,
          }
        );
        break;
    }
  });
  
  return allFlashcards;
};

const initialFlashcards: Flashcard[] = [
  {
    id: '1',
    front: '¿Qué es un retrovirus y cuál es su mecanismo de replicación?',
    back: 'Un retrovirus es un virus que contiene ARN y utiliza la enzima transcriptasa inversa para convertir su ARN en ADN, que luego se integra en el genoma de la célula huésped. Ejemplos: VIH, HTLV, virus de la leucemia felina.',
    subject: 'virology',
    difficulty: 'medium',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: new Date(),
    isStudying: false,
  },
  {
    id: '2',
    front: '¿Cuáles son los síntomas iniciales de la rabia en animales?',
    back: 'Los síntomas iniciales incluyen cambios de comportamiento, agresividad, aislamiento, fiebre, dificultad para tragar, y exceso de salivación. El período de incubación varía de 1 semana a varios meses.',
    subject: 'virology',
    difficulty: 'hard',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: new Date(),
    isStudying: false,
  },
  {
    id: '3',
    front: '¿Cómo se clasifican los protozoos de importancia veterinaria?',
    back: 'Se clasifican en: Amoebidae (Entamoeba), Flagellata (Giardia, Trichomonas), Ciliophora (Balantidium), y Apicomplexa (Eimeria, Cryptosporidium, Toxoplasma). Cada grupo tiene características distintivas de movimiento y reproducción.',
    subject: 'parasitology',
    difficulty: 'easy',
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReview: new Date(),
    isStudying: false,
  },
];

export const useFlashcards = () => {
  const { activeSubjects } = useSubjects();
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => generateFlashcardsForSubjects(activeSubjects));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studySession, setStudySession] = useState({
    startTime: new Date(),
    cardsStudied: 0,
    correctAnswers: 0,
  });

  const currentCard = flashcards[currentCardIndex];
  const cardsToReview = flashcards.filter(card => 
    new Date(card.nextReview) <= new Date()
  );

  const stats: FlashcardStats = {
    total: flashcards.length,
    mastered: flashcards.filter(card => card.interval >= 21).length,
    learning: flashcards.filter(card => card.interval > 1 && card.interval < 21).length,
    toReview: cardsToReview.length,
    streak: 7, // Mock data
  };

  const calculateNextReview = useCallback((card: Flashcard, quality: number) => {
    const { interval, repetition, easeFactor } = card;
    
    let newInterval = interval;
    let newRepetition = repetition + 1;
    let newEaseFactor = easeFactor;

    if (quality >= 3) {
      if (repetition === 0) {
        newInterval = 1;
      } else if (repetition === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(interval * easeFactor);
      }
    } else {
      newRepetition = 0;
      newInterval = 1;
    }

    newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);

    return {
      interval: newInterval,
      repetition: newRepetition,
      easeFactor: Math.max(1.3, newEaseFactor),
      nextReview,
    };
  }, []);

  const rateCard = useCallback((quality: number) => {
    if (!currentCard) return;

    const reviewData = calculateNextReview(currentCard, quality);
    
    setFlashcards(prev => prev.map(card => 
      card.id === currentCard.id 
        ? {
            ...card,
            ...reviewData,
            difficulty: quality <= 2 ? 'hard' : quality === 3 ? 'medium' : 'easy',
          }
        : card
    ));

    setStudySession(prev => ({
      ...prev,
      cardsStudied: prev.cardsStudied + 1,
      correctAnswers: prev.correctAnswers + (quality >= 3 ? 1 : 0),
    }));

    // Move to next card
    setTimeout(() => {
      setShowAnswer(false);
      if (currentCardIndex < flashcards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      }
    }, 500);
  }, [currentCard, currentCardIndex, flashcards.length, calculateNextReview]);

  const flipCard = useCallback(() => {
    setShowAnswer(!showAnswer);
  }, [showAnswer]);

  const nextCard = useCallback(() => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  }, [currentCardIndex, flashcards.length]);

  const previousCard = useCallback(() => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  }, [currentCardIndex]);

  const resetSession = useCallback(() => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setStudySession({
      startTime: new Date(),
      cardsStudied: 0,
      correctAnswers: 0,
    });
  }, []);

  const getSessionTime = useCallback(() => {
    const now = new Date();
    const diff = now.getTime() - studySession.startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    return `${minutes} min`;
  }, [studySession.startTime]);

  const getSessionProgress = useCallback(() => {
    const reviewedCards = flashcards.slice(0, currentCardIndex + 1).filter(card => 
      card.interval > 1 || card.repetition > 0
    );
    return reviewedCards.length;
  }, [flashcards, currentCardIndex]);

  return {
    flashcards,
    currentCard,
    currentCardIndex,
    showAnswer,
    stats,
    studySession,
    cardsToReview,
    rateCard,
    flipCard,
    nextCard,
    previousCard,
    resetSession,
    getSessionTime,
    getSessionProgress,
  };
};
