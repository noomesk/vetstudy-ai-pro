import { useState, useCallback, useEffect, useRef } from 'react';
import { useSubjects, Subject } from './use-subjects';

const CHAT_STORAGE_KEY = 'vetstudy-chat-history';

interface ChatHistory {
  [subjectId: string]: Message[];
}

const loadChatHistory = (): ChatHistory => {
  try {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      Object.keys(parsed).forEach(subjectId => {
        parsed[subjectId] = parsed[subjectId].map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      });
      return parsed;
    }
  } catch (error) {
    console.error('Error loading chat history:', error);
  }
  return {};
};

const saveChatHistory = (history: ChatHistory) => {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

const getDefaultMessage = (subjectName: string): Message => ({
  id: '1',
  role: 'assistant',
  content: `¡Hola! Estoy aquí para ayudarte con **${subjectName}**. ¿Qué tema te gustaría explorar hoy?`,
  timestamp: new Date(),
});

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  subject?: string;
}

export const useChat = () => {
  const { activeSubjects } = useSubjects();
  const [chatHistory, setChatHistory] = useState<ChatHistory>(loadChatHistory);
  const [selectedSubject, setSelectedSubject] = useState<string>('virology');
  
  // Get messages for current subject from history
  const getSubjectMessages = useCallback((subjectId: string): Message[] => {
    const subject = activeSubjects.find(s => s.id === subjectId);
    const subjectName = subject?.name || 'General';
    
    if (chatHistory[subjectId] && chatHistory[subjectId].length > 0) {
      return chatHistory[subjectId];
    }
    
    // Return default welcome message for new chats
    return [getDefaultMessage(subjectName)];
  }, [chatHistory, activeSubjects]);
  
  const [messages, setMessages] = useState<Message[]>(() => getSubjectMessages('virology'));
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Update messages when subject changes
  useEffect(() => {
    setMessages(getSubjectMessages(selectedSubject));
  }, [selectedSubject, getSubjectMessages]);

  // Save messages to history whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      setChatHistory(prev => {
        const updated = { ...prev, [selectedSubject]: messages };
        saveChatHistory(updated);
        return updated;
      });
    }
  }, [messages, selectedSubject]);

  const suggestedQuestions = [
    'Explícame los conceptos fundamentales de esta materia',
    '¿Cuáles son los mecanismos clave que debo dominar?',
    'Ayúdame a entender las conexiones entre temas',
    '¿Qué preguntas típicas aparecen en los exámenes?',
    'Dame un repaso completo para mi examen',
  ];

  // Función para obtener el nombre de la materia dinámicamente desde activeSubjects
  const getSubjectName = useCallback((subjectId: string): string => {
    const subject = activeSubjects.find(s => s.id === subjectId);
    return subject?.name || 'General';
  }, [activeSubjects]);

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
    const subject = activeSubjects.find(s => s.id === selectedSubject);
    const subjectName = subject?.name || 'General';
    const newMessages = [getDefaultMessage(subjectName)];
    
    setMessages(newMessages);
    setChatHistory(prev => {
      const updated = { ...prev, [selectedSubject]: newMessages };
      saveChatHistory(updated);
      return updated;
    });
    setError(null);
  }, [selectedSubject, activeSubjects]);

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