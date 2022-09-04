import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

const EMPTY_GUESS = ['', '', '', '', '']

interface WordProps {
    userGuess: string;
    correctWord: string
    newGame: boolean;
}

interface WordState {
    colorAnimations: Animated.Value[];
}


export default class Word extends Component<WordProps, WordState> {
    state: Readonly<WordState> = {
        colorAnimations: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0),new Animated.Value(0)]       
    }

    color1 = this.state.colorAnimations[0].interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['#aaabcd', 'gray', 'green']
    });

    color2 = this.state.colorAnimations[1].interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['#aaabcd', 'gray', 'green']
    });

    color3 = this.state.colorAnimations[2].interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['#aaabcd', 'gray', 'green']
    });

    color4 = this.state.colorAnimations[3].interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['#aaabcd', 'gray', 'green']
    });

    color5 = this.state.colorAnimations[4].interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['#aaabcd', 'gray', 'green']
    });


    BullsAndCows() {
        let bulls = 0;
        let cows = 0;
        for(let i = 0; i < this.props.userGuess.length; i++){
            if(this.props.correctWord[i] === this.props.userGuess[i]){
                bulls++;
                Animated.timing(this.state.colorAnimations[i],
                    {
                      toValue: 2,
                      duration: 2000,
                      useNativeDriver: false,
                    }).start();
            } else if(this.props.correctWord.includes(this.props.userGuess[i])){
                cows++;
                Animated.timing(this.state.colorAnimations[i],
                    {
                      toValue: 1,
                      duration: 2000,
                      useNativeDriver: false,
                    }).start();
            }
        }
        console.log('Bulls: ' + bulls);
        console.log('Cows: ' + cows);
    }

    reinitialize = () => {
        this.state.colorAnimations.forEach((element) => {
            Animated.timing(element,
                {
                  toValue: 0,
                  duration: 1500,
                  useNativeDriver: false,
                }).start();
        });
    }

    componentDidUpdate(prevProps: WordProps) {
        if(this.props.userGuess && prevProps.userGuess !== this.props.userGuess){
        this.BullsAndCows();
        }
        if(this.props.newGame === true){
            this.reinitialize();
        }
    }

  render() {
    let userGuess = this.props.userGuess || EMPTY_GUESS;
    return (
        <View style={styles.row}>
        <Animated.View style={[styles.square, {backgroundColor: this.color1}]}><Text style={styles.letter}>{userGuess[0]}</Text></Animated.View>
        <Animated.View style={[styles.square, {backgroundColor: this.color2}]}><Text style={styles.letter}>{userGuess[1]}</Text></Animated.View>
        <Animated.View style={[styles.square, {backgroundColor: this.color3}]}><Text style={styles.letter}>{userGuess[2]}</Text></Animated.View>
        <Animated.View style={[styles.square, {backgroundColor: this.color4}]}><Text style={styles.letter}>{userGuess[3]}</Text></Animated.View>
        <Animated.View style={[styles.square, {backgroundColor: this.color5}]}><Text style={styles.letter}>{userGuess[4]}</Text></Animated.View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    square: {
      width: 50,
      height: 50,
      backgroundColor: 'silver',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'gray',
      borderWidth: 1,
    }, 
    letter: {
    fontSize: 24,
    },
    row: {
      flexDirection: 'row',
    }
  });
