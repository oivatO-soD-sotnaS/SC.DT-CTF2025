import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '../../../../../lib/auth';
import { LoginData } from '../../../../../types';

export async function POST(request: NextRequest) {
  try {
    const body: LoginData = await request.json();
    const result = await loginUser(body);

    if (result.success) {
      const response = NextResponse.json({
        success: true,
        message: result.message,
        user: result.user
      }, { status: 200 });

      // Set HTTP-only cookie with the JWT token
      response.cookies.set('auth-token', result.token!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 // 24 hours
      });

      return response;
    } else {
      return NextResponse.json({
        success: false,
        message: result.message
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

