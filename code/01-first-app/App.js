import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';

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
    <StartGameScreen />
  );
}

const styles = StyleSheet.create({
  
});
