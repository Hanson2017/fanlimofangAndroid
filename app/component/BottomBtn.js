import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../util/theme'

export default class SubmitBtn extends Component {
    render() {
        let status = 1;
        if (this.props.status) {
            status = this.props.status;
        }
        return (
            <TouchableOpacity
                style={[styles.submitBtn,status==2?styles.submitBtnOver:null]}
                activeOpacity={0.7}
                onPress={this.props.onPress}
                disabled={this.props.disabled}
            >
                <Text style={[styles.submitBtnText]}>{this.props.value}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    submitBtn: {
        height: 46,
        backgroundColor: Theme.color,
        alignItems: 'center',
        justifyContent: 'center',

    },
    submitBtnOver: {
        backgroundColor: '#ccc',
    },
    submitBtnText: {
        fontSize: 16,
        color: '#fff',
    },
})    