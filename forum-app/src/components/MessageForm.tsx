'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface MessageFormProps {
  onMessagePosted: () => void;
}

export default function MessageForm({ onMessagePosted }: MessageFormProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setMessage('Please enter a message');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setContent('');
        setMessage('Message posted successfully!');
        onMessagePosted();
      } else {
        setMessage(data.message || 'Failed to post message');
      }
    } catch (error) {
      console.error('Error posting message:', error);
      setMessage('Failed to post message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">Your Message</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts with the community..."
              rows={4}
              maxLength={1000}
              className="resize-none"
            />
            <div className="text-sm text-gray-500 text-right">
              {content.length}/1000 characters
            </div>
          </div>

          {message && (
            <div className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}

          <Button type="submit" disabled={loading || !content.trim()}>
            {loading ? 'Posting...' : 'Post Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

