import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, ListView, TouchableOpacity, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import Theme from '../util/theme';
import Api from '../util/api';
import Util from '../util/util';
import Common from '../component/Common'
import Header from '../component/Header';
import Loading from '../component/Loading';
import ActiveRecordEdit from '../page/ActiveRecordEdit';

class Comm extends Component {
    render() {
        return (
            <View style={{ marginBottom: 5, }}>
                <Text style={[styles.line20, styles.td]}>{this.props.title}</Text>
                <Text style={[styles.line20, styles.c999]}>{this.props.val}</Text>
            </View>
        )
    }
}

class List extends Component {
    render() {
        let data = this.props.data;
        let investType = Common.investType(data.activity.isrepeat)  //投资类型
        let investdate = Util.formatDate(data.comment.investdate)   //投资日期
        let comment_field = data.activity.comment_field;

        // 跟帖信息
        if (comment_field.indexOf('c_userid') >= 0) {
            var useridView = (
                <Comm title={'注册ID'} val={data.comment.c_userid} />
            )
        }
        if (comment_field.indexOf('c_phone') >= 0) {

            var phoneView = (
                <Comm title={'注册手机号'} val={data.comment.c_phone} />
            )
        }
        if (comment_field.indexOf('c_username') >= 0) {

            var realnameView = (
                <Comm title={'真实姓名'} val={data.comment.c_username} />
            )
        }

        if (comment_field.indexOf('investdate') >= 0) {
            var investdateView = (
                <Comm title={'投资日期'} val={investdate} />
            )
        }

        // 状态
        let status;
        let paymoney = null;
        let checkInfo = null;
        let idEdit = null;
        switch (data.comment.status) {
            case 0:
                status = '待审核'
                idEdit = (
                    <Text style={[styles.line20, { color: 'cornflowerblue' }]}>编辑</Text>
                )
                statusStyles = {
                    color: '#999',
                }
                break;

            case 1:
                status = '已通过'
                paymoney = (
                    <Text style={{ color: '#999', marginTop: 5 }}>魔方返现{data.comment.paymoney}元</Text>
                )
                statusStyles = {
                    color: 'darkgreen',
                }
                break;
            case 2:
                status = '已驳回'
                checkInfo = (
                    <Text style={{ color: '#999', marginTop: 5 }}>{data.comment.checkinfo}</Text>
                )
                statusStyles = {
                    color: 'red',
                }
                break;
        }

        return (
            <TouchableOpacity style={[Theme.flexDrow, styles.tabTr]} activeOpacity={0.7} onPress={this.goActiveRecordEdit.bind(this, data.comment.status)}>
                <View style={[styles.td1]}><Text style={[styles.td, styles.line20]}>{data.plat.platname}</Text></View>
                <View style={[styles.td2]}><Text style={[styles.td, styles.line20]}>{investType}</Text></View>
                <View style={[styles.td3]}>
                    {useridView}
                    {phoneView}
                    {realnameView}
                    {investdateView}
                    <Comm title={'投资方案'} val={'第' + data.comment.periodnumber + '期，方案' + data.comment.plannumber} />
                    <Comm title={'支付宝账号'} val={data.comment.alipayid} />
                </View>
                <View style={[styles.td4]}>
                    <Text style={[styles.line20, statusStyles]}>{status}</Text>
                    {paymoney}
                    {checkInfo}
                </View>
                <View>
                    {idEdit}
                </View>
            </TouchableOpacity>
        )
    }
    goActiveRecordEdit(status) {
        let data = this.props.data;
        if (status == 0) {
            this.props.navigator.push({
                component: ActiveRecordEdit,
                params: {
                    id: data.comment.id,
                    comment_field: data.activity.comment_field
                }
            })
        }

    }

}


export default class ActiveRecord extends Component {
    constructor(props) {
        super(props)
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: false,
            isLoadMoreOver: false,
            ref: false,
            dataSource: ds.cloneWithRows([]),
            dataSource2: [],
            pageCount: 1,
            totalNum: null,
            pageSize: null,
        };
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Header navigator={this.props.navigator} headerText={'活动记录'} />
                    <Loading />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Header navigator={this.props.navigator} headerText={'活动记录'} />
                    <View style={styles.listContainr}>
                        <View style={[Theme.flexDrow, styles.tabTh]}>
                            <Text style={[styles.td1, styles.th]}>活动平台</Text>
                            <Text style={[styles.td2, styles.th]}>类型</Text>
                            <Text style={[styles.td3, styles.th]}>跟贴信息</Text>
                            <Text style={[styles.td4, styles.th]}>状态</Text>
                            <Text style={[styles.th]}>操作</Text>
                        </View>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            renderFooter={this.renderFooter.bind(this)}
                            onEndReached={this._onEndReached.bind(this)}
                            onEndReachedThreshold={10}
                        />
                    </View>

                </View>

            )
        }

    }
    componentDidMount() {
        let that = this;
        this.getData(1)
        this.subscription = DeviceEventEmitter.addListener('editComment', (data) => {
           that.getData(1)
        })
    }
    componentWillUnmount() {
        this.subscription.remove();
    };
    renderRow(rowData) {

        return <List data={rowData} navigator={this.props.navigator} />

    }
    renderFooter() {
        if (this.state.isLoadMore) {
            if (this.state.isLoadMoreOver) {
                console.log('没有更多啦！')
                return (
                    <View style={styles.loadMore}>
                        <Text style={styles.loadMoreText}>没有更多啦！</Text>
                    </View>
                )
            }
            else {
                console.log(' 正在加载...')
                return (
                    <View style={styles.loadMore}>
                        <ActivityIndicator animating={true} />
                    </View>
                )
            }
        }
        else {
            return null;
        }

    }
    _onEndReached() {
        if (this.state.totalNum > this.state.pageSize) {
            this.getData(2)
        }
    }
    getData(type) {
        let memberId = signState.r_id;

        let that = this;

        let pageCount = this.state.pageCount;


        if (type == 1) {
            this.page = 1;
            this.setState({
                loading: true,
                 dataSource2: [],
            })
        }
        else if (type == 2) {
            if (pageCount > this.page) {
                this.page++;
                this.setState({
                    isLoadMore: true,
                })
            }
            else {
                this.setState({
                    isLoadMoreOver: true,
                })
                console.log('加载完啦')
                setTimeout(() => {
                    this.setState({
                        isLoadMoreOver: false,
                    })
                }, 3000)
                return;
            }

        }
        else if (type == 3) {
            this.page = 1;
            this.setState({
                dataSource2: [],
            })
        }

        let url = Api.getmemberlist + '?memberid=' + memberId + '&page=' + this.page + '&pagesize=10';

        fetch(url)
            .then((response) => {

                if (response.ok) {

                    response.json()
                        .then((responseData) => {
                            let dataSource = that.state.dataSource2;
                            dataSource = dataSource.concat(responseData.data);
                            let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                            that.setState({
                                isRefreshing: false,
                                loading: false,
                                isLoadMore: false,
                                dataSource: ds.cloneWithRows(dataSource),
                                dataSource2: dataSource,
                                pageCount: responseData.pageCount,
                                totalNum: responseData.totalNum,
                                pageSize: responseData.pageSize,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    listContainr: {
        marginTop: 10,
        backgroundColor: '#fff',
        flex: 1,
    },
    tabTh: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        height: 44,
        alignItems: 'center',
    },
    tabTr: {
        paddingTop: 13,
        paddingBottom: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    line20: {
        lineHeight: 20,
    },
    th: {
        color: '#999',
    },
    td: {
        color: '#666',
    },
    td1: {
        paddingLeft: 10,
        width: 80,
    },
    td2: {
        width: 50,
    },
    td3: {
        width: 125,
    },
    td4: {
        width: 75,
    },
    td5: {
        width: 100,
    },
    c999: {
        color: '#999'
    },
    loadMore: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loadMoreText: {
        color: '#999',
    }
})

