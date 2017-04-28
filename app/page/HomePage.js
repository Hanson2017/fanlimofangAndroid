import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, ScrollView, RefreshControl, DeviceEventEmitter ,Platform} from 'react-native';
import Item from '../component/Item';
import Api from '../util/api';
import Theme from '../util/theme';
import Header from '../component/Header';
import Loading from '../component/Loading';
import Title from '../component/Title';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSourceNew: [],
            dataSourceFirst: [],
            dataSourceRepeat: []
        };
    }
    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            return (
                <View style={[styles.container,Platform.OS=='android'?{marginTop:0}:null]}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    >
                        <View style={styles.banner}>
                            <Image source={{ uri: 'http://m.fanlimofang.com/images/banner.jpg' }} resizeMode={'contain'} style={styles.bannerImg} />
                        </View>
                        <Group title={'最新上线活动'} lists={this.state.dataSourceNew} navigator={this.props.navigator} name={'news'} />
                        <Group title={'热门首投活动'} lists={this.state.dataSourceFirst} navigator={this.props.navigator} name={'hot'} />
                        <Group title={'热门复投活动'} lists={this.state.dataSourceRepeat} navigator={this.props.navigator} name={'repeat'} />
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
                                dataSourceRepeat: dataSource.homerepeat
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
                <Item data={list} key={this.props.name+i} navigator={this.props.navigator} backName={'首页'} />
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

var styles = StyleSheet.create({
    container: {
        marginTop: 23,
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    banner:{
        height:129,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerImg: {
        width: Theme.screenWidth,
        height: 129,
    },
})