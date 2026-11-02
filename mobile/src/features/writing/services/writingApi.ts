import { API_BASE_URL } from '@/services/apiConfig';
import type { WritingChallenge, WritingLevel } from '../types';

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