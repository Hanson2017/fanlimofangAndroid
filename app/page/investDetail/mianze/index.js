import React, { Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import Title from '../../../component/title';

export default class Mianze extends Component {
    render() {

        return (
            <View style={[styles.container]}>
                 <Title title={'免责声明'} />
                 <View style={styles.mainzeContainer}>
                    <Text style={styles.text}>1、返利魔方仅为信息平台，本身不触碰、不吸纳用户资金。 </Text>
                    <Text style={styles.text}>2、所有网贷平台都具备不同程度的风险性，请确保自身有一定风险承受能力再参与活动。 </Text>
                    <Text style={styles.text}>3、活动平台不保证100%安全，如出现意外情况（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），返利魔方不承担任何责任。 </Text>
                    <Text style={styles.text}>4、返利魔方首投活动具有魔方保障功能，大部分活动赔付率在0.1%至1%之间，如在保障期之内平台出问题导致拿不回本金，可通过魔方保障获得极少量的赔付，赔付金额杯水车薪，仅起安慰作用。具体的赔付率在下方方案中有标明，请仔细阅读。 </Text>
                    <Text style={styles.text}>举例：某用户通过返利魔方，在2018年1月1日参与活动投资某平台1万元，项目期限为30天。该方案的赔付率假设为0.1%，保障期假设为31天，如果平台在2018年2月1日之前出事导致拿不回本金，可通过魔方保障获得赔付，因为赔付率为0.1%，所以赔付金额仅有10元。 </Text>
                    <Text style={styles.text}>5、再次强调，网贷投资不是银行存款，具备一定风险性。如出现意外情况导致无法拿回本金，返利魔方不承担任何责任。 </Text>
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