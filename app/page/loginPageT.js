import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, DeviceEventEmitter, Alert, Image,ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../util/api';
import Theme from '../util/theme';
import Header from '../component/Header';
import Title from '../component/Title';
import ThirdLogin from '../util/ThirdLogin'
import MainPage from '../page/MainPage'
import loginPage from '../page/LoginPage'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }
    render() {

        return (
            <View style={styles.container}>

                <Header navigator={this.props.navigator} headerText={'用户登录'} backView={this.props.source?'login':'null'} />
                <ScrollView style={styles.content}>
                    <View style={styles.loginlogo}>
                        <Image source={require('../../resources/images/logo.png')} style={{ width: 178, height: 50 }} />
                    </View>

                    <View style={styles.LoginT}>
                        <TouchableOpacity onPress={ThirdLogin._wechatlogin.bind(this, this)} activeOpacity={0.7}>
                            <Icon name={'wechat'} size={60} color={'#00d10d'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 60 }} onPress={ThirdLogin._qqlogin.bind(this, this)} activeOpacity={0.7}>
                            <Icon name={'qq'} size={60} color={'#45b7ee'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this.goOtherLogin.bind(this)} style={styles.loginOther} activeOpacity={0.7}>
                        <Text style={styles.loginOtherText}>其他方式登录</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }

    
    goBackSuccee() {
        DeviceEventEmitter.emit('loginState', '登录好了')
        if(this.props.source && this.props.source == 'home'){
            this.props.navigator.pop();
        }
        else{
            this.props.navigator.replace({
                component: MainPage
            })
        }
        
    }
    goOtherLogin(){
        this.props.navigator.push({
            component: loginPage
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    content: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    FormContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    loginlogo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    LoginT: {
        marginTop: 60,
        marginBottom:90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginOther:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginOtherText:{
        color:'#999',
        fontSize:16,
    }
})