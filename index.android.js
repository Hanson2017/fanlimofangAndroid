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
import Navigation from '../fanlimofang/app/config/entry'

export default class fanlimofang extends Component {
  render() {
    return (
      <Navigation />
    );
  }
  
 
}

AppRegistry.registerComponent('fanlimofang', () => fanlimofang);
