import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFlashcards } from '@/hooks/use-flashcards';
import { useSubjects } from '@/hooks/use-subjects';
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
  ThumbsDown,
  Plus,
  BarChart3,
  X
} from 'lucide-react';

const FlashcardsPage: React.FC = () => {
  const { activeSubjects } = useSubjects();
  const {
    flashcards,
    currentCard,
    currentCardIndex,
    showAnswer,
    stats,
    studySession,
    cardsToReview,
    selectedSubject,
    setSelectedSubject,
    addFlashcard,
    getStatsBySubject,
    getCurrentCardSubjectName,
    regenerateFlashcards,
    rateCard,
    flipCard,
    nextCard,
    previousCard,
    resetSession,
    getSessionTime,
  } = useFlashcards();

  const [showStats, setShowStats] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', subject: '' });
  const [cardTime, setCardTime] = useState(0);

  // Timer por tarjeta
  useEffect(() => {
    if (!showAnswer) {
      const interval = setInterval(() => {
        setCardTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showAnswer]);

  // Resetear timer al cambiar de tarjeta
  useEffect(() => {
    setCardTime(0);
  }, [currentCardIndex]);

  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  // Detectar cuando se completan todas las tarjetas
  useEffect(() => {
    if (!currentCard && studySession.cardsStudied > 0 && cardsToReview.length > 0) {
      setShowCompletionScreen(true);
    }
  }, [currentCard, studySession.cardsStudied, cardsToReview.length]);

  const handleDifficultyRating = (difficulty: 'easy' | 'medium' | 'hard') => {
    const quality = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 3 : 1;
    rateCard(quality);
  };

  const handleReset = () => {
    setShowCompletionScreen(false);
    resetSession();
  };

  if (showCompletionScreen || !currentCard) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">¡Felicidades!</h1>
          <p className="text-muted-foreground mb-4">Has completado todas las flashcards disponibles para repasar hoy.</p>
          
          {/* Show completion stats */}
          <div className="bg-muted p-6 rounded-lg max-w-md mx-auto mb-6">
            <h3 className="text-lg font-semibold mb-4">Resumen de la sesión</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{studySession.cardsStudied}</p>
                <p className="text-sm text-muted-foreground">Tarjetas estudiadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{studySession.correctAnswers}</p>
                <p className="text-sm text-muted-foreground">Respuestas correctas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{Math.round((studySession.correctAnswers / Math.max(studySession.cardsStudied, 1)) * 100)}%</p>
                <p className="text-sm text-muted-foreground">Precisión</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{getSessionTime()}</p>
                <p className="text-sm text-muted-foreground">Tiempo de estudio</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} className="bg-gradient-to-r from-blue-500 to-green-600">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reiniciar Sesión
            </Button>
            <Button variant="outline" onClick={() => setShowStats(true)}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Ver Estadísticas Detalladas
            </Button>
          </div>
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

      {/* Subject Selector */}
      <div className="flex items-center gap-4 bg-muted p-4 rounded-lg flex-wrap">
        <label className="font-medium">Materia:</label>
        <select 
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            resetSession();
          }}
          className="flex-1 px-3 py-2 rounded-md border bg-background text-foreground text-gray-900 min-w-[200px]"
        >
          <option value="all">Todas las materias</option>
          {activeSubjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.icon} {subject.name}
            </option>
          ))}
        </select>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            if (confirm('Esto borrará todas las flashcards existentes y creará nuevas. ¿Continuar?')) {
              regenerateFlashcards();
            }
          }}
          className="whitespace-nowrap"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Regenerar Flashcards ({flashcards.length} total)
        </Button>
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

      {showStats && (
        <div className="bg-muted p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Estadísticas por Materia</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-background p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Seleccionada</p>
              <p className="text-2xl font-bold">{getStatsBySubject(selectedSubject).toReview}</p>
              <p className="text-xs text-muted-foreground">por repasar</p>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Dominadas</p>
              <p className="text-2xl font-bold text-green-600">{getStatsBySubject(selectedSubject).mastered}</p>
              <p className="text-xs text-muted-foreground">en esta materia</p>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">En aprendizaje</p>
              <p className="text-2xl font-bold text-orange-600">{getStatsBySubject(selectedSubject).learning}</p>
              <p className="text-xs text-muted-foreground">en esta materia</p>
            </div>
          </div>
        </div>
      )}

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
                Tarjeta {currentCardIndex + 1} de {cardsToReview.length} - {getCurrentCardSubjectName()}
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
                            <span className="text-sm font-medium text-blue-500">Pregunta</span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground leading-relaxed">
                            {currentCard.front}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-4">
                            Haz clic para ver la respuesta
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center mb-4">
                            <EyeOff className="h-6 w-6 text-purple-500 mr-2" />
                            <span className="text-sm font-medium text-purple-500">Respuesta</span>
                          </div>
                          <h3 className="text-lg font-medium text-foreground mb-4 leading-relaxed">
                            {currentCard.back}
                          </h3>
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
                  <span className="font-medium">{currentCardIndex} / {cardsToReview.length}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min((currentCardIndex / Math.max(cardsToReview.length, 1)) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tiempo en esta tarjeta</span>
                  <span className="font-medium">{Math.floor(cardTime / 60)}:{(cardTime % 60).toString().padStart(2, '0')}</span>
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
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Crear Nueva Flashcard
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setShowStats(!showStats)}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                {showStats ? 'Ocultar' : 'Ver'} Estadísticas
              </Button>
              <Button className="w-full" variant="outline" onClick={resetSession}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reiniciar Progreso
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para crear flashcard */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Crear Nueva Flashcard</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pregunta (Frente)</label>
                <textarea
                  value={newCard.front}
                  onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md min-h-[80px] text-foreground bg-background"
                  placeholder="Escribe la pregunta..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Respuesta (Reverso)</label>
                <textarea
                  value={newCard.back}
                  onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md min-h-[80px] text-foreground bg-background"
                  placeholder="Escribe la respuesta..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Materia</label>
                <select
                  value={newCard.subject}
                  onChange={(e) => setNewCard({ ...newCard, subject: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md text-foreground bg-background"
                >
                  <option value="">Selecciona una materia</option>
                  {activeSubjects.map(subject => (
                    <option key={subject.id} value={subject.name}>
                      {subject.icon} {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button 
                className="w-full" 
                onClick={() => {
                  if (newCard.front && newCard.back && newCard.subject) {
                    addFlashcard(newCard.front, newCard.back, newCard.subject);
                    setNewCard({ front: '', back: '', subject: '' });
                    setShowCreateForm(false);
                  }
                }}
                disabled={!newCard.front || !newCard.back || !newCard.subject}
              >
                <Plus className="mr-2 h-4 w-4" />
                Crear Flashcard
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;
