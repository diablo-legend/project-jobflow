import React, { useState } from 'react';
import { AdminPanel } from './AdminPanel';

export function Footer() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col items-center space-y-3 sm:space-y-0 sm:flex-row sm:justify-between">
          <p className="text-gray-500 text-sm sm:text-base text-center">
            © {currentYear} Begaarit-Studio. Все права защищены.
          </p>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="text-gray-600 hover:text-[#7E73FD] transition-colors text-sm sm:text-base"
          >
            Добавить участника
          </button>
        </div>
      </div>
      
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </footer>
  );
}