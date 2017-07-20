import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';

import Detail from '../page/detail'
import Util from '../../app/util/util'

export default class Item extends Component {
    render() {
        let data=this.props.data;        
        return (
            <TouchableOpacity style={styles.list} activeOpacity={0.6}
               onPress={this.goDetail.bind(this,data.id,this.props.type)}
            >
                <View style={styles.listL}>
                    <Image source={{ uri: data.img_2}} style={{ width: 100, height: 75 }} />
                </View>
                <View style={styles.listR}>
                    <Text style={styles.listTitle}>{data.title}</Text>
                    <Text style={styles.listRead}>
                     {Util.setDate(new Date(data.inputtime*1000))}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    goDetail(id,type) {
        this.props.navigator.push({
            component: Detail,
            params: {
                id: id,
                type:type
            }
        })
    }
}
const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        height: 75,
        marginBottom: 16,
    },
    listL: {
        marginRight: 15,
        width: 100,
    },
    listR: {
        flex: 1,
        justifyContent: 'space-between',
    },
    listTitle: {
        lineHeight: 20,
        color: '#3d464d',
        fontSize: 14,
        fontWeight: 'bold',
    },
    listRead: {
        color: '#999',
        fontSize: 13,
    }
})