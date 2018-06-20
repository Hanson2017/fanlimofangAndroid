import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';

function transformF(data) {
    var d = data.replace(/[\d\D]/g, '*');
    return d;
}

export default class Comment extends Component {
    render() {
        const { comment, commentField } = this.props;

        let addtime = Util.formatDate(comment.addtime)
        let investdate = Util.formatDate(comment.investdate)
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
                    {
                        commentField.indexOf('c_userid') >= 0 ?
                            <View style={styles.commentListBdLi}><Text style={styles.commentListBdText} numberOfLines={1}>注册ID：{c_userid}</Text></View>
                            :
                            null
                    }
                    {
                        commentField.indexOf('c_phone') >= 0 ?
                            <View style={styles.commentListBdLi}><Text style={styles.commentListBdText}>注册手机号码：{c_phone}</Text></View>
                            :
                            null
                    }
                    {
                        commentField.indexOf('c_username') >= 0 ?
                            <View style={styles.commentListBdLi}><Text style={styles.commentListBdText}>真实姓名：{c_username}</Text></View>
                            :
                            null
                    }

                    <View style={styles.commentListBdLi}><Text style={styles.commentListBdText}>方案：{comment.plannumber + ''}(第{comment.periodnumber + ''}期)</Text></View>
                    {
                        commentField.indexOf('investdate') >= 0 ?
                            <View style={styles.commentListBdLi}><Text style={styles.commentListBdText}>出借日期：{investdate}</Text></View>
                            :
                            null
                    }
                    <View style={styles.commentListBdLi}><Text style={styles.commentListBdText} numberOfLines={1}>支付宝账号：{alipayid}</Text></View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    commentList: {
        marginBottom: 15,
    },
    commentListHd: {
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        height: 26,
        backgroundColor: '#e62344',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    commentListHdText: {
        color: '#fff',
        fontSize: 11,
    },
    commentListHdFlow: {
        width: 60,
    },
    commentListHdName: {
        width: 80,
    },
    commentListBd: {
        padding: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: '#f2f2f2',
    },
    commentListBdLi:{
        width:(Theme.screenWidth-40)/2
    },
    commentListBdLine: {
        lineHeight: 25,
    },
    commentListBdText: {
        color: '#666',
        fontSize: 11,
        lineHeight: 25,
    },
})

