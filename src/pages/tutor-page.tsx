import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MessageComponent from '@/components/ui/message';
import { useChat } from '@/hooks/use-chat';
import { Brain, MessageCircle, Sparkles, BookOpen, Send, Loader2 } from 'lucide-react';

const TutorPage: React.FC = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    selectedSubject,
    setSelectedSubject,
    subjects,
    suggestedQuestions,
    sendMessage,
    handleKeyPress,
    chatContainerRef,
  } = useChat();

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

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
                Tutor IA
              </h1>
              <p className="text-muted-foreground">Tu asistente inteligente de estudio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-purple-500" />
                Conversación con el Tutor
              </CardTitle>
              <CardDescription>
                Haz preguntas sobre tu material de estudio
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-[600px]">
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4 pr-2 min-h-0 custom-scrollbar">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <MessageComponent key={message.id} message={message} />
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Loader2 className="h-4 w-4 text-white animate-spin" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground mb-1">Tutor IA</p>
                        <div className="bg-background rounded-lg p-3 border">
                          <p className="text-sm text-muted-foreground">Escribiendo respuesta...</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 flex-shrink-0 pt-2 border-t">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu pregunta aquí..."
                  className="flex-1 px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 flex-shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Materias Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {subjects.map((subject) => (
                <Button
                  key={subject.id}
                  variant={selectedSubject === subject.id ? "default" : "outline"}
                  className={`w-full justify-start ${
                    selectedSubject === subject.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white border-0'
                      : ''
                  }`}
                  onClick={() => setSelectedSubject(subject.id)}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    subject.isActive ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                  {subject.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sugerencias</CardTitle>
              <CardDescription>
                Preguntas frecuentes sobre {selectedSubject === 'virology' ? 'Virología' : 
                                       selectedSubject === 'parasitology' ? 'Parasitología' : 'Anatomía'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <p 
                  key={index}
                  className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-2 rounded hover:bg-muted/50"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </p>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Chat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mensajes hoy</span>
                <span className="font-medium">{messages.length - 1}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Materia activa</span>
                <span className="font-medium">
                  {selectedSubject === 'virology' ? 'Virología' : 
                   selectedSubject === 'parasitology' ? 'Parasitología' : 'Anatomía'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Respuestas rápidas</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TutorPage;
