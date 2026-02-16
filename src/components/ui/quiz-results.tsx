import React from 'react';
import { Quiz, QuizAttempt } from '@/hooks/use-quizzes';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target, 
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface QuizResultsProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onRetry: () => void;
  onBack: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  quiz,
  attempt,
  onRetry,
  onBack,
}) => {
  const scorePercentage = attempt.score;
  const passed = attempt.passed;
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-900';
    if (score >= 70) return 'bg-blue-100 dark:bg-blue-900';
    if (score >= 50) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Award className="w-8 h-8 text-green-600" />;
    if (score >= 70) return <Target className="w-8 h-8 text-blue-600" />;
    if (score >= 50) return <TrendingUp className="w-8 h-8 text-yellow-600" />;
    return <XCircle className="w-8 h-8 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Resultados del Quiz
        </h2>
        <p className="text-muted-foreground">
          {quiz.title}
        </p>
      </div>

      {/* Score Card */}
      <div className={`p-8 rounded-2xl ${getScoreBgColor(scorePercentage)} border-2 ${
        passed ? 'border-green-300 dark:border-green-700' : 'border-red-300 dark:border-red-700'
      }`}>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {getScoreIcon(scorePercentage)}
          </div>
          
          <div className={`text-5xl font-bold mb-2 ${getScoreColor(scorePercentage)}`}>
            {scorePercentage.toFixed(1)}%
          </div>
          
          <div className="text-lg font-medium text-foreground mb-4">
            {passed ? '¡Aprobado!' : 'No Aprobado'}
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-foreground">
                {attempt.correctAnswers}
              </div>
              <div className="text-muted-foreground">
                Correctas
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">
                {attempt.totalQuestions - attempt.correctAnswers}
              </div>
              <div className="text-muted-foreground">
                Incorrectas
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">
                {attempt.totalQuestions}
              </div>
              <div className="text-muted-foreground">
                Total
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Tiempo</div>
              <div className="font-semibold text-foreground">
                {formatTime(attempt.timeSpent)}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Mínimo para aprobar</div>
              <div className="font-semibold text-foreground">
                {quiz.passingScore}%
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Completado</div>
              <div className="font-semibold text-foreground">
                {attempt.completedAt.toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Revisión de Preguntas
        </h3>
        
        <div className="space-y-3">
          {quiz.questions.map((question, index) => {
            const userAnswer = attempt.answers[question.id];
            const isCorrect = question.type === 'multiple-choice' 
              ? userAnswer === question.correctAnswer
              : question.type === 'true-false' && typeof userAnswer === 'string' && typeof question.correctAnswer === 'string'
              ? userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
              : question.type === 'fill-blank' && Array.isArray(question.correctAnswer)
              ? Array.isArray(userAnswer) && question.correctAnswer.every((correct, index) => {
                  const userValue = userAnswer[index] || '';
                  return typeof userValue === 'string' && userValue.toLowerCase().trim() === correct.toLowerCase().trim();
                })
              : false;

            return (
              <div 
                key={question.id}
                className={`p-4 rounded-lg border ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-foreground">
                        Pregunta {index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isCorrect 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {isCorrect ? 'Correcta' : 'Incorrecta'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-foreground mb-2">
                      {question.question}
                    </p>
                    
                    {!isCorrect && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Tu respuesta: </span>
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          {question.type === 'multiple-choice' && typeof userAnswer === 'number'
                            ? question.options?.[userAnswer] || 'N/A'
                            : question.type === 'fill-blank' && Array.isArray(userAnswer)
                            ? userAnswer.join(', ') || 'Sin respuesta'
                            : userAnswer || 'Sin respuesta'
                          }
                        </span>
                      </div>
                    )}
                    
                    <div className="text-sm mt-2">
                      <span className="text-muted-foreground">Respuesta correcta: </span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        {question.type === 'multiple-choice' && typeof question.correctAnswer === 'number'
                          ? question.options?.[question.correctAnswer] || 'N/A'
                          : question.type === 'fill-blank' && Array.isArray(question.correctAnswer)
                          ? question.correctAnswer.join(', ')
                          : question.correctAnswer
                        }
                      </span>
                    </div>
                    
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <span className="font-medium">Explicación: </span>
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Reintentar Quiz
        </button>
        
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Volver a Quizzes
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
