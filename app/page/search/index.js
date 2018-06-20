import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, ListView, Alert, DeviceEventEmitter, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../util/api';
import Theme from '../../util/theme';
import InvestDetail from '../../page/investDetail'
import SearchResult from './result/index'
import StorageLoginInfo from '../../config/storageLogin'

export default class SearchBtn extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            dataSource2: [],
            searchText: '',
            searching: true,
            loading: true,
            ref: false
        };
    }
    render() {
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var historys = historyKeyWords.reverse();
        if (historys.length > 10) {
            historys = historys.slice(0, 10)
        }
        return (
            <View style={[styles.container, Platform.OS == 'android' ? { marginTop: 0 } : null]}>
                <View style={[styles.searchWp,Platform.OS=='android'?{paddingTop:12}:null]}>
                    <View style={styles.searchBtn} activeOpacity={0.8}>
                        <Icon name={'searchN'} size={11} color={'#999'} />
                        <TextInput style={styles.searchText}
                            underlineColorAndroid="transparent"
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
                                        searching: false,
                                    })
                                    this.getData(text)
                                }
                                else {
                                    this.setState({
                                        dataSource: ds.cloneWithRows([]),
                                        dataSource2: [],
                                        searching: true,
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
                                                <TouchableOpacity key={i} style={styles.historyList}
                                                    onPress={item.id == 0 ? this.goSearchResult.bind(this, item.title) : this.goDetail.bind(this, item.id, item.platname)}
                                                >
                                                    <Text style={styles.historyListText}>{item.title}</Text>
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
                <Text style={styles.platType}>（{rowData.isrepeat == 0 ? '首次出借' : '多次出借'}）</Text>
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
            component: InvestDetail,
            params: {
                id: id,
                name: name,
            }
        })
    }
    goSearchResult(title) {
        let searchText;
        if (title) {
            searchText = title;
        }
        else {
            searchText = this.state.searchText;
        }

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
                let historyky = [];
                for (var i = 0; i < historyKeyWords.length; i++) {
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
        flex: 1,
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
        height: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    searchText: {
        padding:0,
        marginLeft: 5,
        flex: 1,
        height: 20,
        fontSize: 10,
        color: '#666',
    },
    cancelBtn: {
        marginLeft: 8,
    },
    cancelText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    listV: {
        flexDirection: 'row',
        paddingLeft: 12,
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e6eb'
    },
    platname: {
        minWidth: 90,
        fontSize:11,
    },
    platType: {
        fontSize:11,
        color: '#999'
    },
    historyTitle: {
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:10,
        paddingTop: 15,
        paddingLeft: 12,
    },
    historySearch: {
        paddingTop: 12,
        paddingLeft: 12,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    historyTitleText: {
        color: '#666',
        fontSize: 12,
    },
    historyList: {
        marginRight: 10,
        marginBottom: 10,
        height: 20,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: '#e1e6eb',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyListText: {
        color: '#333',
        fontSize: 11,
    }

})