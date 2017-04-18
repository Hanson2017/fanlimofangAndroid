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
        let special=this.props.special;
        let process;
        let investprocess = Util.delHtmlTag(plans.investprocess);
        let protectlv=0;

        if (plans.invest>0) {
            protectlv = (plans.protectamount / plans.invest * 100).toFixed(2)
        }
        if (code == ! '') {
            process = (
                <View style={styles.row}>
                    <Text style={{fontSize:11}}>1、通过</Text>
                    <TouchableOpacity onPress={Util.Linked.bind(this, siteUrl)}>
                        <Text style={{fontSize:11}}>直达链接</Text>

                    </TouchableOpacity>
                    <Text style={{fontSize:11}}>进入网站并注册，邀请码填写 {this.props.code+''}</Text>
                </View>
            )
        }
        else {
            process = (
                <View style={styles.row}>
                    <Text style={{color:'#666',fontSize:11}}>1、通过</Text>
                    <TouchableOpacity onPress={Util.Linked.bind(this, siteUrl)}>
                        <Text style={{color:'red',fontSize:11}}>直达链接</Text>
                    </TouchableOpacity>
                    <Text style={{color:'#666',fontSize:11}}>进入网站并注册</Text>
                </View>
            )
        }

        return (
            <View style={styles.content}>

                <View style={styles.hd}>
                    <Text style={styles.hdText}>第{periods +''}期</Text>
                    <Text style={[styles.hdText,{marginLeft:20}]}>方案{plans.number+''}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{fontSize:11,color:'#666'}}>方案{plans.number+''}换算成年化收益是<Text style={{color:'red',paddingLeft:5}}>{plans.rate+''}%</Text></Text>
                </View>
               
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>赔付率:</Text>
                    <Text style={styles.rowCon}>{protectlv+''}%（{plans.protectamount+''}元）</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>保障时间:</Text>
                    <Text style={styles.rowCon}>{plans.protectday+''}天（从投资当日起算）</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{color:'#666',fontSize:11}}>投资流程：</Text>
                </View>
                {process}
                <View>
                    <Text style={{color:'#666',fontSize:11,lineHeight:24}}>{investprocess}</Text>
                </View>
                {special?
                <View style={styles.special}>
                    <Text style={{color:'#666',fontSize:11,lineHeight:24}}>特别说明</Text>
                    <Text style={{color:'red',fontSize:11,lineHeight:24}}>{special}</Text>
                </View>
                :null
                }
                
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1,
        marginBottom:10,
    },
    hdText: {
        color: '#666',
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        height: 24,
        alignItems: 'center',
    },
    rowLabel: {
        width: 60,
        color:'#666',
        fontSize:11,
    },
    rowCon:{
        color:'#666',
        fontSize:11,
    },
    special:{
        marginTop:15,
        borderTopColor:'#f2f2f2',
        borderTopWidth:1
    }
})