import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import VeskoKeyboard from './Keyboard';
import Word from './Word';

interface AppState {
  userGuesses: string[];
  currentUserGuess: string
  correctWord: string;
  newGame: boolean;
}

export const SAMPLE_WORDS = ['VESKO', 'BORIS', 'SASHO', 'GOSHO', 'TOSHO', 'ALEKS']

export function getRandomWord() {
    const number = Math.floor(Math.random() * SAMPLE_WORDS.length);
    console.log(number);
    return SAMPLE_WORDS[number];
}

export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    userGuesses: [],
    currentUserGuess: '',
    correctWord: getRandomWord(),
    newGame: false,
  }

  handleSubmit = (word: string) => {
    this.setState({userGuesses: this.state.userGuesses.concat(word)})
    console.log(this.state.userGuesses)
  }

  initialize = () => {
    this.setState({  
      userGuesses: [],
      currentUserGuess: '',
      correctWord: getRandomWord(),
    newGame: false})
  }

  newGame = () => {
    this.setState({newGame: true, userGuesses: [],
      currentUserGuess: '',
      correctWord: getRandomWord()})
  } 

  render(){
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Wordle by Vesko</Text>
      </View>
      <View style={styles.guesses}>
      <Word newGame={this.state.newGame} correctWord={this.state.correctWord} userGuess={this.state.userGuesses[0]}/>
      <Word newGame={this.state.newGame} correctWord={this.state.correctWord} userGuess={this.state.userGuesses[1]}/>
      <Word newGame={this.state.newGame} correctWord={this.state.correctWord} userGuess={this.state.userGuesses[2]}/>
      <Word newGame={this.state.newGame} correctWord={this.state.correctWord} userGuess={this.state.userGuesses[3]}/>
      <Word newGame={this.state.newGame} correctWord={this.state.correctWord} userGuess={this.state.userGuesses[4]}/>
      <Word newGame={this.state.newGame} correctWord={this.state.correctWord} userGuess={this.state.userGuesses[5]}/>
      </View>
      <View>
        <Text>Your Guess: {this.state.currentUserGuess}</Text>
      </View>
      <View>
       { this.state.currentUserGuess === this.state.correctWord ?
       <View> 
       <Text style={{color: 'red'}}>Congrats, You guessed the word</Text>
       <Button title={'new game'} onPress={this.newGame}></Button>
       </View>
       : this.state.userGuesses.length === 6 &&
       <View>
        <Text style={{color: 'red'}}>You ran out of guesses</Text>
       <Button title={'new game'} onPress={this.newGame}></Button>
       </View> 
      }
      </View>
      { this.state.userGuesses.length < 6 &&
      <View>
        <VeskoKeyboard onChange={(userGuess: string) => this.setState({currentUserGuess: userGuess}) } onSubmit={this.handleSubmit}/>
      </View>
      }
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  guesses: {
    margin: 20,
    padding: 20,
  },
  safeArea: {
      flex: 1,
      backgroundColor: '#A6A9BC',
      paddingTop: Platform.OS === 'android' ? 50 : 0
  },
  header: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 48,
  }
});
