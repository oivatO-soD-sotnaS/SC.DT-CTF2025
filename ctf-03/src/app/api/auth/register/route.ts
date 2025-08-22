import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '../../../../../lib/auth';
import { CreateUserData } from '../../../../../types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserData = await request.json();
    const result = await registerUser(body);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        user: result.user
      }, { status: 201 });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

