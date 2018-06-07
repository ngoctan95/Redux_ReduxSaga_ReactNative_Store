/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  addNavigationHelpers
 } from 'react-navigation';
 import AppNavigator from './src/navigations/index';
 import {Provider} from 'react-redux';
 import Store from './src/stores';

 
export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
      <AppNavigator />
      </Provider>
    )
  }
}
