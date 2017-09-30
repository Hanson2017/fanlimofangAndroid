import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, ListView, Alert, DeviceEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../util/api';
import Theme from '../util/theme';
import DetailPage from '../page/DetailPage'
import SearchResult from '../page/SearchResult'
import StorageLoginInfo from '../config/storageLogin'

export default class SearchBtn extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            dataSource2: [],
            searchText: '',
            searching:true,
            loading: true,
            ref: false
        };
    }
    render() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var historys = historyKeyWords.reverse();
            if(historys.length>10){
                historys=historys.slice(0,10) 
            }
        return (
            <View style={styles.container}>
                <View style={styles.searchWp}>
                    <View style={styles.searchBtn} activeOpacity={0.8}>
                        <Icon name={'searchN'} size={15} color={'#999'} />
                        <TextInput style={styles.searchText}
                            placeholderTextColor={'#ccc'}
                            placeholder='搜索你感兴趣的平台活动'
                            clearButtonMode={'while-editing'}
                            enablesReturnKeyAutomatically={true}
                            autoFocus={true}
                            returnKeyType='search'
                            onChangeText={(text) => {
                                this.setState({
                                    searchText: text
                                })
                                if (text != '') {
                                    this.setState({
                                        searching:false,
                                    })
                                    this.getData(text)
                                }
                                else {
                                    this.setState({
                                        dataSource: ds.cloneWithRows([]),
                                        dataSource2: [],
                                        searching:true,
                                    })
                                }
                            }}
                            onSubmitEditing={this.onSubmit.bind(this)}
                        />
                    </View>
                    <TouchableOpacity style={styles.cancelBtn}
                        onPress={() => {
                            this.props.navigator.pop();
                        }}
                    >
                        <Text style={styles.cancelText}>取消</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    {
                        historys.length > 0 && this.state.searching ?
                            <View>
                                <View style={styles.historyTitle}><Text style={styles.historyTitleText}>历史搜索</Text></View>
                                <View style={styles.historySearch}>
                                    {
                                        historys.map((item, i) => {
                                            return (
                                                <TouchableOpacity style={styles.historyList}
                                                    onPress={item.id == 0 ? this.goSearchResult.bind(this) : this.goDetail.bind(this, item.id, item.platname)}
                                                >
                                                    <Text>{item.title}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                    />
                </View>
            </View>
        )
    }
    clearHistory() {
        StorageLoginInfo.storageRemoveKeyWord();
        historyKeyWords = []
        this.setState({
            ref: !this.state.ref
        })
    }
    componentDidMount() {
        let that = this;
        this.subscription22 = DeviceEventEmitter.addListener('storageSaveKeyWord', (data) => {
            StorageLoginInfo.storageLoadKeyWord(that)
        })

    }
    componentWillUnmount() {
        this.subscription22.remove();
    };
    renderRow(rowData, sectionID, rowID) {
        const navigator = this.props.navigator;
        return (
            <TouchableOpacity
                style={styles.listV} activeOpacity={0.4}
                onPress={this.goDetail.bind(this, rowData.id, rowData.platname)}
                key={sectionID + rowID}
            >
                <Text style={[styles.platname, { color: '#2a343e' }]}>{rowData.platname}</Text>
                <Text style={styles.platType}>（{rowData.isrepeat == 0 ? '首投' : '复投'}）</Text>
            </TouchableOpacity>

        )
    }
    getData(keywords) {
        let that = this;
        let url = Api.searchJson + '?opnum=50' + '&keywords=' + keywords;
        if (keywords != '') {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        response.json()
                            .then((responseData) => {

                                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                                that.setState({
                                    dataSource: ds.cloneWithRows(responseData.data),
                                    dataSource2: responseData.data
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
    goDetail(id, name) {
        this.props.navigator.push({
            component: DetailPage,
            params: {
                id: id,
                name: name,
            }
        })
    }
    goSearchResult() {
        let searchText = this.state.searchText;
        this.props.navigator.push({
            component: SearchResult,
            params: {
                searchText: searchText,
            }
        })
    }
    onSubmit() {
        let that = this;
        let navigator = this.props.navigator;
        let searchList = this.state.dataSource2;
        let searchText = this.state.searchText;
        if (searchText != '') {

            if (searchList.length > 0) {

                let keywords = [];
                let historyky=[];
                for(var i=0;i<historyKeyWords.length;i++){
                    historyky.push(historyKeyWords[i].title)
                }
                var index = historyky.indexOf(searchText);
      
                if (index != -1) {
                    historyKeyWords.splice(index, 1)
                }

                if (searchList.length == 1) {
                    keywords = historyKeyWords.concat({ title: searchText, id: searchList[0].id, platname: searchList[0].platname });
                    StorageLoginInfo.storageSaveKeyWord(keywords);
                    DeviceEventEmitter.emit('storageSaveKeyWord', '存储历史记录')

                    that.goDetail(searchList[0].id, searchList[0].platname)
                }
                else if (searchList.length > 1) {
                    keywords = historyKeyWords.concat({ title: searchText, id: 0, platname: '' });
                    StorageLoginInfo.storageSaveKeyWord(keywords);
                    DeviceEventEmitter.emit('storageSaveKeyWord', '存储历史记录')
                    that.goSearchResult()
                }
            }
            else {
                Alert.alert(' ', '您搜索的平台不存在')
            }

        }
        else {
            Alert.alert(' ', '请输入你关心平台的名称')
        }
    }
}


var styles = StyleSheet.create({
    container: {
        marginTop: 23,
        flex: 1,
    },
    searchWp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#f23b83',
    },
    searchBtn: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        width: Theme.screenWidth * 0.8,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    searchText: {
        paddingLeft: 8,
        width: Theme.screenWidth * 0.8 - 40,
        height: 32,
        lineHeight: 32,
        fontSize: 13,
        color: '#666',
    },
    cancelBtn: {
        marginLeft: 10,
    },
    cancelText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listV: {
        flexDirection: 'row',
        paddingLeft: 25,
        height: 44,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e6eb'
    },
    platname: {
        minWidth: 90,
    },
    platType: {
        color: '#999'
    },
    historyTitle: {
        paddingTop: 15,
        paddingLeft: 15,
    },
    historySearch: {
        paddingTop: 12,
        paddingLeft: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    historyTitleText: {
        color: '#666',
        fontSize: 14,
    },
    historyList: {
        marginRight: 10,
        marginBottom: 10,
        height: 28,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: '#e1e6eb',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyListText: {
        color: '#333',
        fontSize: 13,
    }

})