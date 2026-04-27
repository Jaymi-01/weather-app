import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WarningCircle, ArrowsClockwise } from 'phosphor-react-native';
import { Colors } from '../constants/colors';

interface Props {
  message: string;
  onRetry: () => void;
}

export const ErrorDisplay = ({ message, onRetry }: Props) => {
  return (
    <View style={styles.container}>
      <WarningCircle size={64} color="#FF6B6B" weight="fill" />
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <ArrowsClockwise size={20} color={Colors.text.main} />
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    color: Colors.text.main,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontWeight: '500',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    gap: 10,
  },
  retryText: {
    color: Colors.text.main,
    fontSize: 16,
    fontWeight: '600',
  },
});
