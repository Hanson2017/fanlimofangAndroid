import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity,  ListView, RefreshControl, ActivityIndicator} from 'react-native';

import Theme from '../util/theme';
import Util from '../util/util';
import Api from '../util/api';
import Header from '../component/Header';
import Loading from '../component/Loading';
import Comment from '../component/Comment'

export default class CommentsPage extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: false,
            isLoadMoreOver: false,
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
                    <Header navigator={this.props.navigator} headerText={''} />
                    <Loading />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Header navigator={this.props.navigator} headerText={''} />
                    <View style={styles.content}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            renderFooter={this.renderFooter.bind(this)}
                            onEndReached={this._onEndReached.bind(this)}
                            onEndReachedThreshold={10}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                        />
                    </View>
                </View>
            )
        }

    }
    renderRow(rowData, sectionID, rowID) {
        return <Comment index={rowID}  commentlNum={this.state.totalNum-rowID} comment={rowData} commentField={this.props.comment_field} key={sectionID + rowID} />
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
    _onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData(3)
    }
    componentDidMount() {
        this.getData(1)
    }
    getData(type) {
        let that = this;

        let pageCount = this.state.pageCount;


        if (type == 1) {
            this.page = 1;
            this.setState({
                loading: true,
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

        let url = Api.comment + '?activityid=' + this.props.activityid + '&page=' + this.page + '&pagesize=20';

        setTimeout(() => {
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
        }, 300)


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    content: {
        marginTop: 10,
        paddingTop:15,
        paddingLeft:10,
        paddingRight:10,
        flex: 1,
        backgroundColor: '#fff',
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

