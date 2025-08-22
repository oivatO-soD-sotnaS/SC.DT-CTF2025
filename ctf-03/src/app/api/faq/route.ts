import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/database';
import { verifyToken } from '../../../../lib/auth';

// GET - Fetch all FAQs
export async function GET() {
  try {
    const faqs = await new Promise((resolve, reject) => {
      db.all(`
        SELECT f.*, u.username as author 
        FROM faqs f 
        JOIN users u ON f.user_id = u.id 
        ORDER BY f.created_at DESC
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    return NextResponse.json({
      success: true,
      faqs
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST - Create new FAQ
export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    // Verify authentication
    const authResult = await verifyToken(request);
    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate input
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }

    if (title.length > 200) {
      return NextResponse.json(
        { success: false, message: 'Title must be 200 characters or less' },
        { status: 400 }
      );
    }

    if (content.length > 2000) {
      return NextResponse.json(
        { success: false, message: 'Content must be 2000 characters or less' },
        { status: 400 }
      );
    }

    const result = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO faqs (title, content, user_id, created_at)
        VALUES (?, ?, ?, datetime('now'))
      `, [title.trim(), content.trim(), authResult.user.id], function(err) {
        if (err) reject(err);
        else resolve({ lastInsertRowid: this.lastID });
      });
    });

    return NextResponse.json({
      success: true,
      message: 'FAQ created successfully',
      faqId: (result as any).lastInsertRowid
    });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

