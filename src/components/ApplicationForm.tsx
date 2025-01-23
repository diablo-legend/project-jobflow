import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import type { FormData, FormErrors } from '../types';

interface ApplicationFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

export function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Введите ваше имя';
    }
    
    if (!formData.telegram.trim()) {
      errors.telegram = 'Введите ваш Telegram';
    } else if (!formData.telegram.startsWith('@')) {
      errors.telegram = 'Telegram должен начинаться с @';
    }
    
    if (!formData.specialty.trim()) {
      errors.specialty = 'Выберите специальность';
    }
    
    if (!formData.motivation.trim()) {
      errors.motivation = 'Расскажите о вашей мотивации';
    }
    
    if (!formData.experience.trim()) {
      errors.experience = 'Опишите ваш опыт';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data: FormData = {
      name: formData.get('name') as string,
      telegram: formData.get('telegram') as string,
      specialty: formData.get('specialty') as string,
      motivation: formData.get('motivation') as string,
      experience: formData.get('experience') as string,
      files
    };
    
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      await onSubmit(data);
      formRef.current?.reset();
      setFiles([]);
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (files.length + newFiles.length > 3) {
      alert('Можно загрузить максимум 3 файла');
      return;
    }
    
    const validFiles = newFiles.filter(file => {
      const isValidType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });
    
    setFiles([...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (files.length + droppedFiles.length > 3) {
      alert('Можно загрузить максимум 3 файла');
      return;
    }

    const validFiles = droppedFiles.filter(file => {
      const isValidType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    setFiles([...files, ...validFiles]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4 xs:p-6 sm:p-8 bg-white rounded-xl shadow-lg"
    >
      <div className="space-y-6 sm:space-y-8">
        <div>
          <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
            Имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#7E73FD] focus:ring focus:ring-[#7E73FD] focus:ring-opacity-50 text-base p-2.5 sm:p-3 ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Введите ваше имя"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="telegram" className="block text-base font-medium text-gray-700 mb-2">
            Telegram
          </label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#7E73FD] focus:ring focus:ring-[#7E73FD] focus:ring-opacity-50 text-base p-2.5 sm:p-3 ${
              errors.telegram ? 'border-red-500' : ''
            }`}
            placeholder="@username"
          />
          {errors.telegram && (
            <p className="mt-2 text-sm text-red-500">{errors.telegram}</p>
          )}
        </div>

        <div>
          <label htmlFor="specialty" className="block text-base font-medium text-gray-700 mb-2">
            Специальность
          </label>
          <select
            id="specialty"
            name="specialty"
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#7E73FD] focus:ring focus:ring-[#7E73FD] focus:ring-opacity-50 text-base p-2.5 sm:p-3 ${
              errors.specialty ? 'border-red-500' : ''
            }`}
          >
            <option value="">Выберите специальность</option>
            <option value="frontend">Frontend-разработчик</option>
            <option value="backend">Backend-разработчик</option>
            <option value="designer">UI/UX-дизайнер</option>
            <option value="smm">SMM менеджер</option>
          </select>
          {errors.specialty && (
            <p className="mt-2 text-sm text-red-500">{errors.specialty}</p>
          )}
        </div>

        <div>
          <label htmlFor="motivation" className="block text-base font-medium text-gray-700 mb-2">
            Мотивация
          </label>
          <textarea
            id="motivation"
            name="motivation"
            rows={4}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#7E73FD] focus:ring focus:ring-[#7E73FD] focus:ring-opacity-50 text-base p-2.5 sm:p-3 ${
              errors.motivation ? 'border-red-500' : ''
            }`}
            placeholder="Почему вы хотите работать в нашей компании?"
          />
          {errors.motivation && (
            <p className="mt-2 text-sm text-red-500">{errors.motivation}</p>
          )}
        </div>

        <div>
          <label htmlFor="experience" className="block text-base font-medium text-gray-700 mb-2">
            Опыт работы
          </label>
          <textarea
            id="experience"
            name="experience"
            rows={4}
            className={`mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#7E73FD] focus:ring focus:ring-[#7E73FD] focus:ring-opacity-50 text-base p-2.5 sm:p-3 ${
              errors.experience ? 'border-red-500' : ''
            }`}
            placeholder="Расскажите о вашем опыте работы и навыках"
          />
          {errors.experience && (
            <p className="mt-2 text-sm text-red-500">{errors.experience}</p>
          )}
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">
            Прикрепить файлы
          </label>
          <div
            onClick={handleDropZoneClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="mt-2 cursor-pointer flex justify-center px-4 xs:px-6 pt-4 xs:pt-5 pb-5 xs:pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#7E73FD] transition-colors"
          >
            <div className="space-y-2 text-center">
              <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
              <div className="flex flex-col xs:flex-row text-sm text-gray-600 items-center justify-center gap-1">
                <span className="font-medium text-[#7E73FD]">Загрузить файлы</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.png,.jpg,.jpeg"
                />
                <p>или перетащите их сюда</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOCX, PNG, JPG до 10MB
              </p>
            </div>
          </div>
          
          {files.length > 0 && (
            <ul className="mt-4 space-y-2 sm:space-y-3">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-600 truncate pr-4">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#7E73FD] text-white px-6 py-3.5 sm:py-4 rounded-lg font-semibold text-base sm:text-lg
                     transition-all duration-300 hover:scale-105 hover:shadow-lg
                     active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                     mt-6 sm:mt-8`}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </div>
    </form>
  );
}