import mongoose, { Connection, Mongoose } from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('请在.env.local文件中设置MONGODB_URI环境变量');
}

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Mongoose> | null;
}

let cached = (global as { mongoose?: MongooseCache }).mongoose;

if (!cached) {
  cached = (global as { mongoose?: MongooseCache }).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export const connectToDatabase = connectDB;