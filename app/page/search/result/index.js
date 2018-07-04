import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, ListView, ActivityIndicator ,DeviceEventEmitter,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../../util/api';
import Theme from '../../../util/theme';
import InvestDetail from '../../../page/investDetail';
import Item from '../../../component/item/index';
import Loading from '../../../component/loading';


export default class SearchBtn extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: false,
            isLoadMoreIng:false,
            isLoadMoreOver: false,
            dataSource: ds.cloneWithRows([]),
            dataSource2: [],
            pageCount: 1,
            totalNum: null,
            pageSize: null,
        };
    }
    render() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <View style={[styles.container, Platform.OS == 'android' ? { marginTop: 0 } : null]}>
                <View style={[styles.searchWp,Platform.OS=='android'?{paddingTop:12}:null]}>
                    <TouchableOpacity style={styles.backBtn} activeOpacity={0.8}
                        onPress={() => {
                            this.props.navigator.pop();
                        }}
                    >
                        <Icon name={'back2'} size={15} color={'#fff'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}
                        onPress={() => {
                            this.props.navigator.pop();
                        }}
                    >
                        <Icon name={'searchN'} size={12} color={'#999'} />
                        <Text style={styles.searchText}>{this.props.searchText}</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1 ,marginTop:10,}}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}

                                renderFooter={this.renderFooter.bind(this)}
                                onEndReached={this._onEndReached.bind(this)}
                                onEndReachedThreshold={10}
                            />
                    }

                </View>
            </View>
        )
    }
    componentDidMount() {
        this.setState({
            searchText: this.props.searchText
        })
        this.getData(1, this.props.searchText);
       
    }

    renderRow(rowData, sectionID, rowID) {
        const navigator = this.props.navigator;
        return <Item data={rowData} key={sectionID + rowID} navigator={navigator} />
    }
    renderFooter() {
        if (this.state.isLoadMore) {
            if (this.state.isLoadMoreOver) {

                return (
                    <View style={styles.loadMore}>
                        <Text style={styles.loadMoreText}>没有更多啦！</Text>
                    </View>
                )
            }
            else {

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
        if (this.state.totalNum > this.state.pageSize && !this.state.isLoadMoreIng) {
            this.getData(2, this.props.searchText)
        }
    }
    getData(type, keywords) {
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
                    isLoadMoreIng:true,
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


        let url = Api.searchActivity + '?keywords=' + keywords + '&page=' + this.page + '&pagesize=' + 20;

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
                                    isLoadMoreIng:false,
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

    goDetail(id, name) {
        this.props.navigator.push({
            component: InvestDetail,
            params: {
                id: id,
                name: name,
            }
        })
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    searchWp: {
       flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#1d1d1d',
    },
    searchBtn: {
        flex: 1,
        paddingLeft: 6,
        flexDirection: 'row',
        alignItems: 'center',
        height: 26,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    searchText: {
        paddingLeft: 5,
        width: Theme.screenWidth * 0.8 - 40,
        fontSize: 11,
        color: '#ccc',
    },
    backBtn: {
        width: 30,
        height: 26,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'flex-start',
    },
    cancelText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },


})