import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ButtonClick from '@/models/ButtonClick';

export async function GET() {
  try {
    await connectToDatabase();
    const buttonClicks = await ButtonClick.find();
    return NextResponse.json({ buttonClicks });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch button clicks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { buttonId } = await request.json();
    await connectToDatabase();
    
    const buttonClick = await ButtonClick.findOneAndUpdate(
      { buttonId },
      { 
        $inc: { clickCount: 1 },
        $set: { lastClickedAt: new Date() }
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ buttonClick });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update button click' }, { status: 500 });
  }
}