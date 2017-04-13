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
import codePush from 'react-native-code-push'
import Navigation from '../fanlimofang/app/config/entry'

export default class fanlimofang extends Component {
  render() {
    return (
      <Navigation />
    );
  }
  componentDidMount(){
    codePush.sync()
  }
 
}

AppRegistry.registerComponent('fanlimofang', () => fanlimofang);
