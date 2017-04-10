import React, { Component } from 'react';
import { Text, StyleSheet, View,} from 'react-native';

export default class Title extends Component {
    render() {
        return (
            <View style={styles.titleContainer}>
                <View style={styles.line}></View>
                <Text style={styles.titleText}>{this.props.title}</Text>
                <View style={styles.line}></View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    titleContainer: {
        marginLeft: 10,
        marginRight: 10,
        height: 34,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        color: '#888'
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
})