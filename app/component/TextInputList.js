import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import TxtInput from '../component/TextInput'

export default class TextInputList extends Component {
    render() {
        return (
            <View style={[styles.inputView, this.props.borderBt?null:styles.borderBt]}>
                <Icon name={this.props.iconName} size={15} color={'#999'} />
                <TxtInput params={this.props.params} />         
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
    }
})    