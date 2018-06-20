import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';

export default class Loading extends Component{
    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    size={'large'}
                 />
            </View> 
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f2f2f2',
        
        alignItems: 'center',
        justifyContent: 'center',
    }
})