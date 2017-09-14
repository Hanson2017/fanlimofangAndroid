import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, ListView, RefreshControl, ActivityIndicator } from 'react-native';
import Item from '../component/Item';
import Api from '../util/api';
import Theme from '../util/theme';
import Loading from '../component/Loading';

export default class ListPage extends Component {
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
            return <Loading />
        }
        else {
            return (
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
            )
        }

    }
    componentDidMount() {
        this.getData(1)
    }
    renderRow(rowData, sectionID, rowID) {

        return <Item data={rowData} key={sectionID + rowID} navigator={this.props.navigator} backName={this.props.backName} />
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
    _onPress() {
        alert('详情页')
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
        var url 

        if(this.props.tType && this.props.tType == 'listTag'){
            url = Api.listTag + '?type=' + this.props.type + '&page=' + this.page + '&pagesize=10';
        }
        else{
            url = Api.list + '?type=' + this.props.type + '&page=' + this.page + '&pagesize=10';
        }

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