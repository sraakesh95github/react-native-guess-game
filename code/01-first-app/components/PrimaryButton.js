import { View, Text, Pressable, StyleSheet } from 'react-native';

function PrimaryButton({children}) {

    function pressHandler() {
        console.log('Pressed!');
    }

    return (
    <Pressable 
        onPress={pressHandler}>
        <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{children}</Text>
        </View>
    </Pressable>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#72063C',
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
        margin: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
})