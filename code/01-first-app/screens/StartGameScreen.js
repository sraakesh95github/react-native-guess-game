import { View, TextInput, Button, StyleSheet } from 'react-native'
import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen() {
    return (
    <View style={styles.inputContainer}>
        <TextInput 
            style={styles.numberInput} 
            maxLength={2} 
            keyboardType='number-pad'
            autoCapitalize='none'
            autoCorrect={false}/>
        <PrimaryButton> Reset</PrimaryButton>
        <PrimaryButton>Confirm</PrimaryButton>
    </View>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 100,
        marginHorizontal: 24,
        borderRadius: 8,
        padding: 16,
        backgroundColor: '#72063C',
        boxShadow: 8,
        elevation: 8, //It is an android only property
        shadowColor: 'black',
        shadowOffset: { width: 0,height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
    numberInput: {
        height: 50,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 2,
        color: '#ddb52f',
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});