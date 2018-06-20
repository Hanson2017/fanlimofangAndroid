import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default class SubmitBtn extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.submitBtn} 
                activeOpacity={0.7}
                onPress={this.props.onPress}
            >
                <Text style={styles.submitBtnText}>{this.props.value}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    submitBtn: {
        height: 40,
        backgroundColor: '#f95252',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        backgroundColor: '#ccc',
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 12,
    },
})    