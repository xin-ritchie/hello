// models/User.ts
import mongoose, { Document } from 'mongoose';

// 定义 IUser 接口，继承自 mongoose.Document
export interface IUser extends Document {
  _id: string;   // 确保 _id 是字符串类型
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// 定义 Mongoose schema
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, '请输入用户名'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, '请输入邮箱'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, '请输入密码'],
    minlength: [6, '密码至少6个字符'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 导出 Mongoose 模型
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
