import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, DeviceEventEmitter, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import StorageLoginInfo from '../../../config/storageLogin'
import Api from '../../../util/api';
import Theme from '../../../util/theme';
import FormValidation from '../../../util/FormValidation'
import ThirdLogin from '../../../util/ThirdLogin'

import NavBar from '../../../component/navBar';
import SubmitBtn from '../../../component/submit';
import TextInputList from '../inputList/index';
import Account from '../../../page/account';
import MainPage from '../../../page/MainPage';

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

                <NavBar title={'用户登录'} back={'用户登录'} navigator={this.props.navigator} />
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
        this.props.navigator.replace({
            component: MainPage
        })
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