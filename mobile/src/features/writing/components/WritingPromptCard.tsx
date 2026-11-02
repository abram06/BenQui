import { StyleSheet, Text, View } from 'react-native';
import type { WritingChallenge } from '../types';

type WritingPromptCardProps = {
  challenge: WritingChallenge;
};

export default function WritingPromptCard({
  challenge,
}: WritingPromptCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.badge}>✨ RETO DE ESCRITURA</Text>

      <Text style={styles.level}>
        Nivel {challenge.level} · mínimo {challenge.minimumWords} palabras
      </Text>

      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.instruction}</Text>

      <Text style={styles.sectionTitle}>CONECTORES SUGERIDOS</Text>
      <Text style={styles.suggestions}>
        {challenge.connectors.join(' · ')}
      </Text>

      <Text style={styles.sectionTitle}>VOCABULARIO SUGERIDO</Text>
      {challenge.vocabulary.map((item) => (
        <Text key={item.word} style={styles.vocabulary}>
          {item.word} — {item.meaning}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E5F4',
  },
  badge: {
    color: '#4338CA',
    fontSize: 12,
    fontWeight: '700',
  },
  level: {
    color: '#68687D',
    fontSize: 13,
  },
  title: {
    color: '#17172B',
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    color: '#68687D',
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    marginTop: 6,
    color: '#68687D',
    fontSize: 11,
    fontWeight: '700',
  },
  suggestions: {
    color: '#4338CA',
    fontSize: 14,
    fontWeight: '600',
  },
  vocabulary: {
    color: '#17172B',
    fontSize: 14,
  },
});