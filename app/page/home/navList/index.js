import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../util/theme';
import Account from '../../../page/account/index';
import InvestTab from '../../InvestTab/index';

var listIcon = [
    { title: '大额活动', iconName: 'homeNavDaer', screenUrl: InvestTab, tabId: 0 },
    { title: '小额活动', iconName: 'homeNavXiaoer', screenUrl: InvestTab, tabId: 1 },
    { title: '高返利', iconName: 'homeNavGaofanli', screenUrl: InvestTab, tabId: 2 },
    { title: '存管系', iconName: 'homeNavCunguan', screenUrl: InvestTab, tabId: 3 },
    { title: '融资系', iconName: 'homeNavRongzi', screenUrl: InvestTab, tabId: 4 },
    { title: '国资系', iconName: 'homeNavGuozi', screenUrl: InvestTab, tabId: 5 },
    { title: '上市系', iconName: 'homeNavShangshi', screenUrl: InvestTab, tabId: 6 }
];

export default class Group extends Component {
    render() {
        const { navigator, } = this.props;
        return (
            <View style={styles.homeNav}>

                <View style={styles.homeNavList}>
                    {
                        listIcon.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        navigator.push({
                                            component: item.screenUrl,
                                            params: {
                                                tabId: item.tabId,
                                            }

                                        })
                                    }}
                                    style={[styles.listRow]}
                                    key={i}
                                >
                                    <Icon name={item.iconName} size={22} color={'#E62344'} />
                                    <Text style={[styles.textStyle]}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            navigator.push({
                                component: Account,
                                params: {
                                    source: 'home',
                                }
                            })
                        }}
                        style={[styles.listRow]}
                    >
                        <Icon name={'homeNavZhanghu'} size={22} color={'#E62344'} />
                        <Text style={[styles.textStyle]}>个人中心</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


var styles = StyleSheet.create({

    homeNav: {
        paddingTop: 10,
        paddingBottom: 12,
        backgroundColor: '#fff',
    },
    homeNavList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
    },
    listRow: {
        height: 75,
        width: (Theme.screenWidth - 20) / 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        marginTop: 12,
        color: '#999',
        fontSize: 12,
    },

})