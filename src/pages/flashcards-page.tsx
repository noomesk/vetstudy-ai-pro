import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFlashcards } from '@/hooks/use-flashcards';
import { 
  BookOpen, 
  Clock, 
  Target, 
  RotateCcw, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const FlashcardsPage: React.FC = () => {
  const {
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
  } = useFlashcards();

  const handleDifficultyRating = (difficulty: 'easy' | 'medium' | 'hard') => {
    const quality = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 1;
    rateCard(quality);
  };

  if (!currentCard) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">¡Felicidades!</h1>
          <p className="text-muted-foreground mb-8">Has completado todas las flashcards disponibles para repasar hoy.</p>
          <Button onClick={resetSession} className="bg-gradient-to-r from-blue-500 to-green-600">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reiniciar Sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-600/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Flashcards
              </h1>
              <p className="text-muted-foreground">Repetición espaciada para máximo retención</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-50 dark:bg-blue-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Para repasar hoy
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.toReview}</div>
            <p className="text-xs text-muted-foreground">Tarjetas pendientes</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dominadas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.mastered}</div>
            <p className="text-xs text-muted-foreground">Total aprendidas</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 dark:bg-orange-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              En aprendizaje
            </CardTitle>
            <RotateCcw className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.learning}</div>
            <p className="text-xs text-muted-foreground">En proceso</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-950 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Racha actual
            </CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.streak} días</div>
            <p className="text-xs text-muted-foreground">¡Sigue así!</p>
          </CardContent>
        </Card>
      </div>

      {/* Flashcard Study Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Sesión de Estudio
              </CardTitle>
              <CardDescription>
                Tarjeta {currentCardIndex + 1} de {cardsToReview.length} - {
                  currentCard.subject === 'virology' ? 'Virología' : 
                  currentCard.subject === 'parasitology' ? 'Parasitología' : 'Anatomía'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-xl p-8 border-2 border-dashed border-blue-200 dark:border-blue-800 min-h-[200px] flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg"
                       onClick={flipCard}>
                    <div className="text-center">
                      {!showAnswer ? (
                        <>
                          <div className="flex items-center justify-center mb-4">
                            <Eye className="h-6 w-6 text-blue-500 mr-2" />
                            <span className="text-sm font-medium text-blue-500">Respuesta</span>
                          </div>
                          <h3 className="text-lg font-medium text-foreground leading-relaxed">
                            {currentCard.back}
                          </h3>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center mb-4">
                            <EyeOff className="h-6 w-6 text-purple-500 mr-2" />
                            <span className="text-sm font-medium text-purple-500">Pregunta</span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-4">
                            {currentCard.front}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Haz clic para ver la respuesta
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {showAnswer && (
                <div className="mt-6 space-y-3">
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    ¿Cómo te fue con esta tarjeta?
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <Button 
                      onClick={() => handleDifficultyRating('hard')}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 hover:border-red-300"
                      variant="outline"
                    >
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Difícil
                    </Button>
                    <Button 
                      onClick={() => handleDifficultyRating('medium')}
                      className="bg-yellow-50 hover:bg-yellow-100 text-yellow-600 border-yellow-200 hover:border-yellow-300"
                      variant="outline"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Regular
                    </Button>
                    <Button 
                      onClick={() => handleDifficultyRating('easy')}
                      className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 hover:border-green-300"
                      variant="outline"
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Fácil
                    </Button>
                  </div>
                </div>
              )}
              
              {!showAnswer && (
                <div className="mt-6 flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={previousCard}
                    disabled={currentCardIndex === 0}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={flipCard}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Respuesta
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={nextCard}
                    disabled={currentCardIndex >= cardsToReview.length - 1}
                    className="flex-1"
                  >
                    Siguiente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                Progreso de Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Tarjetas repasadas</span>
                  <span className="font-medium">{getSessionProgress()} / {cardsToReview.length}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(getSessionProgress() / cardsToReview.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tiempo de estudio</span>
                  <span className="font-medium">{getSessionTime()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tasa de éxito</span>
                  <span className="font-medium text-green-600">
                    {studySession.cardsStudied > 0 
                      ? Math.round((studySession.correctAnswers / studySession.cardsStudied) * 100) 
                      : 0}%
                    </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Crear Nueva Flashcard
              </Button>
              <Button className="w-full" variant="outline">
                <Target className="mr-2 h-4 w-4" />
                Ver Estadísticas
              </Button>
              <Button className="w-full" variant="outline" onClick={resetSession}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reiniciar Progreso
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
