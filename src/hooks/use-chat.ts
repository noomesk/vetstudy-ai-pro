import { useState, useCallback, useEffect, useRef } from 'react';
import { useSubjects, Subject } from './use-subjects';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  subject?: string;
}

export const useChat = () => {
  const { activeSubjects } = useSubjects();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu tutor de estudio universitario de élite. Estoy aquí para ayudarte a comprender profundamente los temas de tu programa. ¿En qué materia te gustaría trabajar hoy? Puedes preguntarme sobre conceptos específicos, procesos, mecanismos, o pedirme que amplíe cualquier tema.',
      timestamp: new Date(),
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('virology');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedSubject && activeSubjects.length > 0) {
      setSelectedSubject(activeSubjects[0].id);
    }
  }, [selectedSubject, activeSubjects]);

  const suggestedQuestions = [
    'Explícame los conceptos fundamentales de esta materia',
    '¿Cuáles son los mecanismos clave que debo dominar?',
    'Ayúdame a entender las conexiones entre temas',
    '¿Qué preguntas típicas aparecen en los exámenes?',
    'Dame un repaso completo para mi examen',
  ];

  // Función para obtener el nombre de la materia
  const getSubjectName = (subjectId: string): string => {
    const subjectNames: Record<string, string> = {
      virology: 'Virología',
      parasitology: 'Parasitología',
      anatomy: 'Anatomía',
      physiology: 'Fisiología',
      pharmacology: 'Farmacología',
      pathology: 'Patología',
    };
    return subjectNames[subjectId] || 'General';
  };

  // Función para enviar mensaje a la API
  const sendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      subject: selectedSubject,
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Preparar historial de conversación para contexto
      const conversationHistory = messages
        .filter(m => m.id !== '1')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      conversationHistory.push({
        role: 'user',
        content: currentInput
      });

      // Llamada a nuestra API backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationHistory,
          subject: getSubjectName(selectedSubject)
        }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.message) {
        throw new Error('No se recibió respuesta válida del tutor');
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        subject: selectedSubject,
      };

      setMessages(prev => [...prev, aiResponse]);

    } catch (err) {
      console.error('Error en chat:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Lo siento, hubo un problema al procesar tu pregunta. Por favor verifica que el servidor esté corriendo (npm run server) e intenta de nuevo.',
        timestamp: new Date(),
        subject: selectedSubject,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages, selectedSubject]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        const container = chatContainerRef.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 100);
    }
  }, [messages]);

  const clearConversation = useCallback(() => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Conversación reiniciada. ¿En qué tema te gustaría profundizar ahora?',
        timestamp: new Date(),
      }
    ]);
    setError(null);
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    error,
    selectedSubject,
    setSelectedSubject,
    subjects: activeSubjects,
    suggestedQuestions,
    sendMessage,
    handleKeyPress,
    clearConversation,
    chatContainerRef,
  };
};