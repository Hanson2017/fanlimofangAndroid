import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, RefreshControl, ActivityIndicator } from 'react-native';

import Item from './item'
import Header from './header'
import Loading from '../../app/component/loading';

export default class List extends Component {
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
        };
    }
    render() {
        return (
            <View>
                <Header headerOpt={{ title: this.props.title, back: 'null' }} />
                <View style={styles.listContainer}>
                    {
                        this.state.loading ?
                            <Loading /> :
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}
                                onEndReached={this._onEndReached.bind(this)}
                                onEndReachedThreshold={10}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this._onRefresh.bind(this)}
                                    />
                                }
                            />
                    }

                </View>
            </View>
        )

    }
    renderRow(rowData, sectionID, rowID) {
        return <Item data={rowData} key={sectionID + rowID} navigator={this.props.navigator} type={this.props.type} />
    }
    componentDidMount() {
        this.getData(1)
    }
    _onEndReached() {
        this.getData(2)
    }
    _onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData(3)
    }
    getData(type) {
        let that = this;
        let pageCount = 10;

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

        let url = 'http://www.76676.com/index.php?m=member&c=index&a=public_newsapi_type&type=' + this.props.type + '&page=' + this.page + '&pagenum=' + 20

        fetch(url)
            .then((response) => {

                if (response.ok) {

                    response.json()
                        .then((responseData) => {
                            let dataSource = that.state.dataSource2;
                            dataSource = dataSource.concat(responseData);
                            let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                            that.setState({
                                isRefreshing: false,
                                loading: false,
                                isLoadMore: false,
                                dataSource: ds.cloneWithRows(dataSource),
                                dataSource2: dataSource,
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
    listContainer: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 140,
    }
})