import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;