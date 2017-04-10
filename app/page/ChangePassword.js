import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import Theme from '../util/theme';
import Api from '../util/api';
import Icon from 'react-native-vector-icons/Icomoon';
import Header from '../component/Header';
import TextInputList from '../component/TextInputList'
import SubmitBtn from '../component/SubmitBtn'
import FormValidation from '../util/FormValidation'

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }
    render() {

        return (
            <View style={styles.container}>

                <Header navigator={this.props.navigator} headerText={'修改密码'} />
                <View style={styles.content}>

                    <View style={styles.FormContainer}>
                        <TextInputList iconName={'Password'}
                            params={{placeholder:'原始密码',secureTextEntry:true,onChangeText:this.onChangeTextOld.bind(this)}}
                        />
                        <TextInputList iconName={'chagePassword'}
                             params={{placeholder:'新密码',secureTextEntry:true,onChangeText:this.onChangeTextNew.bind(this)}}                           
                        />
                        <TextInputList iconName={'chagePassword'} borderBt={'null'}
                            params={{placeholder:'确认新密码',secureTextEntry:true,onChangeText:this.onChangeTextConfirm.bind(this)}}
                        />
                    </View>
                    <View style={[Theme.mt20]}>
                        <SubmitBtn value={'提交修改'} onPress={this.onSubmit.bind(this)} />
                    </View>

                </View>
            </View>
        )
    }
    onChangeTextOld(text) {
        this.setState({
            oldPassword: text
        })
    }
    onChangeTextNew(text) {
        this.setState({
            newPassword: text
        })
    }
    onChangeTextConfirm(text) {
        this.setState({
            confirmPassword: text
        })
    }
    onSubmit() {
        let that=this;
        let memberId = signState.r_id;
        let oldPwd = this.state.oldPassword;
        let newPwd = this.state.newPassword;
        let newconfirmPwd = this.state.confirmPassword;
        let url = Api.memberModPass;

        if (FormValidation.empty(oldPwd, '原始密码不能为空') == false) {
            return;
        }

        if (FormValidation.empty(newPwd, '新密码不能为空') == false) {
            return;
        }

        if (FormValidation.lengthValid(newPwd, 6, '新密码位数至少6位') == false) {
            return;
        }

        if (FormValidation.empty(newconfirmPwd, '确认新密码不能为空') == false) {
            return;
        }

        if (FormValidation.confirmPassword(newPwd, newconfirmPwd, '密码输入不一致') == false) {
            return;
        }

        let formData = {
            memberid: memberId,
            oldPwd: oldPwd,
            newPwd: newPwd,
            newconfirmPwd: newconfirmPwd
        }
        let opt = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {
                                
                                Alert.alert(null, '密码修改成功',
                                    [
                                        { text: 'OK', onPress: () => {that.goback()} },
                                    ])
                            }
                            else {
                                Alert.alert('提示',responseData.resultmsg)
                            }
                        }))
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => { console.error(error) })

    }
    goback(){
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

})    