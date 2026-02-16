import React from 'react';
import { Question } from '@/hooks/use-quizzes';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  userAnswer: string | number | string[] | undefined;
  onAnswer: (answer: string | number | string[]) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  userAnswer,
  onAnswer,
  showResult = false,
  isCorrect,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[difficulty as keyof typeof colors] || colors.medium;
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
    };
    return labels[difficulty as keyof typeof labels] || labels.medium;
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const isSelected = userAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              
              return (
                <button
                  key={index}
                  onClick={() => onAnswer(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    showResult
                      ? isCorrectOption
                        ? 'border-green-500 bg-green-50 dark:bg-green-950'
                        : isSelected && !isCorrectOption
                        ? 'border-red-500 bg-red-50 dark:bg-red-950'
                        : 'border-gray-200 bg-gray-50 dark:bg-gray-800'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                      : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showResult
                          ? isCorrectOption
                            ? 'border-green-500 bg-green-500'
                            : isSelected && !isCorrectOption
                            ? 'border-red-500 bg-red-500'
                            : 'border-gray-300'
                          : isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {(showResult && isCorrectOption) || (!showResult && isSelected) ? (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        ) : null}
                      </div>
                      <span className={`font-medium ${
                        showResult && isCorrectOption ? 'text-green-700 dark:text-green-300' : 
                        showResult && isSelected && !isCorrectOption ? 'text-red-700 dark:text-red-300' : 
                        'text-foreground'
                      }`}>
                        {option}
                      </span>
                    </div>
                    {showResult && isCorrectOption && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {showResult && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'true-false':
        const trueSelected = userAnswer === 'true';
        const falseSelected = userAnswer === 'false';
        const correctAnswer = question.correctAnswer as string;
        
        return (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onAnswer('true')}
              disabled={showResult}
              className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                showResult
                  ? correctAnswer === 'true'
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : trueSelected
                    ? 'border-red-500 bg-red-50 dark:bg-red-950'
                    : 'border-gray-200 bg-gray-50 dark:bg-gray-800'
                  : trueSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  showResult
                    ? correctAnswer === 'true'
                      ? 'border-green-500 bg-green-500'
                      : trueSelected
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                    : trueSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {(showResult && correctAnswer === 'true') || (!showResult && trueSelected) ? (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  ) : null}
                </div>
                <span className={`font-bold text-lg ${
                  showResult && correctAnswer === 'true' ? 'text-green-700 dark:text-green-300' : 
                  showResult && trueSelected && correctAnswer !== 'true' ? 'text-red-700 dark:text-red-300' : 
                  'text-foreground'
                }`}>
                  Verdadero
                </span>
                {showResult && correctAnswer === 'true' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && trueSelected && correctAnswer !== 'true' && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>

            <button
              onClick={() => onAnswer('false')}
              disabled={showResult}
              className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                showResult
                  ? correctAnswer === 'false'
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : falseSelected
                    ? 'border-red-500 bg-red-50 dark:bg-red-950'
                    : 'border-gray-200 bg-gray-50 dark:bg-gray-800'
                  : falseSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  showResult
                    ? correctAnswer === 'false'
                      ? 'border-green-500 bg-green-500'
                      : falseSelected
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                    : falseSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {(showResult && correctAnswer === 'false') || (!showResult && falseSelected) ? (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  ) : null}
                </div>
                <span className={`font-bold text-lg ${
                  showResult && correctAnswer === 'false' ? 'text-green-700 dark:text-green-300' : 
                  showResult && falseSelected && correctAnswer !== 'false' ? 'text-red-700 dark:text-red-300' : 
                  'text-foreground'
                }`}>
                  Falso
                </span>
                {showResult && correctAnswer === 'false' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showResult && falseSelected && correctAnswer !== 'false' && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </button>
          </div>
        );

      case 'fill-blank':
        const fillAnswers = (Array.isArray(userAnswer) ? userAnswer : []) as string[];
        const correctFillAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer as string];
        const isFillCorrect = correctFillAnswers.every((correct, index) => {
          const userValue = fillAnswers[index] || '';
          return userValue.toLowerCase().trim() === correct.toLowerCase().trim();
        });
        
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              {question.question.split('____').map((part, index, array) => {
                if (index < array.length - 1) {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-foreground">{part}</span>
                      <input
                        type="text"
                        value={fillAnswers[index] || ''}
                        onChange={(e) => {
                          const newAnswers = [...fillAnswers];
                          newAnswers[index] = e.target.value;
                          onAnswer(newAnswers);
                        }}
                        disabled={showResult}
                        placeholder={`respuesta ${index + 1}`}
                        className={`px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          showResult
                            ? correctFillAnswers[index] && fillAnswers[index]?.toLowerCase().trim() === correctFillAnswers[index].toLowerCase().trim()
                              ? 'border-green-500 bg-green-50 dark:bg-green-950'
                              : 'border-red-500 bg-red-50 dark:bg-red-950'
                            : 'border-gray-300 bg-white dark:bg-gray-800'
                        }`}
                      />
                    </div>
                  );
                } else {
                  return (
                    <span key={index} className="text-foreground">{part}</span>
                  );
                }
              })}
            </div>
            {showResult && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                isFillCorrect 
                  ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
                  : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
              }`}>
                {isFillCorrect ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {isFillCorrect ? 'Correcto' : `Respuestas correctas: ${correctFillAnswers.join(', ')}`}
                </span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
              <AlertCircle className="w-5 h-5" />
              <span>Tipo de pregunta no implementado</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {question.question}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {getDifficultyLabel(question.difficulty)}
            </span>
            {question.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Question Content */}
      {renderQuestionContent()}

      {/* Explanation (show when results are displayed) */}
      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Explicación:
          </h4>
          <p className="text-blue-600 dark:text-blue-400">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
