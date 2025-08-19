'use client';

import React from 'react';
import { Card, CardContent } from './ui/card';
import { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No messages yet. Be the first to post!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <Card key={message.id} className="transition-shadow hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {message.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-900">{message.username}</span>
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(message.created_at)}
              </span>
            </div>
            <div className="text-gray-700 leading-relaxed">
              {message.content}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

