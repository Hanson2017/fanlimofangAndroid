'use strict';
import Api from '../util/api';
import StorageLoginInfo from '../config/storageLogin'
import * as QQAPI from 'react-native-qq';
import * as WechatAPI from 'react-native-wx';

function getCallback(Func) {
    return Func
}
function callback(data) {
    return data;
}

module.exports = {
    _qqlogin(that) {
        QQAPI.login()
            .then((result) => {
                let access_token = result.access_token;
                let oauth_consumer_key = result.oauth_consumer_key;
                let openid = result.openid;
                let url = 'https://graph.qq.com/oauth2.0/me?access_token=' + access_token + '&unionid=1';
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            response.text()
                                .then((responseData) => {
                                    let callbackData = getCallback(eval(responseData));
                                    let url22 = 'https://graph.qq.com/user/get_user_info?access_token=' + access_token + '&oauth_consumer_key=' + oauth_consumer_key + '&openid=' + openid;
                                    fetch(url22)
                                        .then((ress) => {
                                            if (ress.ok) {
                                                ress.json()
                                                    .then((ressData) => {
                                                        if (ressData.ret == 0) {
                                                            let figureurl_qq;
                                                            if (ressData.figureurl_qq_2 != '' && ressData.figureurl_qq_2.length > 0) {
                                                                figureurl_qq = ressData.figureurl_qq_2;
                                                            }
                                                            else {
                                                                figureurl_qq = ressData.figureurl_qq_1;
                                                            }    
                                                            let urlN = Api.getUserinfo + '?fromtype=qq&connectid=' + result.openid + '&username=' + ressData.nickname + '&avatar=' + figureurl_qq+'&unionid=' + callbackData.unionid;    
                                                            fetch(urlN)
                                                                .then((res) => {
                                                                    if (res.ok) {
                                                                        res.json()
                                                                            .then((resData) => {
                                                                                if (resData.result == 1) {
                                                                                    StorageLoginInfo.storageSave(resData);
                                                                                    that.goBackSuccee();
                                                                                }
                                                                                else {
                                                                                    alert('提示', resData.resultmsg)
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
    },
    _wechatlogin(that) {
        WechatAPI.login()
            .then((result) => {
                let appid = result.appid;
                let secret = '5b835e079361c2cc8fe39a82e23412d7'
                let code = result.code;
                let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code';
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            response.json()
                                .then((res) => {
                                    let access_token = res.access_token;
                                    let openid = res.openid;
                                    let urlInfo = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid;

                                    fetch(urlInfo)
                                        .then((resInfo) => {
                                            if (resInfo.ok) {
                                                resInfo.json()
                                                    .then((resInfo) => {
                                                        let urlN = Api.getUserinfo + '?fromtype=wx&connectid=' + openid + '&username=' + resInfo.nickname + '&unionid=' + resInfo.unionid + '&avatar=' + resInfo.headimgurl;                                                   
                                                        fetch(urlN)
                                                            .then((ress) => {
                                                                if (ress.ok) {
                                                                    ress.json()
                                                                        .then((ressData) => {
                                                                            if (ressData.result == 1) {
                                                                                StorageLoginInfo.storageSave(ressData);
                                                                                that.goBackSuccee();
                                                                            }
                                                                            else {
                                                                                alert('提示', resData.resultmsg)
                                                                            }
                                                                        })
                                                                }
                                                                else {
                                                                    console.log('网络请求失败1')
                                                                }
                                                            })
                                                            .catch((error) => {
                                                                console.log('error:', error)
                                                            })
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