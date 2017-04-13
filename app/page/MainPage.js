import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, BackAndroid, ToastAndroid, DeviceEventEmitter } from 'react-native';
import TabBar from '../component/TabBar'
import StorageLoginInfo from '../config/storageLogin'
export default class MainScene extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <TabBar navigator={this.props.navigator}  />
            </View>
        )
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        let that = this;

        this.subscription = DeviceEventEmitter.addListener('loginState', (data) => {
            StorageLoginInfo.storageLoad(that)          
        })        
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        this.subscription.remove();
    }
    onBackAndroid = () => {
        const nav = this.props.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        else {
            if (this.lastBackPressed && this.lastBackPressed + 4000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    };
}

