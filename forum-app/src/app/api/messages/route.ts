import { NextRequest, NextResponse } from 'next/server';
import { getAllMessages, createMessage } from '../../../../lib/database';
import { verifyToken } from '../../../../lib/auth';
import { CreateMessageData } from '../../../../types';

// GET - Fetch all messages
export async function GET(request: NextRequest) {
  try {
    const messages = await getAllMessages();
    return NextResponse.json({
      success: true,
      messages: messages
    }, { status: 200 });
  } catch (error) {
    console.error('Get messages API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch messages'
    }, { status: 500 });
  }
}

// POST - Create a new message
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Invalid token'
      }, { status: 401 });
    }

    // Get message content from request body
    const body: CreateMessageData = await request.json();
    const { content } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Message content is required'
      }, { status: 400 });
    }

    if (content.length > 1000) {
      return NextResponse.json({
        success: false,
        message: 'Message content is too long (max 1000 characters)'
      }, { status: 400 });
    }

    // Create the message
    await createMessage(user.id, user.username, content.trim());

    return NextResponse.json({
      success: true,
      message: 'Message posted successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Create message API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to post message'
    }, { status: 500 });
  }
}

