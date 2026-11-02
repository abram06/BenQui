import { StyleSheet, Text, TextInput, View } from 'react-native';

type WritingEditorProps = {
  value: string;
  minimumWords: number;
  onChangeText: (text: string) => void;
};

export default function WritingEditor({
  value,
  minimumWords,
  onChangeText,
}: WritingEditorProps) {
  // Cuenta las palabras separadas por espacios e ignora espacios vacíos.
  const wordCount = value.trim()
    ? value.trim().split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu texto en inglés</Text>
        <Text style={styles.counter}>
          {wordCount} / {minimumWords} palabras
        </Text>
      </View>

      <TextInput
        accessibilityLabel="Escribe tu texto en inglés"
        multiline
        textAlignVertical="top"
        placeholder="Empieza a escribir aquí..."
        placeholderTextColor="#8A899C"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />

      <Text style={styles.hint}>
        Escribe al menos {minimumWords} palabras para completar el reto.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: '#17172B',
    fontSize: 16,
    fontWeight: '700',
  },
  counter: {
    color: '#4338CA',
    fontSize: 12,
    fontWeight: '600',
  },
  input: {
    minHeight: 180,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7E5F4',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    color: '#17172B',
    fontSize: 16,
    lineHeight: 24,
  },
  hint: {
    color: '#68687D',
    fontSize: 13,
  },
});