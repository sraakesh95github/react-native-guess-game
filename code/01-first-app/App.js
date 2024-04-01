import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid, ImageBackground } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import StartGameScreen from './screens/StartGameScreen';

export default function App() {

  async function checkPermission() {
    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.DETECT_SCREEN_CAPTURE);
    return hasPermission;
  }

  async function requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.DETECT_SCREEN_CAPTURE,
        {
          title: "Screen Capture Detection Permission",
          message: "This app needs access to detect screen capture.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can detect screen capture");
      } else {
        console.log("Screen capture detection permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  async function handlePermission() {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      await requestPermission();
    }
  }

  return (
    <LinearGradient 
      colors={['#ddb52f', '#4e0329']}
      style={styles.rootScreen}>
        <ImageBackground 
          source={require('./assets/background.png')} resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}>
          <StartGameScreen />
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
