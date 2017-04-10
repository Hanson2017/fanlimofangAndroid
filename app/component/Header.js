import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

export default class Header extends Component {
    render() {
        let rightView;
        let backView;
        if (this.props.rightText) {
            rightView = (
                <TouchableOpacity activeOpacity={0.5} style={styles.headerRight} onPress={this.props._onPressRight}>
                    <Text style={styles.headerRightText}>{this.props.rightText}</Text>
                </TouchableOpacity>
            )
        }
        else {
            rightView = (
                <View style={{ width: 50 }}></View>
            )
        }
        if (this.props.backView=='null') {
            backView=(
                 <View style={{ width: 50 }}></View>
            )
        }
        else {
            backView = (
                <TouchableOpacity
                    style={styles.backBtn}
                    activeOpacity={0.5}
                    onPress={this.goBack.bind(this)}
                >
                    <Icon name='back' size={26} color={'#a9a9a9'} />
                </TouchableOpacity>
            )
        }
        return (
            <View style={[styles.headerContainer,Platform.OS=='android'?{marginTop:0}:null]}>
                {backView}
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{this.props.headerText}</Text>
                </View>
                {rightView}
            </View>
        )
    }
    goBack() {
        this.props.navigator.pop();
    }
}


const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 23,
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backBtn: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#333',
        fontSize: 16,
    },
    headerRight: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRightText: {
        color: 'green',
        fontSize: 15,
    }

})