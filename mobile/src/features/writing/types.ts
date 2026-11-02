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