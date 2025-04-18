'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { IUser } from '@/models/User'; // 导入 IUser 类型

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]); // 使用 IUser 类型
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getUser('');
        if (response.error) {
          setError(response.error);
        } else if (Array.isArray(response.user)) {
          setUsers(response.user);
        }
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await api.deleteUser(userId);
      if (response.error) {
        setError(response.error);
      } else {
        setUsers(users.filter(user => user._id !== userId)); // _id 已知
      }
    } catch (error) {
      setError('Failed to delete user');
      console.error('Failed to delete user:', error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">用户管理</h1>
      <div className="grid gap-4">
        {users.map(user => (
          <div key={user._id} className="border p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
