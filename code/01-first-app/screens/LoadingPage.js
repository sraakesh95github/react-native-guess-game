import { StyleSheet, View, Image } from "react-native";

function LoadingPage() {
    return (
        <View style={styles.loadingContainer}>
            <Image  source={require('../assets/splash.png')}></Image>
        </View>
    );
}

export default LoadingPage;

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1
    }
});