'use client';

import { useState, useEffect } from 'react';

interface ButtonClick {
  buttonId: string;
  clickCount: number;
  lastClickedAt: string;
}

export default function AllButtonPage() {
  const [buttonClicks, setButtonClicks] = useState<ButtonClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const buttons = [
    { id: 'button1', label: '按钮 1' },
    { id: 'button2', label: '按钮 2' },
    { id: 'button3', label: '按钮 3' },
  ];

  useEffect(() => {
    fetchButtonClicks();
  }, []);

  const fetchButtonClicks = async () => {
    try {
      const response = await fetch('/api/buttonClicks');
      const data = await response.json();
      if (data.buttonClicks) {
        setButtonClicks(data.buttonClicks);
      }
    } catch (error) {
      setError('获取按钮点击数据失败');
      console.error('Failed to fetch button clicks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (buttonId: string) => {
    try {
      const response = await fetch('/api/buttonClicks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ buttonId }),
      });
      const data = await response.json();
      if (data.buttonClick) {
        setButtonClicks(prevClicks => {
          const updatedClicks = [...prevClicks];
          const index = updatedClicks.findIndex(click => click.buttonId === buttonId);
          if (index !== -1) {
            updatedClicks[index] = data.buttonClick;
          } else {
            updatedClicks.push(data.buttonClick);
          }
          return updatedClicks;
        });
      }
    } catch (error) {
      setError('更新按钮点击次数失败');
      console.error('Failed to update button click:', error);
    }
  };

  const getButtonClickCount = (buttonId: string) => {
    const buttonClick = buttonClicks.find(click => click.buttonId === buttonId);
    return buttonClick?.clickCount || 0;
  };

  if (loading) return <div className="p-4">加载中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">按钮点击计数</h1>
      <div className="grid gap-4">
        {buttons.map(button => (
          <div key={button.id} className="border p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{button.label}</h2>
                <p className="text-gray-600">点击次数: {getButtonClickCount(button.id)}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleButtonClick(button.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  点击
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}