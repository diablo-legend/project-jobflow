import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_PASSWORD = '41bg180f';

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [step, setStep] = useState<'password' | 'form'>('password');
  const [password, setPassword] = useState('');
  const [chatId, setChatId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setStep('form');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleChatIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatId.trim()) {
      setError('Введите Chat ID');
      return;
    }

    try {
      localStorage.setItem('telegram_chat_id', chatId);
      setSuccess('Chat ID успешно сохранен');
      setTimeout(() => {
        onClose();
        setStep('password');
        setPassword('');
        setChatId('');
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError('Ошибка при сохранении Chat ID');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 pr-4">
            {step === 'password' ? 'Вход в панель управления' : 'Добавление участника'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'password' ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E73FD] focus:border-transparent"
                placeholder="Введите пароль"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#7E73FD] text-white px-4 py-3 rounded-lg font-semibold
                       transition-all duration-300 hover:bg-[#6A62D7]"
            >
              Войти
            </button>
          </form>
        ) : (
          <form onSubmit={handleChatIdSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="chatId" className="block text-sm font-medium text-gray-700">
                Chat ID
              </label>
              <input
                type="text"
                id="chatId"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7E73FD] focus:border-transparent"
                placeholder="Введите Chat ID"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
              type="submit"
              className="w-full bg-[#7E73FD] text-white px-4 py-3 rounded-lg font-semibold
                       transition-all duration-300 hover:bg-[#6A62D7]"
            >
              Сохранить
            </button>
          </form>
        )}
      </div>
    </div>
  );
}