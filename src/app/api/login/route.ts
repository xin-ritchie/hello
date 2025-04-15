import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 连接数据库
    await connectDB();

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 401 }
      );
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: '登录成功',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('登录失败:', error);
    return NextResponse.json(
      { error: '登录失败，请稍后重试' },
      { status: 500 }
    );
  }
}