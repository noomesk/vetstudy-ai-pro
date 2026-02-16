import React from 'react';
import { Message } from '@/hooks/use-chat';
import { Bot, User, Sparkles } from 'lucide-react';

interface MessageComponentProps {
  message: Message;
}

// Función para convertir markdown a HTML
const formatMarkdown = (content: string): string => {
  let formatted = content;
  
  // Bold: **text** -> <strong>text</strong>
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic: *text* -> <em>text</em> (evitando los que ya son bold)
  formatted = formatted.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
  
  // Headers: ### text -> <h3>text</h3>
  formatted = formatted.replace(/^### (.*$)/gim, '<h3 class="text-base font-semibold mt-3 mb-1">$1</h3>');
  formatted = formatted.replace(/^## (.*$)/gim, '<h2 class="text-lg font-semibold mt-4 mb-2">$1</h2>');
  formatted = formatted.replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold mt-4 mb-2">$1</h1>');
  
  // Bullet lists: • text -> <li>text</li>
  formatted = formatted.replace(/^• (.*$)/gim, '<li class="ml-4 list-disc">$1</li>');
  
  // Numbered lists: 1. text -> <li>text</li>
  formatted = formatted.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>');
  
  // Line breaks
  formatted = formatted.replace(/\n/g, '<br>');
  
  return formatted;
};

const MessageComponent: React.FC<MessageComponentProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const getSubjectColor = (subject?: string) => {
    const colors: Record<string, string> = {
      virology: 'from-blue-500 to-blue-600',
      parasitology: 'from-green-500 to-green-600',
      anatomy: 'from-orange-500 to-orange-600',
      physiology: 'from-red-500 to-red-600',
      pharmacology: 'from-purple-500 to-purple-600',
      pathology: 'from-gray-500 to-gray-600',
    };
    return colors[subject || 'virology'] || colors.virology;
  };

  const getSubjectBadgeColor = (subject?: string) => {
    const colors: Record<string, string> = {
      virology: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
      parasitology: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
      anatomy: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300',
      physiology: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300',
      pharmacology: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
      pathology: 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300',
    };
    return colors[subject || 'virology'] || colors.virology;
  };

  const getSubjectName = (subject?: string) => {
    const names: Record<string, string> = {
      virology: 'Virología',
      parasitology: 'Parasitología',
      anatomy: 'Anatomía',
      physiology: 'Fisiología',
      pharmacology: 'Farmacología',
      pathology: 'Patología',
    };
    return names[subject || 'virology'] || 'General';
  };

  return (
    <div className={`flex items-start gap-3 mb-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className={`w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0`}>
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
              {getSubjectName(message.subject)}
            </span>
          )}
        </div>
        
        <div className={`rounded-lg p-3 break-words ${
          isUser 
            ? `bg-gradient-to-r ${getSubjectColor(message.subject)} text-white` 
            : 'bg-background border'
        }`}>
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div 
              className="text-sm prose prose-sm max-w-none dark:prose-invert
                [&>strong]:font-bold [&>em]:italic
                [&>h1]:text-xl [&>h1]:font-bold [&>h1]:mt-4 [&>h1]:mb-2
                [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:mt-3 [&>h2]:mb-2
                [&>h3]:text-base [&>h3]:font-semibold [&>h3]:mt-2 [&>h3]:mb-1
                [&>li]:ml-4 [&>li]:list-disc"
              dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
            />
          )}
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