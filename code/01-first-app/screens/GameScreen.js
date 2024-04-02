import { View, Text, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {

    const initialGuess = generateRandomBetween(
            1, 
            100, 
            userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
        if(currentGuess === userNumber) {
            onGameOver();
        }
    }, [currentGuess, userNumber, onGameOver]);

    //Actual game logic
    function nextGuestHandler(direction) {
        //'lower', 'greater'
        if ((direction == 'lower' && currentGuess < userNumber) || (direction == 'higher' && currentGuess > userNumber)) {
            Alert.alert("Don't lie", "You know this choice is wrong...", [{
                text: 'Sorry!',
                style: 'cancel'
            }]);
            return;
        }
        else if (direction == 'lower') {
            maxBoundary = currentGuess;
        }
        else {
            minBoundary = currentGuess + 1;
        }
        console.log("min: " + minBoundary + " : max: " + maxBoundary);
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);

        setCurrentGuess(newRndNumber);
    }

    function generateRandomBetween(min, max, exclude) {
        const rndNum = Math.floor(Math.random() * (max-min)) + min;

        if(rndNum === exclude) {
            return generateRandomBetween(min,max,exclude);
        }
        else {
            return rndNum;
        }
    }

    return (
    
    <View style={styles.screen}>

        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>

        <View>
            <Text>Higher or Lower</Text>

            <View>
                <PrimaryButton onPress={nextGuestHandler.bind(this, 'lower')}>-</PrimaryButton>
                <PrimaryButton onPress={nextGuestHandler.bind(this, 'higher')}>+</PrimaryButton>
            </View>
        </View>

        {/* <View>
            LOG ROUNDS
        </View> */}

    </View>

    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    }
});