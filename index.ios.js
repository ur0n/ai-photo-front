/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

const store = configureStore()
export default class AiPhoto extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
        </Provider>
    );
  }
}
AppRegistry.registerComponent('AiPhoto', () => AiPhoto);
