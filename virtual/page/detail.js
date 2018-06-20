import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView,Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Item from '../component/item';
import Loading from '../../app/component/loading';
import Util from '../../app/util/util'

class Header extends Component {
    render() {
        return (
             <View style={[styles.headerContainer,Platform.OS != 'ios' ? {marginTop:0}:null]}>
                <TouchableOpacity style={{ width: 50, paddingLeft: 13, }} onPress={this.goBack.bind(this)}>
                    <Icon name='back' size={26} color={'#a9a9a9'} />
                </TouchableOpacity>

            </View>
        )
    }
    goBack() {
        this.props.navigator.pop();
    }
}

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: null,
            loading2: true,
            dataSource2: null
        };
    }
    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            let data = this.state.dataSource;
            return (
                <View style={{ flex: 1 }}>
                    <Header navigator={this.props.navigator} />
                    <ScrollView style={styles.container}>
                        <Text style={styles.title}>{data.title}</Text>
                        <Text style={styles.updata}>{Util.setDate(new Date(data.inputtime * 1000))}</Text>
                        <View style={{ marginTop: 15, marginBottom: 15, }}>
                            <Image source={{ uri: data.img_2 }} style={{ width: 240, height: 180 }} />
                        </View>
                        <View>
                            {
                                data.content.split('</div>').map((text) => {
                                    let newText = Util.delHtmlTag(text)
                                    return (
                                        <Text style={styles.conText}>{newText}</Text>
                                    )
                                })
                            }
                        </View>
                        <View style={styles.xiangguan}>
                            <Text style={styles.xiangguanTitle}>相关推荐</Text>
                             {
                                 this.state.loading2?null:
                                 this.state.dataSource2.map((text,i)=>{
                                     return(
                                         <Item data={text} key={i} navigator={this.props.navigator} type={this.props.type} />
                                     )
                                 })
                             }   
                        </View>
                    </ScrollView>

                </View>
            )
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        let that = this;
        let id = this.props.id;
        let url = 'http://www.76676.com/index.php?m=member&c=index&a=public_newsapi_detail&newsid=' + id
        let urlList = 'http://www.76676.com/index.php?m=member&c=index&a=public_newsapi_type&type=' + this.props.type + '&page=1&pagenum=' + 8
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                dataSource: responseData,
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

        fetch(urlList)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                loading2: false,
                                dataSource2: responseData,
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
    headerContainer: {
        justifyContent: 'center',
        marginTop: 23,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    container: {
        padding: 15,
    },
    title: {
        fontSize: 17,
        lineHeight: 24,
        color: '#000',
    },
    updata: {
        paddingTop: 15,
        color: '#999'
    },
    conText: {
        marginBottom: 10,
        lineHeight: 24,
        color: '#333'
    },
    xiangguan: {
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        marginTop: 20,
        paddingTop: 15,
    },
    xiangguanTitle: {
        paddingBottom: 15,
        color: '#999',
        fontSize: 15,
    }
})