import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

export default class InputList extends Component {
    render() {
        const { ViewInput, label, value, params, onPress } = this.props;
        return (
            <View style={[styles.inputView]}>
                <Text style={styles.label}>{label}</Text>
                {
                    ViewInput ?
                        <TouchableOpacity style={styles.ViewInput} onPress={onPress} activeOpacity={0.7}>
                            <Text style={styles.text}>{value}</Text>
                        </TouchableOpacity>
                        :
                        <TextInput style={styles.textInput} {...params} underlineColorAndroid="transparent" clearButtonMode={'while-editing'} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputView: {
        marginBottom:10,
        flexDirection: 'row',
        height: 22,
        alignItems: 'center',
    },
    label: {
        width: 70,
        fontSize: 11,
        color: '#6B6B6B'
    },    
    text: {
        fontSize: 11,   
        color: '#6B6B6B',
    },
    textInput: {
        padding:0,
        paddingLeft: 8,
        width:180,
        height: 22,
        fontSize: 11,
        color: '#6B6B6B',
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:4,
    },
    ViewInput: {
        paddingLeft: 8,
        width:180,
        height: 22,
        borderWidth:1,
        borderColor:'#ccc',
        justifyContent:'center',
        borderRadius:4,
    }
})