import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, RefreshControl, DeviceEventEmitter, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Item from '../component/Item';
import Api from '../util/api';
import Theme from '../util/theme';
import Header from '../component/Header';
import Loading from '../component/Loading';
import Title from '../component/Title';
import DetailPage from './DetailPage'
import MePage from '../page/MePage'
import Login from '../page/loginPageT'
import ListPage from './listPage';
import MarqueeLabel from '../component/marquee'

var listIcon = [
    { title: '大额活动', iconName: 'homeNavDaer', screenUrl: ListPage, tabId: 0 },
    { title: '小额活动', iconName: 'homeNavXiaoer', screenUrl: ListPage, tabId: 1 },
    { title: '高返利', iconName: 'homeNavGaofanli', screenUrl: ListPage, tabId: 2 },
    { title: '存管系', iconName: 'homeNavCunguan', screenUrl: ListPage, tabId: 3 },
    { title: '融资系', iconName: 'homeNavRongzi', screenUrl: ListPage, tabId: 4 },
    { title: '国资系', iconName: 'homeNavGuozi', screenUrl: ListPage, tabId: 5 },
    { title: '上市系', iconName: 'homeNavShangshi', screenUrl: ListPage, tabId: 6 }
];


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSourceNew: [],
            dataSourceFirst: [],
            dataSourceRepeat: [],
            noticeList: []
        };
    }
    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            const loginPage = '';
            if (signState) {
                loginPage = MePage;
            }
            else {
                loginPage = Login;
            }
            return (
                <View style={[styles.container, Platform.OS == 'android' ? { marginTop: 0 } : null]}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    >
                        <View style={styles.banner}>
                            <Image source={{ uri: 'http://m.fanlimofang.com/images/banner.jpg' }} resizeMode={'cover'} style={styles.bannerImg} />
                        </View>
                        <View style={styles.homeNav}>
                            <MarqueeLabel data={this.state.noticeList} navigator={this.props.navigator} />
                            <View style={styles.homeNavList}>
                                {
                                    listIcon.map((item, i) => {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                onPress={() => {
                                                    this.props.navigator.push({
                                                        component: item.screenUrl,
                                                        params: {
                                                            tabId: item.tabId,
                                                        }

                                                    })
                                                }}
                                                style={[styles.listRow]}
                                                key={i}
                                            >
                                                <Icon name={item.iconName} size={26} color={'#FF6666'} />
                                                <Text style={[styles.textStyle]}>{item.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: loginPage,
                                            params: {
                                                source: 'home',
                                            }
                                        })
                                    }}
                                    style={[styles.listRow]}
                                >
                                    <Icon name={'homeNavZhanghu'} size={26} color={'#FF6666'} />
                                    <Text style={[styles.textStyle]}>个人中心</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <GroupNew title={'最新上线活动'} lists={this.state.dataSourceNew} navigator={this.props.navigator} name={'news'} />
                            <Group title={'热门首投活动'} lists={this.state.dataSourceFirst} navigator={this.props.navigator} name={'hot'} />
                            <Group title={'热门复投活动'} lists={this.state.dataSourceRepeat} navigator={this.props.navigator} name={'repeat'} />
                        </View>
                    </ScrollView>

                </View>
            )
        }

    }
    componentDidMount() {
        this.getData()
    }
    _onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData('isRefreshing')
    }
    getData(type) {
        let url = Api.home;
        if (!type) {
            this.setState({
                loading: true,
            })
        }
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            let dataSource = responseData.data;
                            this.setState({
                                isRefreshing: false,
                                loading: false,
                                dataSourceNew: dataSource.homenew,
                                dataSourceFirst: dataSource.homefirst,
                                dataSourceRepeat: dataSource.homerepeat,
                                noticeList: dataSource.payuser
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
    }
}

class Group extends Component {
    render() {
        var Items = this.props.lists.map((list, i) => {

            return (
                <Item data={list} key={this.props.name + i} navigator={this.props.navigator} backName={'首页'} />
            )
        })
        return (
            <View>
                <Title title={this.props.title} />
                {Items}
            </View>
        )
    }
}

class GroupNew extends Component {
    render() {

        var Items = this.props.lists.map((list, i) => {
            let uri = Api.domain + list.plat.platlogo;
            return (
                <TouchableOpacity onPress={this.goDetail.bind(this, list.activity.id, list.plat.platname)} activeOpacity={0.8} style={styles.ItemNew}>
                    <View style={styles.ItemNewPic}>
                        <Image source={{ uri: uri }} style={{ width: 70, height: 28 }} />
                    </View>
                    <View style={[Theme.flexDrow, { alignItems: 'center', }]}>
                        <Text style={styles.ItemNewText}>投{list.activity.invest + ''}获得</Text>
                        <Text style={[styles.ItemNewText, { color: 'red' }]}>{list.activity.rebate + ''}</Text>
                    </View>
                    <View style={Theme.flexDrow}>
                        <Text style={styles.ItemNewText}>相当于年化</Text>
                        <Text style={[styles.ItemNewText, { color: 'red' }]}>

                            {
                                list.activity.atype == 1 || list.activity.atype == 4 ?
                                    list.activity.rate + '%'
                                    :
                                    '浮动'
                            }

                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return (
            <View >
                <Title title={this.props.title} />
                <View style={styles.ItemNewList}>
                    {Items}
                </View>

            </View>
        )
    }
    goDetail(id, name) {
        this.props.navigator.push({
            component: DetailPage,
            params: {
                id: id
            }
        })
    }
}


var styles = StyleSheet.create({
    container: {
        marginTop: 23,
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    banner: {
        height: 129,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerImg: {
        flex: 1,
        width: Theme.screenWidth,
        height: 129,
    },
    homeNav: {
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
        color: '#30333b',
        fontSize: 13,
    },
    ItemNew: {
        overflow: 'hidden',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 8,
        paddingBottom: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
        width: Theme.screenWidth / 3 - 13
    },
    ItemNewPic: {
        marginBottom: 8,
        paddingBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    ItemNewList: {
        flexDirection: 'row',
    },
    ItemNewText: {
        lineHeight: 20,
        fontSize: 11.5,
        color: '#666',
    }
})