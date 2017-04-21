'use strict';
import Api from '../util/api';
import StorageLoginInfo from '../config/storageLogin'
import * as QQAPI from 'react-native-qq';
import * as WechatAPI from 'react-native-wx';

module.exports = {
    _qqlogin(that) {
        QQAPI.login()
            .then((result) => {
                let url = Api.getUserinfo + '?fromtype=qq&connectid=' + result.openid
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            response.json()
                                .then((responseData) => {
                                    if (responseData.result == 1) {
                                        StorageLoginInfo.storageSave(responseData);
                                        that.goBackSuccee()

                                    }
                                    else {
                                        Alert.alert('提示', responseData.resultmsg)
                                    }
                                })
                        }
                        else {
                            console.log('网络请求失败')
                        }
                    })
                    .catch((error) => {
                        console.log('error:', error)
                    })
                console.log('result is', result)
            })
            .catch((error) => { console.log('error is', error) });
    },
    _wechatlogin(that) {

        WechatAPI.login()
            .then((result) => {
                let appid = result.appid;
                // let secret = '3a5ec9b9d9ac60c38cb554e314c8a9d3' 
                let secret = '5b835e079361c2cc8fe39a82e23412d7'
                let code = result.code;
                let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code'
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            response.json()
                                .then((res) => {
                                    let urlF = Api.getUserinfo + '?fromtype=wx&connectid=' + res.openid
                                    fetch(urlF)
                                        .then((response) => {
                                            if (response.ok) {
                                                response.json()
                                                    .then((resData) => {
                                                        if (resData.result == 1) {
                                                            StorageLoginInfo.storageSave(resData);
                                                            that.goBackSuccee()
                                                        }
                                                        else {
                                                            Alert.alert('提示', resData.resultmsg)
                                                        }
                                                    })
                                            }
                                            else {
                                                console.log('网络请求失败')
                                            }
                                        })
                                        .catch((error) => {
                                            console.log('error:', error)
                                        })
                                    console.log(res)
                                })
                        }
                        else {
                            console.log('网络请求失败')
                        }
                    })
                    .catch((error) => {
                        console.log('error:', error)
                    })
            })
            .catch((error) => { console.log('error is', error) });
    }

}