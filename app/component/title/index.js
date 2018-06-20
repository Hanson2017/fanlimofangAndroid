import React, { Component } from 'react';
import { Text, StyleSheet, View, } from 'react-native';

export default class Title extends Component {
    render() {
        const {iconBgC}=this.props;
        return (
            <View style={styles.titleContainer}>
                <View style={[styles.icon,iconBgC?{backgroundColor: iconBgC}:null]}></View>
                <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    titleText: {
        paddingLeft:8,
        fontSize: 12,
        color: '#515151',
    },
    icon: {
        width: 4,
        height: 10,
        backgroundColor: '#e62344',
    },
})