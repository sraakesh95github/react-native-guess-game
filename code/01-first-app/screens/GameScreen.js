import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import Colors from '../constants/colors';

import GuessLogItem from '../components/game/GuessLogItem';

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {

    const initialGuess = generateRandomBetween(
            1, 
            100, 
            userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if(currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

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
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;

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

        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower</InstructionText>

            <View style={styles.buttonsContainer}>
                <PrimaryButton 
                    onPress={nextGuestHandler.bind(this, 'lower')}
                    style={styles.buttonContainer}>
                        <Ionicons name="remove-circle" size={24} color={Colors.accent500}></Ionicons>
                        </PrimaryButton>
                <PrimaryButton 
                    onPress={nextGuestHandler.bind(this, 'higher')}
                    style={styles.buttonContainer}>
                        <Ionicons name="add-circle" size={24} color={Colors.accent500}></Ionicons>
                    </PrimaryButton>
            </View>
        </Card>

        <View style={styles.listContainer}>
            {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
            <FlatList 
                data={guessRounds}
                renderItem={(itemData) => (<GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item}>{itemData.item}</GuessLogItem>)}
                keyExtractor={(item) => item}
            />
        </View>

    </View>

    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
});