'use strict';
import { Alert } from 'react-native';

// 不为空验证
function empty(val, prompt) {
    if (val == '') {
        Alert.alert('提示', prompt)
        return false;
    }
}

function lengthValid(val, len, prompt) {
    if (val.length < len) {
        Alert.alert('提示', prompt)
        return false;
    }
}
function confirmPassword(newVal, confirmPassword, prompt) {
    if (newVal !== confirmPassword) {
        Alert.alert('提示', prompt)
        return false;
    }
}



// 手机格式验证
function phoneValid(val, text) {
    let reg = /^1[2|3|4|5|6|7|8|9]\d{9}$/;  //手机正则
    if (text) {
        if (val == '') {
            Alert.alert('提示', text + '手机号不能为空')
            return false;
        }
        else if (val.length !== 11) {
            Alert.alert('提示', text + '手机号位数为11')
            return false;
        }
        else if (!reg.test(val)) {
            Alert.alert('提示', text + '手机号格式不正确')
            return false;
        }
    }
    else {
        if (val == '') {
            Alert.alert('提示', '手机号不能为空')
            return false;
        }
        else if (val.length !== 11) {
            Alert.alert('提示', '手机号位数为11')
            return false;
        }
        else if (!reg.test(val)) {
            Alert.alert('提示', '手机号格式不正确')
            return false;
        }
    }

}

function emailVaild(val) {
    let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (val == '') {
        Alert.alert('提示', '邮箱不能为空')
        return false;
    }
    else if (!reg.test(val)) {
        Alert.alert('提示', '邮箱格式不正确')
        return false;
    }
}

module.exports = {
    empty: empty,
    phoneValid: phoneValid,
    emailVaild: emailVaild,
    lengthValid: lengthValid,
    confirmPassword: confirmPassword
}

