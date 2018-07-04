import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, ScrollView, RefreshControl, DeviceEventEmitter, Platform, StatusBar } from 'react-native';
import Api from '../../util/api';
import Theme from '../../util/theme';
import Loading from '../../component/loading';
import MarqueeLabel from './marquee';
import Search from './search';
import NavList from './navList';
import Group from './group';
import GroupNew from './groupNew';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSourceHot: [],
            dataSourceNew: [],
            dataSourceFirst: [],
            dataSourceRepeat: [],
            noticeList: [],
            fixed: false,
            firstContainerPy: 0,
            dateDiff: 0
        };
    }
    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            const { navigator } = this.props;
            const { isRefreshing, noticeList, dataSourceHot, dataSourceNew, dataSourceFirst, dataSourceRepeat, dateDiff } = this.state;
            return (
                <View style={[styles.container]}>
                    <StatusBar
                         backgroundColor="#1d1d1d"
                        barStyle="light-content"
                    />

                    <View style={[styles.homeTop,Platform.OS=='android'?{paddingTop:12}:null]} ref={'homeTop'}>
                        <View style={styles.logoContainer}>
                            <Image source={{ uri: 'http://m.fanlimofang.com/images/logo.png' }} style={styles.logo} />
                        </View>
                        <Search navigator={navigator} />
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    >
                        <MarqueeLabel data={noticeList} navigator={navigator} />
                        <View style={styles.banner}>
                            <Image source={{ uri: 'http://m.fanlimofang.com/images/bannerNew.png' }} resizeMode={'cover'} style={styles.bannerImg} />
                        </View>
                        <NavList navigator={navigator} />
                        <GroupNew title={'近期热门活动'} lists={dataSourceHot} navigator={navigator} />
                        <GroupNew title={'最新上线活动'} lists={dataSourceNew} navigator={navigator} />
                        <Group title={'首次出借活动'} dateDiff={dateDiff} lists={dataSourceFirst} navigator={navigator} type={'first'} />
                        <Group title={'多次出借活动'} dateDiff={dateDiff} lists={dataSourceRepeat} navigator={navigator} type={'repeat'} />
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
        let that = this;
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

                            var date = new Date();
                            var now = date.getTime();
                            var datenowServer = new Date(parseInt(responseData.datenow.replace("/Date(", "").replace(")/", "")));
                            var nowServer = datenowServer.getTime();
                            var dateDiff = nowServer - now;

                            this.setState({
                                isRefreshing: false,
                                loading: false,
                                dataSourceHot: dataSource.homerecom,
                                dataSourceNew: dataSource.homenew,
                                dataSourceFirst: dataSource.homefirst,
                                dataSourceRepeat: dataSource.homerepeat,
                                noticeList: dataSource.payuser,
                                dateDiff: dateDiff
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


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    homeTop: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1d1d1d',
    },
    logoContainer: {
        marginRight: 20,
    },
    logo: {
        width: 110,
        height: 26,
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

})