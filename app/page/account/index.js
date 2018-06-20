import React, { Component } from 'react';
import { Text, StyleSheet, View,DeviceEventEmitter } from 'react-native';

import Login from './login';
import Member from './member';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: false,
        };
    }
    render() {
        const { navigator } = this.props;
        if (signState === null) {
            return <Login navigator={navigator} />;
        }
        else {
            return <Member navigator={navigator} />;
        }
    }
}