import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, ImageBackground } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors'
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler() {
    setGameIsOver(true);
  }

  if(userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen />
  }

  return (
    <LinearGradient 
      colors={[Colors.accent500, Colors.primary]}
      style={styles.rootScreen}>
        <ImageBackground 
          source={require('./assets/background.png')} resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
          <SafeAreaView style={styles.rootScreen}>
            {screen}
          </SafeAreaView>
        </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15
  }
});
