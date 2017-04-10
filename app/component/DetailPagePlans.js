import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Linking } from 'react-native';

import Theme from '../util/theme';
import Util from '../util/util';
import Header from '../component/Header';

export default class Plans extends Component {
    render() {
        let plans = this.props.plans;
        let code = this.props.code;
        let siteUrl = this.props.siteUrl;
        let periods = this.props.periods;
        let process;
        let investprocess = Util.delHtmlTag(plans.investprocess);
        let protectlv=0;

        if (plans.invest>0) {
            protectlv = (plans.protectamount / plans.invest * 100).toFixed(2)
        }
        if (code == ! '') {
            process = (
                <View style={styles.row}>
                    <Text>1、通过</Text>
                    <TouchableOpacity onPress={Util.Linked.bind(this, siteUrl)}>
                        <Text>直达链接</Text>

                    </TouchableOpacity>
                    <Text>进入网站并注册，邀请码填写 {this.props.code}</Text>
                </View>
            )
        }
        else {
            process = (
                <View style={styles.row}>
                    <Text style={{color:'#666'}}>1、通过</Text>
                    <TouchableOpacity onPress={Util.Linked.bind(this, siteUrl)}>
                        <Text style={{color:'red'}}>直达链接</Text>
                    </TouchableOpacity>
                    <Text style={{color:'#666'}}>进入网站并注册</Text>
                </View>
            )
        }

        return (
            <View style={styles.content}>

                <View style={styles.hd}>
                    <Text style={styles.hdText}>第{periods}期</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>总收益:</Text>
                    <Text style={styles.rowCon}>{plans.rebate}元</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>年化:</Text>
                    <Text style={styles.rowCon}>{plans.rate}%</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>赔付率:</Text>
                    <Text style={styles.rowCon}>{protectlv}%（{plans.protectamount}元）</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>保障时间:</Text>
                    <Text style={styles.rowCon}>{plans.protectday}天（从投资当天结算）</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{color:'#666'}}>投资流程：</Text>
                </View>
                {process}
                <View>
                    <Text style={{color:'#666',lineHeight:24}}>{investprocess}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:20,
    },
    hd: {
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hdText: {
        color: '#666',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
    },
    rowLabel: {
        width: 80,
        color:'#666'
    },
    rowCon:{
        color:'#666'
    },
})