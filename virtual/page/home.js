import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TouchableOpacity, ScrollView, Image } from 'react-native';

import Item from '../component/item'
import Detail from './detail'
import Header from '../component/header'
import Swiper from 'react-native-swiper';
import Loading from '../../app/component/Loading';
import Theme from '../../app/util/theme';

export default class List extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            loading: true,
            dataSource: ds.cloneWithRows([]),
            hotData: null
        };
    }
    render() {

        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {

            return (
                <View style={{ flex: 1 }}>
                    <Header headerOpt={{ title: '返利魔方', back: 'null' }} />
                    <ScrollView style={{marginTop:0,}}>
                        <Swiper style={styles.wrapper} height={180}>
                            {
                                this.state.hotData.map((text) => {
                                    return (
                                        <TouchableOpacity style={styles.slide} onPress={this.goDetail.bind(this,text.id)}>
                                            <Image source={{ uri: text.img_2 }} style={{ width: Theme.screenWidth, height: 180 }} />
                                            <Text style={styles.slideTitle}>{text.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </Swiper>
                        <View style={styles.listContainer}>
                            <Text style={styles.hotTitle}>热门精华</Text>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)}
                            />

                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
    goDetail(id) {
        this.props.navigator.push({
            component: Detail,
            params: {
                id: id,
                type:58
            }
        })
    }
    renderRow(rowData, sectionID, rowID) {
        return <Item data={rowData} key={sectionID + rowID} navigator={this.props.navigator} type={58} />
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        let that = this;
        let url = 'http://www.76676.com/index.php?m=member&c=index&a=public_newsapi_home&pagenum=30'
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                            let hotData = responseData.splice(0, 3);
                            that.setState({
                                isRefreshing: false,
                                loading: false,
                                dataSource: ds.cloneWithRows(responseData),
                                hotData: hotData
                            })
                            console.log(hotData)
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
    hotTitle: {
        color: '#999',
        fontSize: 15,
        paddingBottom: 15,
    },
    listContainer: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    wrapper: {
        height: 100,
    },
    slide: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideTitle: {
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        bottom: 10,
        color: '#fff',
    }
})