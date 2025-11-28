import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: {
    id: number;
    text: string;
    sender: 'user' | 'other';
    timestamp: string;
    read: boolean;
    type: 'text' | 'image' | 'file';
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs px-4 py-2 rounded-2xl ${isUser ? 'bg-black text-white' : 'bg-gray-200 text-gray-900'}`}>
        <p className="font-light text-sm md:text-base">{message.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <p className={`text-xs font-light ${isUser ? 'text-gray-300' : 'text-gray-600'}`}>
            {message.timestamp}
          </p>
          {isUser && (
            <span className={`${message.read ? 'text-blue-400' : 'text-gray-400'}`}>
              {message.read ? <CheckCheck size={12} /> : <Check size={12} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;