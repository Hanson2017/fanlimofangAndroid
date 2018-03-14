import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Util from '../util/util';

function transformF(data) {
    var d = data.replace(/[\d\D]/g, '*');
    return d;
}

export default class Comment extends Component {
    render() {
        let comment = this.props.comment;
        let commentField = this.props.commentField;

        let addtime = Util.formatDate(comment.addtime)
        let investdate = Util.formatDate(comment.investdate)

        let commentInfo;

        let c_userid;
        let c_phone;
        let c_username;
        let alipayid;
        let username;

        if (signState && signState.r_id > 0 && signState.r_id == comment.memberid && comment.status != 3) {
            c_userid = comment.c_userid;
            c_phone = comment.c_phone;
            c_username = comment.c_username;
            alipayid = comment.alipayid;
            username = comment.username;
        }
        else {
            c_userid = transformF(comment.c_userid)
            c_phone = transformF(comment.c_phone)
            c_username = transformF(comment.c_username)
            alipayid = transformF(comment.alipayid)
            username = transformF(comment.username)
        }

        if (commentField.indexOf('c_userid') >= 0) {
            var useridView = (
                <Text style={styles.commentListBdText}>注册ID：{c_userid}</Text>
            )
        }
        if (commentField.indexOf('c_phone') >= 0) {
            var phoneView = (
                <Text style={styles.commentListBdText}>注册手机号码：{c_phone}</Text>
            )
        }
        if (commentField.indexOf('c_username') >= 0) {
            var realnameView = (
                <Text style={styles.commentListBdText}>真实姓名：{c_username}</Text>
            )
        }
        if (commentField.indexOf('investdate') >= 0) {
            var investdateView = (
                <Text style={styles.commentListBdText}>出借日期：{investdate}</Text>
            )
        }

        return (
            <View style={styles.commentList}>
                <View style={styles.commentListHd}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text numberOfLines={1} style={[styles.commentListHdText, styles.commentListHdFlow]}>{parseInt(this.props.commentlNum)}楼</Text>
                        <Text numberOfLines={1} style={[styles.commentListHdText, styles.commentListHdName]}>{username}</Text>
                        {
                            signState && signState.r_id > 0 && signState.r_id == comment.memberid ?
                                null
                                :
                                <Text style={styles.commentListHdText}>(回帖已加密)</Text>
                        }
                    </View>
                    <View><Text style={styles.commentListHdText}>{addtime}</Text></View>
                </View>
                <View style={styles.commentListBd}>
                    {useridView}
                    {phoneView}
                    {realnameView}
                    <Text style={styles.commentListBdText}>方案：{comment.plannumber + ''}(第{comment.periodnumber + ''}期)</Text>
                    {investdateView}
                    <Text style={styles.commentListBdText}>支付宝账号：{alipayid}</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    commentList: {
        borderWidth: 1,
        borderColor: '#e4e4e4',
        marginBottom: 15,
    },
    commentListHd: {
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        height: 32,
        backgroundColor: '#d7d7d7',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentListHdText: {
        color: '#fff',
    },
    commentListHdFlow: {
        width: 60,
    },
    commentListHdName: {
        width: 60,
    },
    commentListBd: {
        padding: 8,
    },
    commentListBdLine: {
        lineHeight: 25,
    },
    commentListBdText: {
        color: '#666',
        lineHeight: 25,
    },
})

