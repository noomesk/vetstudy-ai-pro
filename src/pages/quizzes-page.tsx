import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Badge from '@/components/ui/badge';
import Progress from '@/components/ui/progress';
import QuizQuestion from '@/components/ui/quiz-question';
import QuizResults from '@/components/ui/quiz-results';
import { useQuizzes } from '@/hooks/use-quizzes';
import { 
  Brain, 
  Clock, 
  Target, 
  TrendingUp, 
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BarChart3,
  Calendar,
  Award
} from 'lucide-react';

const QuizzesPage: React.FC = () => {
  const {
    quizzes,
    currentQuiz,
    currentQuestion,
    currentQuestionIndex,
    answers,
    isQuizActive,
    attempts,
    showResults,
    stats,
    progress,
    allQuestionsAnswered,
    startQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz,
    getQuizzesBySubject,
  } = useQuizzes();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredQuizzes = selectedSubject === 'all' 
    ? quizzes 
    : getQuizzesBySubject(selectedSubject);

  const subjects = [
    { id: 'all', name: 'Todos', color: 'gray' },
    { id: 'virology', name: 'Virología', color: 'blue' },
    { id: 'parasitology', name: 'Parasitología', color: 'green' },
    { id: 'anatomy', name: 'Anatomía', color: 'orange' },
  ];

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      virology: 'from-blue-500 to-blue-600',
      parasitology: 'from-green-500 to-green-600',
      anatomy: 'from-orange-500 to-orange-600',
    };
    return colors[subject] || 'from-gray-500 to-gray-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return colors[difficulty as keyof typeof colors] || colors.medium;
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels: Record<string, string> = {
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
    };
    return labels[difficulty as keyof typeof labels] || labels.medium;
  };

  const formatTime = (minutes: number) => {
    return `${minutes} min`;
  };

  // If showing results
  if (showResults && currentQuiz) {
    const lastAttempt = attempts[attempts.length - 1];
    if (lastAttempt) {
      return (
        <QuizResults
          quiz={currentQuiz}
          attempt={lastAttempt}
          onRetry={() => startQuiz(currentQuiz)}
          onBack={resetQuiz}
        />
      );
    }
  }

  // If quiz is active
  if (isQuizActive && currentQuiz && currentQuestion) {
    return (
      <div className="space-y-6">
        {/* Quiz Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{currentQuiz.title}</h1>
            <p className="text-muted-foreground">
              Pregunta {currentQuestionIndex + 1} de {currentQuiz.questions.length}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {currentQuiz.timeLimit && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatTime(currentQuiz.timeLimit)}</span>
              </div>
            )}
            
            <Badge variant="outline" className="text-xs">
              {Math.round(progress)}% completado
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card>
          <CardContent className="p-6">
            <QuizQuestion
              question={currentQuestion}
              userAnswer={answers[currentQuestion.id]}
              onAnswer={(answer) => answerQuestion(currentQuestion.id, answer)}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex items-center gap-2">
            {currentQuiz.questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  index === currentQuestionIndex
                    ? 'bg-blue-500 text-white'
                    : answers[currentQuiz.questions[index].id] !== undefined
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>

          {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
            <Button
              onClick={submitQuiz}
              disabled={!allQuestionsAnswered}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              Finalizar Quiz
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              className="flex items-center gap-2"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Main quizzes list
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-600/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Quizzes
              </h1>
              <p className="text-muted-foreground">Evalúa tu conocimiento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-50 dark:bg-blue-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Quizzes
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{quizzes.length}</div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Intentos
            </CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalAttempts}</div>
            <p className="text-xs text-muted-foreground">Realizados</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Promedio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {stats.averageScore.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Puntuación</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mejor Puntuación
            </CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.bestScore.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Logrado</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Filter */}
      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <Button
            key={subject.id}
            variant={selectedSubject === subject.id ? "default" : "outline"}
            onClick={() => setSelectedSubject(subject.id)}
            className="flex items-center gap-2"
          >
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSubjectColor(subject.id)}`}></div>
            {subject.name}
          </Button>
        ))}
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => {
          const quizAttempts = attempts.filter(a => a.quizId === quiz.id);
          const bestScore = quizAttempts.length > 0 
            ? Math.max(...quizAttempts.map(a => a.score)) 
            : 0;

          return (
            <Card key={quiz.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{quiz.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {quiz.description}
                    </CardDescription>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getSubjectColor(quiz.subject)} flex items-center justify-center flex-shrink-0 ml-3`}>
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Quiz Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{quiz.questions.length} preguntas</span>
                  </div>
                  
                  {quiz.timeLimit && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(quiz.timeLimit)}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {getDifficultyLabel(quiz.difficulty)}
                  </Badge>
                  {quiz.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Progress */}
                {quizAttempts.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Mejor puntuación</span>
                      <span className="font-medium">{bestScore.toFixed(1)}%</span>
                    </div>
                    <Progress value={bestScore} className="h-2" />
                  </div>
                )}

                {/* Action Button */}
                <Button
                  onClick={() => startQuiz(quiz)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {quizAttempts.length > 0 ? 'Reintentar' : 'Comenzar'}
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {filteredQuizzes.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hay quizzes disponibles
            </h3>
            <p className="text-muted-foreground">
              No se encontraron quizzes para esta materia
            </p>
          </div>
        )}
      </div>

      {/* Recent Attempts */}
      {stats.recentAttempts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Intentos Recientes
            </CardTitle>
            <CardDescription>
              Historial de tus últimos quizzes completados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentAttempts.map((attempt) => {
                const quiz = quizzes.find(q => q.id === attempt.quizId);
                if (!quiz) return null;

                return (
                  <div key={attempt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        attempt.passed ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {attempt.completedAt.toLocaleDateString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        attempt.passed ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {attempt.score.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attempt.correctAnswers}/{attempt.totalQuestions}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizzesPage;
