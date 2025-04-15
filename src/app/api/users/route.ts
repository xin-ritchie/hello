import { NextResponse } from 'next/server';
import {connectToDatabase}from '@/lib/mongodb';
import User from '@/models/User';

// Get all users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select('-password');
    return NextResponse.json({ user: users });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}