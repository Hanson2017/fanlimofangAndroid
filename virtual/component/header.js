import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

export default class Header extends Component {
    render() {
        let headerOpt = this.props.headerOpt;
        return (
            <View style={[styles.headerContainer,Platform.OS != 'ios' ? {marginTop:0}:null]}>
                {
                    headerOpt.back == 'null' ?
                        <View style={{ width: 50 }}></View>
                        :
                        <TouchableOpacity activeOpacity={0.5} style={styles.headerback}>
                            <Icon name='back2' size={18} color={'#fff'} />
                        </TouchableOpacity>
                }
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{headerOpt.title}</Text>
                </View>
                <View style={{ width: 50 }}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 23,
        height: 46,
        backgroundColor: '#0055AA',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
    },
    headerback: {
        width: 50,
        paddingLeft: 8,
    },
    headerSearch: {
        width: 50,
        alignItems: 'center',
    }
})