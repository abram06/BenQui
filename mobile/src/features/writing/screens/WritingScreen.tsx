import { ActivityIndicator } from "react-native";
import WritingPromptCard from "../components/WritingPromptCard";
import { generateWritingChallenge } from "../services/writingApi";
import type { WritingChallenge, WritingLevel } from "../types";

import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LEVEL_OPTIONS: {
  level: WritingLevel;
  icon: string;
  description: string;
}[] = [
  {
    level: "Básico",
    icon: "🌱",
    description: "Oraciones sencillas y vocabulario cotidiano.",
  },
  {
    level: "Intermedio",
    icon: "🚀",
    description: "Más conectores y variedad de estructuras.",
  },
  {
    level: "Avanzado",
    icon: "🎓",
    description: "Ideas complejas y vocabulario más amplio.",
  },
];

export default function WritingScreen() {
  const [selectedLevel, setSelectedLevel] = useState<WritingLevel | null>(null);

  const [challenge, setChallenge] = useState<WritingChallenge | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerateChallenge() {
    if (!selectedLevel) return;

    setIsLoading(true);
    setError("");
    setChallenge(null);

    try {
      const result = await generateWritingChallenge(selectedLevel);
      setChallenge(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo generar el reto.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>✍️ PRÁCTICA DE ESCRITURA / WRITING</Text>
          <Text style={styles.title}>¿Qué nivel quieres practicar?</Text>
          <Text style={styles.subtitle}>
            Adaptaremos el reto y el vocabulario al nivel que elijas.
          </Text>
        </View>

        <View style={styles.levelList}>
          {LEVEL_OPTIONS.map((option) => {
            const isSelected = selectedLevel === option.level;

            return (
              <Pressable
                key={option.level}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => {
                  setSelectedLevel(option.level);
                  setChallenge(null);
                  setError("");
                }}
                style={[
                  styles.levelCard,
                  isSelected && styles.selectedLevelCard,
                ]}
              >
                <Text style={styles.levelIcon}>{option.icon}</Text>

                <View style={styles.levelInfo}>
                  <Text
                    style={[
                      styles.levelTitle,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {option.level}
                  </Text>
                  <Text style={styles.levelDescription}>
                    {option.description}
                  </Text>
                </View>

                <View
                  style={[
                    styles.selectionCircle,
                    isSelected && styles.selectedCircle,
                  ]}
                >
                  {isSelected && <Text style={styles.check}>✓</Text>}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          accessibilityRole="button"
          disabled={!selectedLevel || isLoading}
          onPress={handleGenerateChallenge}
          style={[
            styles.generateButton,
            (!selectedLevel || isLoading) && styles.disabledButton,
          ]}
        >
          {isLoading ? (
            <View style={styles.loadingContent}>
              <ActivityIndicator color="#FFFFFF" />
              <Text style={styles.generateButtonText}>Creando reto...</Text>
            </View>
          ) : (
            <Text style={styles.generateButtonText}>Generar reto ✨</Text>
          )}
        </Pressable>

        {error !== "" && <Text style={styles.errorText}>{error}</Text>}

        {challenge && <WritingPromptCard challenge={challenge} />}

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipText}>
            Puedes cambiar el nivel cuando quieras para seguir avanzando a tu
            ritmo.
          </Text>
        </View>

        {selectedLevel && (
          <Text style={styles.selectedMessage}>
            Nivel seleccionado: {selectedLevel}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F4FF",
  },
  content: {
    flexGrow: 1,
    padding: 22,
    paddingTop: 30,
    gap: 22,
  },
  heading: {
    gap: 10,
  },
  eyebrow: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    color: "#17172B",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 35,
  },
  subtitle: {
    color: "#68687D",
    fontSize: 16,
    lineHeight: 23,
  },
  levelList: {
    gap: 14,
  },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7E5F4",
  },
  selectedLevelCard: {
    backgroundColor: "#EEEDFF",
    borderColor: "#5545E8",
    borderWidth: 2,
  },
  levelIcon: {
    fontSize: 28,
  },
  levelInfo: {
    flex: 1,
    gap: 5,
  },
  levelTitle: {
    color: "#17172B",
    fontSize: 17,
    fontWeight: "700",
  },
  selectedText: {
    color: "#4338CA",
  },
  levelDescription: {
    color: "#68687D",
    fontSize: 14,
    lineHeight: 20,
  },
  selectionCircle: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C9C6DC",
  },
  selectedCircle: {
    backgroundColor: "#4338CA",
    borderColor: "#4338CA",
  },
  check: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 15,
    borderRadius: 18,
    backgroundColor: "#E8E7FF",
  },
  tipIcon: {
    fontSize: 18,
  },
  tipText: {
    flex: 1,
    color: "#484568",
    fontSize: 13,
    lineHeight: 19,
  },
  selectedMessage: {
    color: "#4338CA",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  generateButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#4338CA",
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  errorText: {
    color: "#B42318",
    fontSize: 14,
    textAlign: "center",
  },
});
