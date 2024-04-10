// TriviaScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

import Colors from '../constants/colors';

function TriviaScreen({ onAnswerSelected }) {
  return (
    <View style={styles.screen}>

      <Title>TRIVIA</Title>

      <Card style={styles.questionsCard}>
        <Text style={styles.question}>Who is Ross's sister in Friends?</Text>
      </Card>

      <Card style={styles.answersCard}>
        <View style={styles.buttonContainer}>
          <PrimaryButton style={styles.button} onPress={() => onAnswerSelected('A')}>A. Rachel</PrimaryButton>
          <PrimaryButton style={styles.button} onPress={() => onAnswerSelected('B')}>B. Monica</PrimaryButton>
          <PrimaryButton style={styles.button} onPress={() => onAnswerSelected('C')}>C. Carol</PrimaryButton>
          <PrimaryButton style={styles.button} onPress={() => onAnswerSelected('D')}>D. Phoebe</PrimaryButton>
        </View>
        </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 100
  },
  questionsCard: {
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary
  },
  answersCard: {
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    color: Colors.accent500
  },
  buttonContainer: {
    width: '100%'
  }
});

export default TriviaScreen;