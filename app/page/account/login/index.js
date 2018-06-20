import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, DeviceEventEmitter, Alert, Image, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../../util/api';
import Theme from '../../../util/theme';
import NavBar from '../../../component/navBar';
import ThirdLogin from '../../../util/ThirdLogin'
import MainPage from '../../../page/MainPage'
import OtherLogin from './other'

export default class Login extends Component {
    render() {
        const { navigator } = this.props;
        return (
            <View style={styles.container}>
                <NavBar title={'登录'} navigator={navigator} />
                <View style={styles.loginContainerWp}>
                    <ScrollView style={styles.loginContainer}>
                        <View style={styles.logoContainer}>
                            <Image source={{ uri: Api.domainM + '/images/loginlogo.png' }} style={styles.logo} />
                            <View style={styles.logoBy}>
                                <Text style={styles.logoByText}>专注网贷返利</Text>
                            </View>
                        </View>
                        <View style={styles.loginBody}>
                            <TouchableOpacity style={styles.wechatBtn} onPress={ThirdLogin._wechatlogin.bind(this, this)} activeOpacity={0.7}>
                                <Icon name={'wechat'} size={60} color={'#00d10d'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ThirdLogin._qqlogin.bind(this, this)} activeOpacity={0.7}>
                                <Icon name={'qq'} size={60} color={'#45b7ee'} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this.goOtherLogin.bind(this)} style={styles.loginOther} activeOpacity={0.7}>
                            <Text style={styles.loginOtherText}>其他方式登录</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.version}>
                        <Text style={styles.versionText}>版本号：3.0.5</Text>
                    </View>
                </View>
            </View>
        )
    }

    goBackSuccee() {
        DeviceEventEmitter.emit('loginState', '登录好了')
        if (this.props.source && this.props.source == 'home') {
            this.props.navigator.pop();
        }
        else {
            this.props.navigator.replace({
                component: MainPage
            })
        }

    }
    goOtherLogin() {
        this.props.navigator.push({
            component: OtherLogin
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    loginContainerWp:{
        flex: 1,
        justifyContent: 'space-between',
        
    },
    loginContainer: {
       
    },
    logoContainer: {
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 75,
        height: 75,
    },
    logoBy: {
        
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        height: 15,
        width: 75,
        borderColor: '#AEAEAE',
        borderWidth: 1,
        borderRadius: 3,
    },
    logoByText: {
        fontSize: 10,
        color: '#AEAEAE',
    },
    loginBody: {
        backgroundColor: '#fff',
        paddingTop: 35,
        paddingBottom: 45,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wechatBtn: {
        marginRight: 60,
    },
    loginOther: {
        backgroundColor: '#fff',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginOtherText: {
        color: '#AEAEAE',
        fontSize: 11,
    },
    version:{
        height:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    versionText:{
        color:'#D7D7D7',
        fontSize: 11,
    }
})