import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

export default class TextInputList extends Component {
    render() {
        return (
            <View style={[styles.inputView, this.props.borderBt?null:styles.borderBt]}>
                <Icon name={this.props.iconName} size={12} color={'#999'} />
                <TextInput  style={styles.textInput} {...this.props.params} underlineColorAndroid="transparent" clearButtonMode={'while-editing'} />        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        height: 42,
        alignItems: 'center',
        paddingLeft: 10,
    },
    textInput: {
        padding:0,
        paddingLeft: 10,
        height: 42,
        fontSize: 11,
        color:'#333',
        flex: 1,
    },
    borderBt: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    }
})    