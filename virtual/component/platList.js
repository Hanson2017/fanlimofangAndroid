import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, RefreshControl, ActivityIndicator } from 'react-native';

import Item from './platItem'
import Header from './header'
import Loading from '../../app/component/loading';
import Api from '../util/api'

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
                                renderHeader={this.renderHeader.bind(this)}
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
    renderHeader() {
         let typeInfo=this.props.typeInfo;
        return (
            <View style={styles.headerRow}>
                <Text style={[styles.TdID, styles.Td]}>排名</Text>
                <Text style={[styles.TdPlat, styles.Td]}>平台名称</Text>
                <Text style={[styles.TdScore, styles.Td]}>{typeInfo.typeText}</Text>
            </View>
        )
    }
    renderRow(rowData, sectionID, rowID) {
        let typeInfo=this.props.typeInfo;
        return <Item data={rowData} index={rowID} key={sectionID + rowID} ScoreTp={typeInfo.typeField} navigator={this.props.navigator} />
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
        let typeInfo=this.props.typeInfo;
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

        let url = Api[typeInfo.column] + '?type=' + typeInfo.tyoe + '&page=' + that.page + '&pagesize=' + 50;
        console.log(url)
        fetch(url)
            .then((response) => {

                if (response.ok) {

                    response.json()
                        .then((responseData) => {
                            let dataSource = that.state.dataSource2;
                            dataSource = dataSource.concat(responseData[typeInfo.dataName]);
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
        marginBottom: 140,
    },
    headerRow:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e5ea',
        height: 44,
    },
    Td: {
        color: '#8c96a0'
    },
    TdID: {
        paddingLeft:20,
        width: 80,
    },
    TdPlat: {
        width: 120,
    },
    TdScore: {
        width: 100,
    }
})