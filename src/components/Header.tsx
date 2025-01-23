import React, { useState } from 'react';
import { Briefcase, Menu, X } from 'lucide-react';
import { AdminPanel } from './AdminPanel';

interface HeaderProps {
  onScrollToForm: () => void;
}

export function Header({ onScrollToForm }: HeaderProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#7E73FD]" />
            <span className="font-unbounded text-base xs:text-lg sm:text-xl font-bold">BG JobFlow</span>
          </div>

          <div className="hidden xs:flex items-center">
            <button
              onClick={onScrollToForm}
              className="bg-[#7E73FD] text-white px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold
                       transition-all duration-300 hover:scale-105 hover:shadow-lg
                       active:scale-95 text-sm sm:text-base whitespace-nowrap"
            >
              Оставить заявку
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xs:hidden p-2 text-gray-600 hover:text-[#7E73FD] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div 
        className={`xs:hidden bg-white border-b border-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3">
          <button
            onClick={() => {
              onScrollToForm();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full bg-[#7E73FD] text-white px-3 py-2 rounded-lg font-semibold text-center"
          >
            Оставить заявку
          </button>
        </div>
      </div>

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </header>
  );
}