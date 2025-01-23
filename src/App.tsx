import React, { useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ApplicationForm } from './components/ApplicationForm';
import { Footer } from './components/Footer';
import { sendToTelegram } from './utils/telegram';
import type { FormData } from './types';

function App() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (data: FormData) => {
    const message = `
<b>Новая заявка на работу:</b>

<b>Имя:</b> ${data.name}
<b>Telegram:</b> ${data.telegram}
<b>Специальность:</b> ${data.specialty}

<b>Мотивация:</b>
${data.motivation}

<b>Опыт работы:</b>
${data.experience}

<b>Прикрепленные файлы:</b> ${data.files.length} файл(ов)
${data.files.map(file => `- ${file.name}`).join('\n')}
`;

    await sendToTelegram(message, data.files);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onScrollToForm={scrollToForm} />
      <Hero onScrollToForm={scrollToForm} />
      
      <main className="py-16 xs:py-20 sm:py-24 px-4 sm:px-6 lg:px-8" ref={formRef}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-unbounded font-bold text-center mb-6 xs:mb-8 sm:mb-16">
            Заполните заявку
          </h2>
          <ApplicationForm onSubmit={handleSubmit} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;