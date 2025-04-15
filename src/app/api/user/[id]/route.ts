import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

// 获取用户信息
export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;

  try {
    await connectToDatabase();

    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return NextResponse.json({ error: '获取用户信息失败' }, { status: 500 });
  }
}

// 更新用户信息
export async function PUT(request: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const { name, email } = await request.json();
    await connectToDatabase();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    // 检查邮箱是否被其他用户使用
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: '该邮箱已被使用' }, { status: 400 });
      }
    }

    // 更新用户信息
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    return NextResponse.json({
      message: '更新成功',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    return NextResponse.json({ error: '更新用户信息失败' }, { status: 500 });
  }
}

// 删除用户
export async function DELETE(request: NextRequest, context: any) {
  const { id } = context.params;

  try {
    await connectToDatabase();

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除用户失败:', error);
    return NextResponse.json({ error: '删除用户失败' }, { status: 500 });
  }
}
