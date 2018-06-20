import React, { Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import Title from '../../../component/title';

export default class Mianze extends Component {
    render() {

        return (
            <View style={[styles.container]}>
                 <Title title={'免责声明'} />
                 <View style={styles.mainzeContainer}>
                     <Text style={styles.text}>返利魔方仅为信息平台，本身不吸纳用户资金。活动平台不保证100%安全，如出现意外情况（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），如该活动享受魔方保障，返利魔方仅在该活动注明的保障期内（自用户通过返利魔方出借之日起计算保障期限），按照赔付率对部分本金进行赔付。除此以外，返利魔方不承担任何责任。</Text>
                 </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop:15,
    },
    mainzeContainer:{
        padding: 12,
        backgroundColor: '#fff',
    },
    text:{
        fontSize:11,
        color:'#999',
        lineHeight:18,
    }
})