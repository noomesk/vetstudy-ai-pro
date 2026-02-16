import { useState, useCallback } from 'react';
import { useSubjects } from './use-subjects';

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string | number | string[]; // Array for fill-blank with multiple answers
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  tags: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  passingScore: number; // percentage
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdAt: Date;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  answers: Record<string, string | number | string[]>;
  score: number; // percentage
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: Date;
  passed: boolean;
}

export interface QuizStats {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  recentAttempts: QuizAttempt[];
  subjectStats: Record<string, { attempts: number; averageScore: number }>;
}

// Function to generate quizzes for subjects
const generateQuizzesForSubjects = (subjects: any[]): Quiz[] => {
  const allQuizzes: Quiz[] = [];
  
  subjects.forEach(subject => {
    switch (subject.id) {
      case 'virology':
        allQuizzes.push(
          {
            id: 'virology-1',
            title: 'Fundamentos de Virología',
            description: 'Conceptos básicos de virología veterinaria',
            subject: subject.name,
            timeLimit: 15,
            passingScore: 70,
            difficulty: 'easy',
            tags: ['virus', 'clasificación'],
            createdAt: new Date(),
            questions: [
              {
                id: 'qv1',
                type: 'multiple-choice',
                question: '¿Cuál es la característica principal de los virus?',
                options: [
                  'Son células vivas',
                  'Necesitan células huésped para replicarse',
                  'Pueden reproducirse solos',
                  'Tienen núcleo definido'
                ],
                correctAnswer: 1,
                explanation: 'Los virus son parásitos intracelulares obligados que necesitan células huésped para replicarse.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['virus', 'replicación']
              },
              {
                id: 'qv2',
                type: 'true-false',
                question: 'Los virus son más grandes que las bacterias',
                correctAnswer: 'false',
                explanation: 'Los virus son mucho más pequeños que las bacterias, generalmente miden nanómetros mientras que las bacterias miden micrómetros.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['virus', 'bacterias', 'tamaño']
              },
              {
                id: 'qv3',
                type: 'fill-blank',
                question: 'El virus de la rabia pertenece a la familia ____ y afecta principalmente al sistema ____.',
                correctAnswer: ['Rhabdoviridae', 'nervioso'],
                explanation: 'El virus de la rabia pertenece a la familia Rhabdoviridae y es conocido por afectar principalmente el sistema nervioso central.',
                difficulty: 'medium',
                subject: subject.name,
                tags: ['rabia', 'clasificación']
              }
            ]
          }
        );
        break;
        
      case 'parasitology':
        allQuizzes.push(
          {
            id: 'parasitology-1',
            title: 'Parásitos Gastrointestinales',
            description: 'Identificación y ciclo de vida de parásitos comunes',
            subject: subject.name,
            timeLimit: 12,
            passingScore: 75,
            difficulty: 'medium',
            tags: ['helmintos', 'gastrointestinal'],
            createdAt: new Date(),
            questions: [
              {
                id: 'qp1',
                type: 'multiple-choice',
                question: '¿Cuál es el parásito más común en perros?',
                options: [
                  'Toxocara canis',
                  'Diphyllobothrium latum',
                  'Schistosoma mansoni',
                  'Taenia solium'
                ],
                correctAnswer: 0,
                explanation: 'Toxocara canis es uno de los parásitos más frecuentes en perros, especialmente en cachorros.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['nematodos', 'perros']
              },
              {
                id: 'qp2',
                type: 'true-false',
                question: 'Todos los parásitos intestinales causan diarrea',
                correctAnswer: 'false',
                explanation: 'No todos los parásitos intestinales causan diarrea. Algunos pueden ser asintomáticos o causar otros síntomas como pérdida de peso o anemia.',
                difficulty: 'medium',
                subject: subject.name,
                tags: ['síntomas', 'diagnóstico']
              }
            ]
          }
        );
        break;
        
      case 'ecology':
        allQuizzes.push(
          {
            id: 'ecology-1',
            title: 'Ecosistemas y Cadena Alimenticia',
            description: 'Conceptos fundamentales de ecología',
            subject: subject.name,
            timeLimit: 10,
            passingScore: 70,
            difficulty: 'easy',
            tags: ['ecosistema', 'cadena alimenticia'],
            createdAt: new Date(),
            questions: [
              {
                id: 'qe1',
                type: 'multiple-choice',
                question: '¿Qué representa un productor en un ecosistema?',
                options: [
                  'Animales carnívoros',
                  'Plantas y algas',
                  'Hongos',
                  'Bacterias descomponedoras'
                ],
                correctAnswer: 1,
                explanation: 'Los productores son organismos que producen su propio alimento, generalmente mediante fotosíntesis, como las plantas y algas.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['productores', 'fotosíntesis']
              },
              {
                id: 'qe2',
                type: 'true-false',
                question: 'La sucesión ecológica es un proceso predecible',
                correctAnswer: 'true',
                explanation: 'La sucesión ecológica sigue patrones relativamente predecibles, desde especies pioneras hasta la comunidad clímax.',
                difficulty: 'medium',
                subject: subject.name,
                tags: ['sucesión', 'comunidad clímax']
              }
            ]
          }
        );
        break;
        
      case 'literature':
        allQuizzes.push(
          {
            id: 'literature-1',
            title: 'Géneros Literarios',
            description: 'Identificación de géneros y características',
            subject: subject.name,
            timeLimit: 8,
            passingScore: 75,
            difficulty: 'easy',
            tags: ['géneros', 'literatura'],
            createdAt: new Date(),
            questions: [
              {
                id: 'ql1',
                type: 'multiple-choice',
                question: '¿Cuál es una característica del género lírico?',
                options: [
                  'Narración de eventos',
                  'Diálogo entre personajes',
                  'Expresión de sentimientos y emociones',
                  'Descripción de lugares'
                ],
                correctAnswer: 2,
                explanation: 'El género lírico se caracteriza por la expresión subjetiva de sentimientos, emociones y reflexiones del yo poético.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['género lírico', 'poesía']
              },
              {
                id: 'ql2',
                type: 'true-false',
                question: 'La novela pertenece al género narrativo',
                correctAnswer: 'true',
                explanation: 'La novela es una forma narrativa extensa que cuenta una historia con personajes, trama y desarrollo temporal.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['novela', 'género narrativo']
              }
            ]
          }
        );
        break;
        
      case 'cinematography':
        allQuizzes.push(
          {
            id: 'cinematography-1',
            title: 'Lenguaje Cinematográfico',
            description: 'Elementos básicos del cine',
            subject: subject.name,
            timeLimit: 10,
            passingScore: 70,
            difficulty: 'easy',
            tags: ['cine', 'lenguaje'],
            createdAt: new Date(),
            questions: [
              {
                id: 'qc1',
                type: 'multiple-choice',
                question: '¿Qué es un "plano" en cinematografía?',
                options: [
                  'El guion de la película',
                  'La distancia entre cámara y sujeto',
                  'El sonido de la película',
                  'La edición de escenas'
                ],
                correctAnswer: 1,
                explanation: 'Un plano cinematográfico se refiere a la distancia y ángulo desde el cual la cámara filma al sujeto.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['plano', 'cámara']
              },
              {
                id: 'qc2',
                type: 'true-false',
                question: 'El montaje es el proceso de unir diferentes planos',
                correctAnswer: 'true',
                explanation: 'El montaje es el proceso de edición que combina diferentes planos para crear una narrativa visual coherente.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['montaje', 'edición']
              }
            ]
          }
        );
        break;
        
      case 'english':
        allQuizzes.push(
          {
            id: 'english-1',
            title: 'English Grammar Basics',
            description: 'Fundamentos de gramática inglesa',
            subject: subject.name,
            timeLimit: 12,
            passingScore: 75,
            difficulty: 'easy',
            tags: ['gramática', 'inglés'],
            createdAt: new Date(),
            questions: [
              {
                id: 'qe1',
                type: 'multiple-choice',
                question: 'Which sentence uses the present perfect correctly?',
                options: [
                  'I go to school yesterday',
                  'I have gone to school',
                  'I will go to school',
                  'I am going to school'
                ],
                correctAnswer: 1,
                explanation: 'The present perfect (have/has + past participle) is used for actions that happened at an unspecified time before now.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['present perfect', 'grammar']
              },
              {
                id: 'qe2',
                type: 'true-false',
                question: 'Water is an uncountable noun',
                correctAnswer: 'true',
                explanation: 'Water is an uncountable noun because it cannot be counted as individual units. We say "water" not "waters" in general contexts.',
                difficulty: 'easy',
                subject: subject.name,
                tags: ['countable', 'uncountable']
              }
            ]
          }
        );
        break;
    }
  });
  
  return allQuizzes;
};

const mockQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Fundamentos de Virología',
    description: 'Conceptos básicos de virología veterinaria',
    subject: 'Virología',
    timeLimit: 15,
    passingScore: 70,
    difficulty: 'easy',
    tags: ['virus', 'clasificación'],
    createdAt: new Date(),
    questions: [
      {
        id: 'q1-1',
        type: 'multiple-choice',
        question: '¿Cuál es la característica principal de los virus?',
        options: [
          'Son células vivas',
          'Necesitan células huésped para replicarse',
          'Pueden reproducirse solos',
          'Tienen núcleo definido'
        ],
        correctAnswer: 1,
        explanation: 'Los virus son parásitos intracelulares obligados que necesitan células huésped para replicarse.',
        difficulty: 'easy',
        subject: 'Virología',
        tags: ['virus', 'replicación']
      },
      {
        id: 'q1-2',
        type: 'true-false',
        question: 'Los virus son más grandes que las bacterias',
        correctAnswer: 'false',
        explanation: 'Los virus son mucho más pequeños que las bacterias, generalmente miden nanómetros mientras que las bacterias miden micrómetros.',
        difficulty: 'easy',
        subject: 'Virología',
        tags: ['virus', 'bacterias', 'tamaño']
      },
      {
        id: 'q3',
        type: 'fill-blank',
        question: 'El virus de la rabia pertenece a la familia ____ y afecta principalmente al sistema ____.',
        correctAnswer: ['Rhabdoviridae', 'nervioso'],
        explanation: 'El virus de la rabia pertenece a la familia Rhabdoviridae y es conocido por afectar principalmente el sistema nervioso central.',
        difficulty: 'medium',
        subject: 'Virología',
        tags: ['rabia', 'clasificación']
      }
    ]
  },
  {
    id: 'q2',
    title: 'Parásitos Gastrointestinales',
    description: 'Identificación y ciclo de vida de parásitos comunes',
    subject: 'Parasitología',
    timeLimit: 12,
    passingScore: 75,
    difficulty: 'medium',
    tags: ['helmintos', 'gastrointestinal'],
    createdAt: new Date(),
    questions: [
      {
        id: 'q2-1',
        type: 'multiple-choice',
        question: '¿Cuál es el parásito más común en perros?',
        options: [
          'Toxocara canis',
          'Diphyllobothrium latum',
          'Schistosoma mansoni',
          'Taenia solium'
        ],
        correctAnswer: 0,
        explanation: 'Toxocara canis es uno de los parásitos más frecuentes en perros, especialmente en cachorros.',
        difficulty: 'easy',
        subject: 'Parasitología',
        tags: ['nematodos', 'perros']
      },
      {
        id: 'q2-2',
        type: 'true-false',
        question: 'Todos los parásitos intestinales causan diarrea',
        correctAnswer: 'false',
        explanation: 'No todos los parásitos intestinales causan diarrea. Algunos pueden ser asintomáticos o causar otros síntomas como pérdida de peso o anemia.',
        difficulty: 'medium',
        subject: 'Parasitología',
        tags: ['síntomas', 'diagnóstico']
      }
    ]
  }
];

export const useQuizzes = () => {
  const { activeSubjects } = useSubjects();
  const [quizzes] = useState<Quiz[]>(() => generateQuizzesForSubjects(activeSubjects));
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number | string[]>>({});
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Get current question
  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];

  // Calculate quiz stats
  const stats: QuizStats = {
    totalAttempts: attempts.length,
    averageScore: attempts.length > 0 
      ? attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length 
      : 0,
    bestScore: attempts.length > 0 
      ? Math.max(...attempts.map(attempt => attempt.score)) 
      : 0,
    recentAttempts: attempts.slice(-5).reverse(),
    subjectStats: attempts.reduce((acc, attempt) => {
      const quiz = quizzes.find(q => q.id === attempt.quizId);
      if (quiz) {
        if (!acc[quiz.subject]) {
          acc[quiz.subject] = { attempts: 0, averageScore: 0 };
        }
        acc[quiz.subject].attempts++;
        acc[quiz.subject].averageScore += attempt.score;
      }
      return acc;
    }, {} as Record<string, { attempts: number; averageScore: number }>)
  };

  // Calculate average scores for each subject
  Object.keys(stats.subjectStats).forEach(subject => {
    const subjectAttempts = attempts.filter(attempt => {
      const quiz = quizzes.find(q => q.id === attempt.quizId);
      return quiz?.subject === subject;
    });
    if (subjectAttempts.length > 0) {
      stats.subjectStats[subject].averageScore /= subjectAttempts.length;
    }
  });

  // Start quiz
  const startQuiz = useCallback((quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsQuizActive(true);
    setQuizStartTime(new Date());
    setShowResults(false);
  }, []);

  // Answer question
  const answerQuestion = useCallback((questionId: string, answer: string | number | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  // Navigate questions
  const nextQuestion = useCallback(() => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuiz, currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Submit quiz
  const submitQuiz = useCallback(() => {
    if (!currentQuiz || !quizStartTime) return;

    const correctAnswers = currentQuiz.questions.reduce((count, question) => {
      const userAnswer = answers[question.id];
      if (question.type === 'multiple-choice' && typeof userAnswer === 'number') {
        return userAnswer === question.correctAnswer ? count + 1 : count;
      } else if (question.type === 'true-false' && typeof userAnswer === 'string' && typeof question.correctAnswer === 'string') {
        return userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() 
          ? count + 1 : count;
      } else if (question.type === 'fill-blank' && Array.isArray(question.correctAnswer)) {
        const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
        const correctAnswersArray = question.correctAnswer;
        
        // Check if all blanks are filled correctly
        const allCorrect = correctAnswersArray.every((correct, index) => {
          const userValue = userAnswers[index] || '';
          return typeof userValue === 'string' && userValue.toLowerCase().trim() === correct.toLowerCase().trim();
        });
        
        return allCorrect ? count + 1 : count;
      }
      return count;
    }, 0);

    const score = (correctAnswers / currentQuiz.questions.length) * 100;
    const timeSpent = Math.floor((new Date().getTime() - quizStartTime.getTime()) / 1000);

    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId: currentQuiz.id,
      answers,
      score,
      correctAnswers,
      totalQuestions: currentQuiz.questions.length,
      timeSpent,
      completedAt: new Date(),
      passed: score >= currentQuiz.passingScore
    };

    setAttempts(prev => [...prev, attempt]);
    setShowResults(true);
    setIsQuizActive(false);
  }, [currentQuiz, answers, quizStartTime]);

  // Reset quiz
  const resetQuiz = useCallback(() => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsQuizActive(false);
    setQuizStartTime(null);
    setShowResults(false);
  }, []);

  // Get quizzes by subject
  const getQuizzesBySubject = useCallback((subject: string) => {
    return quizzes.filter(quiz => quiz.subject === subject);
  }, [quizzes]);

  // Get quiz by ID
  const getQuizById = useCallback((id: string) => {
    return quizzes.find(quiz => quiz.id === id);
  }, [quizzes]);

  // Calculate progress
  const progress = currentQuiz 
    ? ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100 
    : 0;

  // Check if all questions are answered
  const allQuestionsAnswered = currentQuiz 
    ? currentQuiz.questions.every(q => answers[q.id] !== undefined)
    : false;

  return {
    // State
    quizzes,
    currentQuiz,
    currentQuestion,
    currentQuestionIndex,
    answers,
    isQuizActive,
    quizStartTime,
    attempts,
    showResults,
    stats,
    progress,
    allQuestionsAnswered,

    // Actions
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz,
    getQuizzesBySubject,
    getQuizById,
  };
};
