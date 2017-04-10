import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput,TouchableOpacity } from 'react-native';
import TxtInput from '../component/TextInput'

export default class InputList extends Component {
    render() {
        let TxtInputView;
        if (this.props.ViewInput) {
            TxtInputView = (
                <TouchableOpacity style={styles.ViewInput} onPress={this.props.onPress} activeOpacity={0.7}>
                    <Text style={{color:'#333'}}>{this.props.value}</Text>
                </TouchableOpacity>
            )
        }
        else{
            TxtInputView =  <TxtInput params={this.props.params} />
        }
        return (
            <View style={[styles.inputView, this.props.borderBt ? null : styles.borderBt]}>
                <Text style={styles.label}>{this.props.label}</Text>
                {TxtInputView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        height: 46,
        alignItems: 'center',
        paddingLeft: 10,
    },
    borderBt: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    label: {
        width: 80,
        color: '#999'
    },
    ViewInput:{
        flex:1,
        paddingLeft:10,
    }
})