import React, { Component } from 'react';
import { Keyboard, Text, TextInput, StyleSheet, View, TouchableHighlight, Button } from 'react-native';

interface KeyboardProps {
    onSubmit: (word:string) => void;
    onChange: (word:string) => void;
}

class VeskoKeyboard extends Component<KeyboardProps, {}> {
  state = {
    keyboardStatus: undefined,
    word: '',
  };
    keyboardDidShowSubscription: any;
    keyboardDidHideSubscription: any;

  componentDidMount() {
    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({ keyboardStatus: 'Keyboard Shown' });
      },
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({ keyboardStatus: 'Keyboard Hidden' });
      },
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
  }

  onSubmitEdit = () => {
    console.log('handle submit');
    Keyboard.dismiss;
    this.state.word.length === 5 && this.props.onSubmit(this.state.word);
    this.setState({word: ''});
  }

  render() {
    return (
      <View style={style.container}>
        <TextInput
          style={style.input}
          placeholder='Your word…'
          value={this.state.word}
          onSubmitEditing={this.onSubmitEdit}
          onChangeText={newText => {
            this.props.onChange(newText);
            this.setState({word: newText});
          }}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: 'tomato',
    width: 160,
  },
  status: {
    padding: 10,
    textAlign: "center"
  }
});

export default VeskoKeyboard;