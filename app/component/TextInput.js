import React, { Component } from 'react';
import { Text, StyleSheet,TextInput } from 'react-native';

export default class InputList extends Component {
    render() {
        return (
            <TextInput  style={styles.textInput} {...this.props.params} underlineColorAndroid="transparent" clearButtonMode={'while-editing'} />
        )
    }
}

const styles = StyleSheet.create({

    textInput: {
        paddingLeft: 10,
        height: 46,
        fontSize: 14,
        color:'#333',
        flex: 1,
    },
})