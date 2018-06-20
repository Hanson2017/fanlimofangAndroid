import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity, TextInput, DeviceEventEmitter, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Api from '../../../util/api';
import StorageLoginInfo from '../../../config/storageLogin'
import NavBar from '../../../component/navBar';
import ChangePassword from './changepwd';
import UserSet from './set';
import ActiveRecord from './activeList';
import Kefu from './kefu';

import MainPage from '../../../page/MainPage'

class List extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.accountBarList} onPress={this.goNext.bind(this)} activeOpacity={0.5}>
                <View style={styles.icon}>
                    <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
                    <Text style={[styles.accountBarListText, { marginLeft: 15 }]}>{this.props.text}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Icon name={'right'} size={12} color={'#999'} />
                </View>
            </TouchableOpacity>
        )
    }
    goNext() {
        this.props.navigator.push({
            component: this.props.component,
        })

    }
}

export default class MePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: false,
        }
    }
    render() {
        var { navigator } = this.props;
        var time = Date.parse(new Date());
        var day=null;
        if(signState.r_regtime){
            var lasttime = Date.parse(Util.formatDate(signState.r_regtime));
            day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
        }
       
        return (
            <View style={styles.container}>
                <NavBar title={''} search={'null'} navigator={navigator} />
                <View style={styles.containerBd}>
                    <View style={styles.accountHeader}>
                        {
                            signState.r_avatar && signState.r_avatar !== null && signState.r_avatar !== '' ?
                                <Image source={{ uri: signState.r_avatar }} style={styles.portrait} />
                                :
                                <Image source={{ uri: Api.domainM + '/images/portrait.png' }} style={styles.portrait} />
                        }
                        <Text style={styles.username}>{signState.r_username}</Text>
                        {
                            day !== null ?
                            <View style={styles.userDate}>
                                <Text style={styles.userDateText}>玩转魔方 {day+''} 天</Text>
                            </View>
                            :
                            null
                        }
                        
                    </View>
                    <ScrollView>
                        <View style={styles.accountBar}>
                            <List text={'活动记录'} iconName={'activeRecord'} iconSize={11} iconColor={'#999'}
                                navigator={navigator}
                                component={ActiveRecord}
                            />
                            {
                                signState.r_fromtype == 'email' ?
                                    <List text={'修改密码'} iconName={'chagePassword'} iconSize={11} iconColor={'#999'}
                                        navigator={navigator}
                                        component={ChangePassword}
                                    />
                                    :
                                    null

                            }
                            <List text={'快捷设置'} iconName={'quick'} iconSize={12} iconColor={'#999'}
                                navigator={navigator}
                                component={UserSet}
                            />
                        </View>
                        <View style={{ marginTop: 15, }}>
                            <List text={'在线客服'} iconName={'qq'} iconSize={12} iconColor={'#999'}
                                navigator={navigator}
                                component={Kefu}
                            />
                        </View>
                        <TouchableOpacity style={[styles.accountBarList, Theme.mt15, { justifyContent: 'center' }]} activeOpacity={0.7} onPress={this.logout.bind(this)}>
                            <Text style={styles.accountBarListText}>退出登录</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.version}>
                    <Text style={styles.versionText}>版本号：3.0.5</Text>
                </View>
            </View>
        )
    }
    componentDidMount() {
        let that = this;
        this.subscription = DeviceEventEmitter.addListener('loginState', (data) => {
            StorageLoginInfo.storageLoad(that)
        })

    }
    componentWillUnmount() {
        this.subscription.remove();
    };
    goLogin() {
        this.props.navigator.push({
            component: Login,
        })
    }
    logout() {
        let that = this;
        Alert.alert('', '是否退出登录？', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确认', onPress: () => {
                    StorageLoginInfo.storageRemove()
                    signState = null;
                    that.props.navigator.replace({
                        component: MainPage
                    })
                }
            },
        ])
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    containerBd: {
        flex: 1,
        justifyContent: 'space-between',

    },
    accountHeader: {
        paddingTop: 5,
        paddingBottom: 15,
        backgroundColor: '#1d1d1d',
        alignItems: 'center',
    },
    portrait: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    username: {
        paddingTop: 12,
        paddingBottom: 8,
        fontSize: 12,
        color: '#fff',
    },
    userDate: {
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 16,
        backgroundColor: '#e62344',
    },
    userDateText: {
        color: '#1d1d1d',
        fontSize: 11,
    },
    accountHeaderText: {
        color: '#666',
        fontSize: 16,
    },
    accountBar: {
        backgroundColor: '#fff',
    },
    accountBarList: {
        height: 55,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    accountBarListText: {
        color: '#444',
        fontSize: 11,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 15,
        marginLeft: 20,
    },
    version: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    versionText: {
        color: '#D7D7D7',
        fontSize: 11,
    }
})





