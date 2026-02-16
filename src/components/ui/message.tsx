import React from 'react';
import { Message } from '@/hooks/use-chat';
import { Bot, User, Sparkles } from 'lucide-react';

interface MessageComponentProps {
  message: Message;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const getSubjectColor = (subject?: string) => {
    const colors: Record<string, string> = {
      virology: 'from-blue-500 to-blue-600',
      parasitology: 'from-green-500 to-green-600',
      anatomy: 'from-orange-500 to-orange-600',
    };
    return colors[subject || 'virology'] || colors.virology;
  };

  const getSubjectBadgeColor = (subject?: string) => {
    const colors: Record<string, string> = {
      virology: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
      parasitology: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
      anatomy: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300',
    };
    return colors[subject || 'virology'] || colors.virology;
  };

  return (
    <div className={`flex items-start gap-3 mb-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className={`w-8 h-8 bg-gradient-to-br ${getSubjectColor(message.subject)} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className={`max-w-[80%] min-w-0 ${isUser ? 'order-first' : ''}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
            {isUser ? 'Tú' : 'Tutor IA'}
          </span>
          {message.subject && (
            <span className={`px-2 py-0.5 text-xs rounded-full ${getSubjectBadgeColor(message.subject)} flex-shrink-0`}>
              {message.subject === 'virology' ? 'Virología' : 
               message.subject === 'parasitology' ? 'Parasitología' : 'Anatomía'}
            </span>
          )}
        </div>
        
        <div className={`rounded-lg p-3 break-words ${
          isUser 
            ? `bg-gradient-to-r ${getSubjectColor(message.subject)} text-white` 
            : 'bg-background border'
        }`}>
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        
        <div className="mt-1">
          <p className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
            {message.timestamp.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default MessageComponent;
