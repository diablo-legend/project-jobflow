import React from 'react';

interface HeroProps {
  onScrollToForm: () => void;
}

export function Hero({ onScrollToForm }: HeroProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-[#F5F5F9] to-white px-3 sm:px-6 lg:px-8 pt-16 pb-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDBoMTAwdjEwMEgxMDBWMFoiIGZpbGw9IiM3RTczRkQxMCIvPjwvc3ZnPg==')] opacity-40"></div>
      </div>
      
      <div className="relative w-full max-w-4xl mx-auto text-center">
        <h1 className="font-unbounded text-[1.75rem] xs:text-[2rem] sm:text-4xl md:text-5xl font-bold mb-4 xs:mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#7E73FD] to-purple-600 leading-[1.2] xs:leading-[1.3] px-2 xs:px-4">
          Присоединяйтесь к&nbsp;нашей команде!
        </h1>
        <p className="text-base xs:text-lg sm:text-xl text-gray-600 mb-6 xs:mb-8 sm:mb-10 max-w-2xl mx-auto px-3 sm:px-4 leading-relaxed">
          Мы ищем талантливых разработчиков, дизайнеров и менеджеров проектов для создания инновационных решений
        </p>
        <button
          onClick={onScrollToForm}
          className="bg-[#7E73FD] text-white px-6 sm:px-8 py-3 xs:py-3.5 sm:py-4 rounded-lg font-semibold text-base sm:text-lg
                   transition-all duration-300 hover:scale-105 hover:shadow-lg
                   active:scale-95 w-[calc(100%-2rem)] xs:w-auto mx-4 xs:mx-0"
        >
          Оставить заявку
        </button>
      </div>
    </div>
  );
}