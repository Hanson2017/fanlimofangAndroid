import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Title from '../../../component/title';

export default class ReplyNote extends Component {
    render() {
        const data = this.props.data;
        let postinfo = '';
        let comment_field = data.comment_field;

        if (comment_field.indexOf('c_userid') >= 0) {
            postinfo += '注册ID，';
        }
        if (comment_field.indexOf('c_phone') >= 0) {
            postinfo += '注册手机号码，';
        }
        if (comment_field.indexOf('c_username') >= 0) {
            postinfo += '真实姓名（实名认证），';
        }
        postinfo += '所选择方案，';

        if (comment_field.indexOf('investdate') >= 0) {
            postinfo += '出借日期，';
        }
        if (comment_field.indexOf('img_invest') >= 0) {
            postinfo += '出借截图，';
        }
        postinfo += '支付宝帐号';
        return (
            <View style={[styles.container]}>
                <Title title={'返利回帖'} />
                <View style={styles.mainzeContainer}>
                    <Text style={styles.text}>回帖说明：</Text>
                    <Text style={styles.text}>为了您能顺利获取返利，请务必填写完整以下信息。</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    mainzeContainer: {
        padding: 12,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 11,
        color: '#999',
        lineHeight: 18,
    }
})