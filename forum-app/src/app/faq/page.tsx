'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';

interface FAQ {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export default function FAQPage() {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq');
      const data = await response.json();
      
      if (data.success) {
        setFaqs(data.faqs);
      } else {
        console.error('Failed to fetch FAQs:', data.message);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage('Please login to submit a FAQ.');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage('Please fill in both title and content.');
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('FAQ submitted successfully!');
        setFormData({ title: '', content: '' });
        fetchFAQs(); // Refresh the FAQ list
      } else {
        setMessage(data.message || 'Failed to submit FAQ.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions or submit your own</p>
        </div>

        {/* FAQ Submission Form */}
        {user && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Submit a FAQ</CardTitle>
              <CardDescription>
                Help the community by submitting frequently asked questions and their answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Question Title</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your question title..."
                    maxLength={200}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {formData.title.length}/200 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Answer/Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Provide a detailed answer or explanation..."
                    rows={6}
                    maxLength={2000}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {formData.content.length}/2000 characters
                  </p>
                </div>

                {message && (
                  <div className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                  </div>
                )}

                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit FAQ'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Login prompt for non-authenticated users */}
        {!user && (
          <Card className="mb-8">
            <CardContent className="py-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Want to contribute?
              </h3>
              <p className="text-gray-600 mb-4">
                Login to submit your own FAQs and help the community
              </p>
              <div className="flex justify-center space-x-4">
                <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Login
                </a>
                <a href="/sign-in" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Sign Up
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        {/* FAQ List */}
        <Card>
          <CardHeader>
            <CardTitle>Community FAQs</CardTitle>
            <CardDescription>
              Questions and answers from our community members
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading FAQs...</p>
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No FAQs available yet. Be the first to contribute!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900 pr-4">
                        {faq.title}
                      </h3>
                      <div className="text-sm text-gray-500 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {faq.author.charAt(0).toUpperCase()}
                          </div>
                          <span>{faq.author}</span>
                        </div>
                        <p className="text-xs mt-1">
                          {new Date(faq.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap">
                      {faq.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Community Forum. Built with Next.js, Tailwind CSS, and ShadCN UI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

