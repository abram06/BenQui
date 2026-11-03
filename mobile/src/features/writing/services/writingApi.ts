import { API_BASE_URL } from '@/services/apiConfig';
import type { WritingChallenge } from '../types';
import type { WritingLevel, WritingReview } from '../types';


// Pide al backend un reto para el nivel que eligió el usuario.
export async function generateWritingChallenge(
  level: WritingLevel,
): Promise<WritingChallenge> {
  const response = await fetch(`${API_BASE_URL}/writing/challenge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ level }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ?? `No se pudo generar el reto (${response.status}).`,
    );
  }

  return (await response.json()) as WritingChallenge;
}

// Datos que enviaremos a FastAPI para revisar una redacción.
export type WritingReviewRequest = {
  level: WritingLevel;
  instruction: string;
  text: string;
  minimum_words: number;
};

// Envía la redacción y devuelve la revisión generada por Gemini.
export async function reviewWriting(
  request: WritingReviewRequest,
): Promise<WritingReview> {
  const response = await fetch(`${API_BASE_URL}/writing/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  // FastAPI puede incluir el detalle del error en JSON.
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail ?? `No se pudo revisar el texto (${response.status}).`,
    );
  }

  return (await response.json()) as WritingReview;
}