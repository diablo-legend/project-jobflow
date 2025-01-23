export interface FormData {
  name: string;
  telegram: string;
  specialty: string;
  motivation: string;
  experience: string;
  files: File[];
}

export type FormErrors = Partial<Record<keyof FormData, string>>;