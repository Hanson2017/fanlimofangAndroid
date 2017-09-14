import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity, TextInput, DeviceEventEmitter ,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../util/theme';
import StorageLoginInfo from '../config/storageLogin'

import Header from '../component/Header';
import Login from '../page/LoginPage'
import ActiveRecord from '../page/ActiveRecord'
import ChangePassword from '../page/ChangePassword'
import UserSet from '../page/UserSet'
import MainPage from '../page/MainPage'

class List extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.accountBarList} onPress={this.goNext.bind(this)} activeOpacity={0.5}>
                <View style={styles.icon}>
                    <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
                    <Text style={[styles.accountBarListText, { marginLeft: 15 }]}>{this.props.text}</Text>
                </View>
                <View style={{ marginRight: 10 }}>
                    <Icon name={'right'} size={16} color={'#999'} />
                </View>
            </TouchableOpacity>
        )
    }
    goNext() {
        if (signState) {
            this.props.navigator.push({
                component: this.props.component,
            })
        }
        else {
            this.props.navigator.push({
                component: Login,
            })
        }


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
        let accountHeader;
        let logoutView;
        let ListChangepwd=null;
        if (signState === null) {
            accountHeader =
                (
                    <View style={[styles.accountHeader,Platform.OS=='android' || this.props.source?{marginTop:0}:null]}>
                        <TouchableOpacity onPress={this.goLogin.bind(this)}>
                            <Text style={styles.accountHeaderTouch}>登录</Text>
                        </TouchableOpacity>


                    </View>
                )
            logoutView = null
        }
        else {
            accountHeader =
                (
                    <View style={[styles.accountHeader,Platform.OS=='android' || this.props.source?{marginTop:0}:null]}>
                        <Text style={styles.accountHeaderText}>欢迎您，{signState.r_username}</Text>
                    </View>
                )
            logoutView = (
                <TouchableOpacity style={[styles.accountBarList, Theme.mt15, { justifyContent: 'center' }]} activeOpacity={0.7} onPress={this.logout.bind(this)}>
                    <Text style={styles.accountBarListText}>退出登录</Text>
                </TouchableOpacity>
            )

            if (signState.r_fromtype == 'email') {
                ListChangepwd = <List text={'修改密码'} iconName={'chagePassword'} iconSize={18} iconColor={'#999'}
                    navigator={this.props.navigator}
                    component={ChangePassword}
                />
            }

        }

        return (
            <View style={styles.container}>
                {
                    this.props.source?
                    <Header navigator={this.props.navigator} headerText={'个人中心'} backView={'login'} />
                    :
                    null
                }
                
                {accountHeader}
                <View style={styles.accountBar}>
                    <List text={'活动记录'} iconName={'activeRecord'} iconSize={17} iconColor={'#999'}
                        navigator={this.props.navigator}
                        component={ActiveRecord}
                    />
                    {ListChangepwd}
                    <List text={'快捷设置'} iconName={'quick'} iconSize={19} iconColor={'#999'}
                        navigator={this.props.navigator}
                        component={UserSet}
                    />
                    {/*<List text={'系统设置'} iconName={'set'} iconSize={18} iconColor={'#999'} />*/}
                </View>
                {logoutView}
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
        StorageLoginInfo.storageRemove()
        signState = null;
        this.setState({
            ref: !this.state.ref
        })
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
    accountHeader: {
        marginTop: 23,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    accountHeaderText: {
        color: '#666',
        fontSize: 16,
    },
    accountHeaderTouch: {
        fontSize: 16,
        color: '#888',
    },
    accountBar: {
        marginTop: 15,
        backgroundColor: '#fff',
    },
    accountBarList: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    accountBarListText: {
        color: '#444',
        fontSize:15,
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 15,
        marginLeft: 20,
    }
})





