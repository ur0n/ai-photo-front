import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
} from 'react-native';

import { colors } from '../config';

const styles = StyleSheet.create({
  formTitleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  titleText: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  textBox: {
    marginRight: 15,
    marginTop: 5,
  },
  text: {
  },
})

export class TitleForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      textBorder: new Animated.Value(1),
      textBorderColor: new Animated.Value(0),
    }
  }

  _onTitleChange(title){
    this.setState({title});
    this.props.titleChangeHandler(title);
  }

  _onTextFieldForcus(){
    Animated.sequence([
      Animated.timing(
        this.state.textBorderColor,
        {
          toValue: 100,
          duration: 100
        }
      ),
      Animated.timing(
        this.state.textBorder,
        {
          toValue: 1.5,
          duration: 100,
        }
      )
    ]).start();
  }

  _onBlur(){
    Animated.sequence([
      Animated.timing(
        this.state.textBorderColor,
        {
          toValue: 0,
          duration: 100
        }
      ),
      Animated.timing(
        this.state.textBorder,
        {
          toValue: 1,
          duration: 100,
        }
      )
    ]).start();
  }

  render(){
    const interpolatedColor = this.state.textBorderColor.interpolate({
      inputRange: [0, 100],
      outputRange: [colors.black, colors.blue]
    });

    return(
      <View style={styles.formTitleContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            タイトル
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Animated.View style={[
            styles.textBox,
            {
              borderBottomWidth: this.state.textBorder,
              borderBottomColor: interpolatedColor,
            }
          ]}>
            <TextInput
              style={styles.text}
              placeholderTextColor={colors.lightGray}
              placeholder='タイトル'
              onChangeText={title => this._onTitleChange(title)}
              onFocus={() => this._onTextFieldForcus()}
              onBlur={() => this._onBlur()}
              value={this.state.title}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}
