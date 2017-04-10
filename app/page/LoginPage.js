import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, DeviceEventEmitter, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../util/api';
import Theme from '../util/theme';
import Header from '../component/Header';
import StorageLoginInfo from '../config/storageLogin'
import HomePage from '../page/HomePage'
import TextInputList from '../component/TextInputList'
import SubmitBtn from '../component/SubmitBtn'
import FormValidation from '../util/FormValidation'
import Title from '../component/Title';

import ThirdLogin from '../util/ThirdLogin'



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            userName: '',
            password: '',
        }
    }
    render() {
        return (
            <View style={styles.container}>

                <Header navigator={this.props.navigator} headerText={'用户登录'} />
                <View style={styles.content}>
                    <View style={styles.FormContainer}>

                        <TextInputList iconName={'email'}
                            params={{ placeholder: '用户名/邮箱', onChangeText: this._onChangeTextUserName.bind(this) }}
                        />
                        <TextInputList iconName={'Password'} borderBt={'null'}
                            params={{ placeholder: '密码', secureTextEntry: true, onChangeText: this._onChangeTextPassword.bind(this) }}
                        />

                    </View>
                    <View style={[Theme.mt20]}>
                        <SubmitBtn value={'立即登录'} onPress={this._formValidation.bind(this)} />
                    </View>
                    <View style={{ marginTop: 20, }}>
                        <Title title={'快捷登录'} />
                        <View style={styles.otherLogin}>
                            <TouchableOpacity onPress={ThirdLogin._wechatlogin.bind(this,this)} activeOpacity={0.7}>
                                <Icon name={'wechat'} size={36} color={'#00d10d'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 40 }} onPress={ThirdLogin._qqlogin.bind(this,this)} activeOpacity={0.7}>
                                <Icon name={'qq'} size={36} color={'#45b7ee'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
   
    _onChangeTextUserName(text) {
        this.setState({
            userName: text
        })
    }
    _onChangeTextPassword(text) {
        this.setState({
            password: text
        })
    }
    _formValidation() {
        let that = this;
        let userName = this.state.userName;
        let password = this.state.password;
        let url = Api.login

        if (FormValidation.emailVaild(userName) == false) {
            return;
        }
        if (FormValidation.empty(password, '密码不能为空') == false) {
            return;
        }

        let opt = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                r_email: userName,
                r_password: password,
            })
        }

        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {
                                StorageLoginInfo.storageSave(responseData);
                                that.goBackSuccee()

                            }
                            else {
                                Alert.alert('提示', responseData.resultmsg)
                            }

                        }))
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => { console.error(error) })
    }
    goBackSuccee() {
        DeviceEventEmitter.emit('loginState', '登录好了')
        this.props.navigator.pop();
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    content: {
        margin: 10,
        flex: 1,
    },
    FormContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    otherLogin: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

})