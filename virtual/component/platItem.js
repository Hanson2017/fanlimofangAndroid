import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';

import Detail from '../page/platDetail'
import Util from '../../app/util/util'

export default class Item extends Component {
    render() {
        let data = this.props.data;
        let ScoreTp = this.props.ScoreTp;
        let index = this.props.index;
        return (
            <TouchableOpacity style={styles.list} activeOpacity={0.6}
                onPress={this.goDetail.bind(this,data.id_dlp,data.plat_name)}
            >
                <View style={{flex:1,flexDirection: 'row'}}>
                    <Text style={[styles.TdID, styles.Td]}>{parseInt(index) + 1}</Text>
                    <Text style={[styles.TdPlat, styles.Td]}>{data.plat_name+''}</Text>
                    <Text style={[styles.TdScore, styles.Td]}>{data[ScoreTp]+''}</Text>
                </View>
                <View>
                    <Text style={[styles.Td,{width:30}]}>></Text>
                </View>


            </TouchableOpacity>
        )
    }
    goDetail(id,platName) {
        this.props.navigator.push({
            component: Detail,
            params: {
                id: id,
                platName:platName
            }
        })
    }
}
const styles = StyleSheet.create({
    list: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
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