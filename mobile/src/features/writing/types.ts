export type WritingLevel = 'Básico' | 'Intermedio' | 'Avanzado';

// Una palabra sugerida por la IA y su significado.
export type WritingVocabularyItem = {
  word: string;
  meaning: string;
};

// Información de un reto de escritura generado por la IA.
export type WritingChallenge = {
  topic: string;
  title: string;
  instruction: string;
  level: string;
  minimumWords: number;
  connectors: string[];
  vocabulary: WritingVocabularyItem[];
};

// Una corrección de gramática o vocabulario.
export type WritingCorrection = {
  original: string;
  corrected: string;
  explanation: string;
};

// Resultado que devuelve POST /writing/review.
export type WritingReview = {
  score: number;
  estimated_level: string;
  overall_feedback: string;
  corrected_text: string;
  corrections: WritingCorrection[];
  strengths: string[];
  next_steps: string[];
  model_used: string;
  word_count: number;
};