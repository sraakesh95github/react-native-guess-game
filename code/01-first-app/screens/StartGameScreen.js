import { View, TextInput, Text, StyleSheet, Alert } from 'react-native'
import { useState } from 'react';
import Colors from '../constants/colors';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({onPickNumber, onStartQuiz}) {

    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(enteredNumber) {
        setEnteredNumber(enteredNumber);
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }

        onPickNumber(chosenNumber);
    }

    function startQuizHandler() {
        onStartQuiz();
        console.log("Start quiz button pressed...");
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    return (
    <View style={styles.rootContainer}>
    
    <Title>Guess My Number</Title>

    <Card>
        <InstructionText>Enter Number</InstructionText>
        <TextInput 
            style={styles.numberInput} 
            maxLength={2} 
            keyboardType='number-pad'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={numberInputHandler}
            value={enteredNumber}/>

        <View style={styles.buttonsContainer}>  
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}> Reset</PrimaryButton>
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}> Confirm </PrimaryButton>
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={startQuizHandler}>Start Quiz</PrimaryButton>
            </View>
        </View>

    </Card>
    </View>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100
    },  
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
});