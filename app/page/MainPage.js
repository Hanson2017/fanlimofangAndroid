import React, { Component } from 'react';
import {View,StyleSheet,Text} from 'react-native';
import TabBar from '../component/TabBar'

export default class MainScene extends Component{
    render(){
        
        return (
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <TabBar navigator={this.props.navigator}/>
            </View>
        )
    }
}

