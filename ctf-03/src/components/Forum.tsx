'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../contexts/AuthContext';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import Navbar from './Navbar';
import { Message } from '../../types';
import Link from 'next/link';

export default function Forum() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages);
      } else {
        console.error('Failed to fetch messages:', data.message);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
          <p>Share your thoughts and connect with others</p>
        </div>

        {/* Message Form - Only show if user is logged in */}
        {user && (
          <div className="mb-8">
            <MessageForm onMessagePosted={fetchMessages} />
          </div>
        )}

        {/* Messages Section */}
        <Card>
          <CardHeader>
            <CardTitle>Forum Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingMessages ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"></div>
                <p className="mt-4">Loading messages...</p>
              </div>
            ) : (
              <MessageList messages={messages} />
            )}
          </CardContent>
        </Card>

        {/* Call to Action for Non-logged in Users */}
        {!user && (
          <div className="mt-8 text-center">
            <Card>
              <CardContent className="py-8">
                <h3 className="text-lg font-medium mb-2">
                  Join the Conversation
                </h3>
                <p className="mb-4">
                  Login or create an account to post messages and participate in discussions.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link href="/login" className="inline-block">
                    <button className="px-6 py-2 rounded-md">
                      Login
                    </button>
                  </Link>
                  <Link href="/sign-in" className="inline-block">
                    <button className="px-6 py-2 rounded-md transition-colors">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <p>&copy; 2024 Community Forum.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

