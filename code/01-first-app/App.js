import { StyleSheet, SafeAreaView, ImageBackground, LayoutAnimation } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';
// import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors'
import GameOverScreen from './screens/GameOverScreen';
import LoadingPage from './screens/LoadingPage';
import TriviaScreen from './screens/TriviaScreen';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  // const [appIsReady, setAppIsReady] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} onStartQuiz={startQuizHandler}/>;

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (quizStarted) {
    screen = <TriviaScreen onAnswerSelected={answerSelectedHandler} />;
  }

  if (!fontsLoaded) {
    return <LoadingPage />; // or your custom loading view
  }

  function answerSelectedHandler(answer) {
    // Handle the answer selection here
    console.log(answer);
    // You may want to setQuizStarted(false) here or navigate to another screen
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function startQuizHandler() {
    setQuizStarted(true);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  if(userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
  }

  if(gameIsOver && userNumber) {
    screen = <GameOverScreen 
                  userNumber={userNumber}
                  roundsNumber={guessRounds}
                  onRestart={startNewGameHandler}/>
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
