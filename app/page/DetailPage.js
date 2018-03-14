import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, DeviceEventEmitter, RefreshControl, ActivityIndicator, Linking, Platform } from 'react-native';

import Api from '../util/api';
import Util from '../util/util';
import Theme from '../util/theme';

import Loading from '../component/Loading';
import Plans from '../component/DetailPagePlans';
import Comment from '../component/Comment'
import Icon from 'react-native-vector-icons/Icomoon';
import Common from '../component/Common'
import Tags from '../component/Tags'
import Title from '../component/Title';
import CommentForm from '../component/CommentForm'
import BottomBtn from '../component/BottomBtn'
import CommentsPage from '../page/Comments'

import NewSelect from '../component/NewSelect';
import NewCalendar from '../component/NewCalendar';

var dismissKeyboard = require('dismissKeyboard');

class Header extends Component {
    render() {
        let uri = this.props.uri;
        return (
            <View style={[styles.headerContainer, Platform.OS == 'android' ? { marginTop: 0 } : null]}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={this.goBack.bind(this)}
                >
                    <Icon name='back' size={26} color={'#a9a9a9'} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    {
                        uri != null ?
                            <Image source={{ uri: uri }} style={{ width: 80, height: 24 }} />
                            :
                            null
                    }
                </View>
            </View>
        )
    }
    goBack() {
        this.props.navigator.pop();
    }
}

var DetailPage = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
            isRefreshing: false,
            dataSource: null,
            commentData: null,
            commentlNum: 0,
            siteUrl: null,
            isHidden: [],
            ref: false,
            contentHeight: 0,  //ScrollView滚动容器高度
            moveH: 0   //ScrollView滑动的距离,
        }
    },
    render: function () {

        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Header navigator={this.props.navigator} uri={null} />
                    <Loading />
                </View>
            )
        }
        else {
            let that = this;
            let acinfo = this.state.dataSource.acinfo;
            let plans = this.state.dataSource.plans;
            let commentData = this.state.commentData;
            let siteUrl = this.state.siteUrl;
            let uri = Api.domain + acinfo.plat.platlogo;

            let risklevel = Common.risklevel(acinfo.plat.risklevel)  //风险等级
            let investType = Common.investType(acinfo.activity.isrepeat)  //投资类型

            // 是否全网最高,是否魔方保障,返利日期
            let ishighest = Common.isTag(acinfo.activity.ishighest, '全网最高', styles);
            let isprotect = Common.isTag(acinfo.activity.isprotect, '魔方保障', styles);

            let repayText = acinfo.repayday == '当日返现' ? acinfo.repayday : acinfo.repayday + '返现'
            let repaydays = Common.isTag(acinfo.repayday, repayText, styles);

            // 是否结束
            let isRisk;
            switch (acinfo.activity.status) {
                case 1:
                    if (acinfo.activity.atype == 1) {
                        isRisk =
                            (
                                <View style={[Theme.flexDrow, { marginTop: 10 }]}>
                                    <Tags tagsName={'风控分:' + acinfo.plat.riskscore} styles={styles} />
                                    {
                                        acinfo.plat.noshowrisk != 1 ? 
                                        <Tags tagsName={risklevel} styles={styles} />
                                        :
                                        null
                                    }
                                </View>
                            )
                    }
                    else if (acinfo.activity.atype == 2) {
                        isRisk =
                            (
                                <View style={[Theme.flexDrow, { marginTop: 10 }]}>
                                    <Tags tagsName={'黄金类产品'} styles={styles} />
                                </View>
                            )
                    }
                    else if (acinfo.activity.atype == 3) {
                        isRisk =
                            (
                                <View style={[Theme.flexDrow, { marginTop: 10 }]}>
                                    <Tags tagsName={'基金类产品'} styles={styles} />
                                </View>
                            )
                    }
                    else if (acinfo.activity.atype == 4) {
                        isRisk =
                            (
                                <View style={[Theme.flexDrow, { marginTop: 10 }]}>
                                    <Tags tagsName={'固收类产品'} styles={styles} />
                                </View>
                            )
                    }
                    else {
                        isRisk =
                            (
                                <View style={[Theme.flexDrow, { marginTop: 10 }]}>
                                    <Tags tagsName={'其他类产品'} styles={styles} />
                                </View>
                            )
                    }
                    break;

                case 2:
                    isRisk = null
                    break;
            }

            // 关键字
            let keywords = Util.formatSymbol(acinfo.activity.keywords);
            keywords = keywords.map((keyword, i) => {
                return (
                    <Text key={i} style={{ color: '#999', marginRight: 4, fontSize: 11 }}>{keyword}</Text>
                )
            })



            //推荐理由 
            let reasons = Util.delHtmlTag(acinfo.activity.reasons);

            let dataSource = this.state.dataSource;
            let code = acinfo.activity.invitation_code;
            let periods = acinfo.activity.number

            // 方案列表
            let planList = plans.map((plan, i) => {
                let planDetaile = that.state.isHidden[i].hidden ? null : (
                    <Plans plans={dataSource.plans[i]} siteUrl={siteUrl} code={code} investType={acinfo.activity.isrepeat} periods={periods} atype={acinfo.activity.atype} special={acinfo.activity.special} />
                )
                // 总收益
                let rebateStr = null;
                if (acinfo.activity.atype == 1 || acinfo.activity.atype == 4) {
                    rebateStr = plan.rebate + ''
                }
                else {
                    rebateStr = '浮动';
                }
                return (
                    <View style={styles.planList} key={i}>
                        <View style={[Theme.flexDrow]}>
                            <View style={[styles.planTd1, styles.planTd]}><Text style={styles.planTdText}>{plan.number + ''}</Text></View>
                            <View style={[styles.planTd2, styles.planTd]}><Text style={styles.planTdText}>{plan.termdescription}</Text></View>
                            <View style={[styles.planTd3, styles.planTd]}><Text style={styles.planTdText}>{plan.projects}</Text></View>
                            <View style={[styles.planTd4, styles.planTd]}><Text style={styles.planTdText}>≥ {plan.invest + ''}</Text></View>
                            <View style={[styles.planTd5, styles.planTd]}><Text style={[styles.planTdText, Theme.red]}>{plan.mfrebate + ''}</Text></View>
                            <View style={[styles.planTd]}>
                                <Text style={[styles.planTdText]}>
                                    {rebateStr}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.planMore}
                            onPress={() => {
                                that.state.isHidden[i].hidden = !that.state.isHidden[i].hidden;
                                if (!that.state.isHidden[i].hidden) {
                                    that.state.isHidden[i].moreText = '点击收起'
                                }
                                else {
                                    that.state.isHidden[i].moreText = '点击查看详情'
                                }
                                that.setState({
                                    ref: !that.state.ref
                                })

                            }}>
                            <Text style={styles.planMoreText}>{that.state.isHidden[i].moreText}</Text>
                        </TouchableOpacity>
                        {planDetaile}
                    </View>
                )
            })

            // 回帖内容
            let postinfo = '';
            let comment_field = acinfo.activity.comment_field;

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

            // 评论
            let comments = commentData.map((comment, i) => {
                return <Comment index={i} commentlNum={this.state.commentlNum - i} comment={comment} commentField={comment_field} />
            })

            let moreComment = null;
            if (commentData.length >= 20) {
                moreComment = (
                    <TouchableOpacity style={styles.moreComment} activeOpacity={0.7} onPress={this.goCommentsPage.bind(this)}>
                        <Text style={styles.moreCommentText}>查看更多评论</Text>
                    </TouchableOpacity>
                )
            }

            // 方案
            let selectList = []
            for (let i = 0; i < plans.length; i++) {
                selectList.push({ number: plans[i].number, value: '方案' + plans[i].number })
            }


            return (
                <View style={styles.container}>
                    <Header navigator={this.props.navigator} uri={uri} />

                    <NewSelect ref="select" options={selectList} />
                    <NewCalendar ref="Calendar" />
                    <View style={{ flex: 1 }}>
                        <ScrollView ref={'scroll'}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.setState({
                                    contentHeight: parseInt(contentHeight)
                                })
                            }}
                            onScrollEndDrag={(e) => {
                                this.setState({
                                    moveH: e.nativeEvent.contentOffset.y
                                })

                            }}>
                            <View onStartShouldSetResponderCapture={(e) => { dismissKeyboard(); }}>
                                <View style={[styles.detailBox, { borderTopWidth: 0 }]}>
                                    <View style={Theme.flexDrow}>
                                        <Tags tagsName={investType} styles={styles} />
                                        {ishighest}
                                        {isprotect}
                                        {repaydays}
                                    </View>
                                    {isRisk}
                                    <View style={[Theme.flexBtrow, { marginTop: 15 }]}>
                                        <View><Text style={{ color: '#999', fontSize: 11 }}>已有{acinfo.commentnum + ''}人参加</Text></View>
                                        <View style={Theme.flexDrow}>
                                            <Text style={{ color: '#999', fontSize: 11 }}>关键字：</Text>
                                            {keywords}
                                        </View>
                                    </View>
                                </View>
                                {/*top end*/}
                                <Title title={'出借方案'} />
                                <View>
                                    <View style={[Theme.flexDrow, { backgroundColor: '#fff' }]}>
                                        <View style={[styles.planTd1, styles.planTd]}><Text style={styles.planTdText}>方案</Text></View>
                                        <View style={[styles.planTd2, styles.planTd]}><Text style={styles.planTdText}>服务期限</Text></View>
                                        <View style={[styles.planTd3, styles.planTd]}><Text style={styles.planTdText}>出借项目</Text></View>
                                        <View style={[styles.planTd4, styles.planTd]}><Text style={styles.planTdText}>充值金额</Text></View>
                                        <View style={[styles.planTd5, styles.planTd]}><Text style={styles.planTdText}>魔方返利</Text></View>
                                        <View style={[styles.planTd]}><Text style={styles.planTdText}>总回报</Text></View>
                                    </View>
                                    {planList}
                                </View>

                                <View style={[styles.detailBox, Theme.mt10]}>
                                    <View>
                                        <Text style={styles.dtText}>寻求帮助：</Text>
                                    </View>
                                    <View style={styles.ddView}>
                                        <View style={styles.qqOnlineWP}>
                                            {
                                                dataSource.qqservice.split(',').map((text, i) => {
                                                    return (
                                                        <TouchableOpacity activeOpacity={0.7} style={styles.qqOnline} onPress={Util.Linked.bind(this, 'mqqwpa://im/chat?chat_type=wpa&uin=' + text + '&version=1&src_type=web&web_src=fanllimofang.com')}>
                                                            <Text style={styles.qqOnlineText}>QQ在线客服{i + 1}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }

                                        </View>
                                        {
                                            dataSource.qqgroup != '' ?
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        let key = dataSource.qqgroup_key;
                                                        let linkUrl = "mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D" + key;
                                                        Util.Linked(linkUrl)
                                                    }}
                                                >
                                                    <Text style={styles.qqgroup}>返利魔方{dataSource.qqgroup_num + ''}群：{dataSource.qqgroup + ''}</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                        }

                                    </View>
                                </View>
                                <View style={[styles.detailBox, Theme.mt10]}>
                                    <View>
                                        <Text style={styles.dtText}>免责声明：</Text>
                                    </View>
                                    <View style={styles.ddView}>
                                        <Text style={styles.ddText}>
                                            返利魔方仅为信息平台，本身不吸纳用户资金。活动平台不保证100%安全，如出现意外情况（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），如该活动享受魔方保障，返利魔方仅在该活动注明的保障期内（自用户通过返利魔方出借之日起计算保障期限），按照赔付率对部分本金进行赔付。除此以外，返利魔方不承担任何责任。
                                    </Text>
                                    </View>
                                </View>

                                {
                                    acinfo.activity.iscomment == 0 ?
                                        < View style={[styles.detailBox, Theme.mt10, { marginBottom: 10, }]}>
                                            <Text style={styles.ddText}>本活动仅做优惠信息推送，无需回复投资信息。</Text>
                                        </View>
                                        :
                                        <View>
                                            {acinfo.activity.img_att_h5 != null && acinfo.activity.img_att_h5 != ''  ?

                                                <View style={[styles.detailBox, Theme.mt10]}>
                                                    <View style={styles.ddView}>
                                                        <Image resizeMode={'center'} source={{ uri: Api.domain + acinfo.activity.img_att_h5 }} style={{ width: Theme.screenWidth - 24, height: Theme.screenWidth - 24 }} />

                                                    </View>
                                                </View>
                                                : null
                                            }
                                            <View style={[styles.detailBox, Theme.mt10]}>
                                                <View>
                                                    <Text style={styles.dtText}>回帖说明：</Text>
                                                </View>
                                                <View style={styles.ddView}>
                                                    <Text style={styles.ddText}>{postinfo}</Text>
                                                </View>
                                            </View>
                                            
                                            {acinfo.activity.comment_pich5 ?

                                                <View style={[styles.detailBox, Theme.mt10]}>
                                                    <View>
                                                        <Text style={styles.dtText}>回帖注册ID从哪儿找？</Text>
                                                    </View>
                                                    <View style={styles.ddView}>
                                                        <Image resizeMode={'center'} source={{ uri: Api.domain + acinfo.activity.comment_pich5 }} style={{ width: Theme.screenWidth - 24, height: Theme.screenWidth - 24 }} />

                                                    </View>
                                                </View>
                                                : null
                                            }
                                            {acinfo.activity.status == 2 ? null :
                                                < View style={[styles.detailBox, Theme.mt10]}>
                                                    <CommentForm
                                                        ref='CommentForm'
                                                        dataSource={{ comment_field: comment_field, activityid: acinfo.activity.id, periodnumber: acinfo.activity.number, img_invest: acinfo.activity.img_invest }}
                                                        plans={plans}
                                                        navigator={this.props.navigator}
                                                        updataComment={this.getCommentData.bind(this)}
                                                        KeyboardAvoidingViewData={{
                                                            contentHeight: this.state.contentHeight,  //ScrollView滚动容器高度
                                                            moveH: this.state.moveH,   //ScrollView滑动的距离
                                                            scrollViewDom: this.refs.scroll
                                                        }}
                                                        isShowSelect={this.isShowSelect.bind(this)}
                                                        isShowCalendar={this.isShowCalendar.bind(this)}
                                                    />
                                                </View>
                                            }
                                            <View style={[styles.detailBox, Theme.mt10]}>
                                                {comments}
                                                {moreComment}
                                            </View>
                                        </View>
                                }
                            </View>
                        </ScrollView>
                    </View>
                    <BottomBtn status={acinfo.activity.status} disabled={acinfo.activity.status == 1 ? false : true} value={acinfo.activity.status == 1 ? '直达链接' : '已结束'} onPress={Util.Linked.bind(this, siteUrl)} />
                </View >
            )
        }
    },
    isShowSelect: function (selectNo, i) {
        this.refs.select.show(selectNo, i)
    },
    isShowCalendar: function () {
        this.refs.Calendar.show()
    },
    componentDidMount: function () {
        let that = this;
        this.getData();
        this.getCommentData();
    },
    getData: function () {
        let that = this;
        let url = Api.detail + '?activityid=' + this.props.id;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {

                            let activity = responseData.data.acinfo.activity
                            let siteUrls = activity.siteurl.split(',')
                            let index = Math.floor((Math.random() * siteUrls.length));
                            let siteUrl = siteUrls[index];
                            let siteUrlH5 = activity.siteurl_h5;
                            let acSiteUrl = siteUrlH5 ? siteUrlH5 : siteUrl;

                            let isHiddenNew = [];
                            for (let i = 0; i < responseData.data.plans.length; i++) {
                                isHiddenNew.push({ hidden: true, moreText: '点击查看详情' })
                            }
                            that.setState({
                                isRefreshing: false,
                                loading: false,
                                dataSource: responseData.data,
                                siteUrl: acSiteUrl,
                                isHidden: isHiddenNew
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
    },
    getCommentData: function () {
        let that = this;
        let memberid = 0;
        if (signState) {
            memberid = signState.r_id;
        }
        let url = Api.comment + '?activityid=' + this.props.id + '&page=1&pagesize=20' + '&memberid=' + memberid;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                commentData: responseData.data,
                                commentlNum: responseData.totalNum
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
    },
    goPlans: function (i) {
        let dataSource = this.state.dataSource;
        let plan = dataSource.plans[i];
        let code = dataSource.acinfo.activity.invitation_code;
        let siteUrl = this.state.siteUrl;
        let name = dataSource.acinfo.plat.platname;
        let periods = dataSource.acinfo.activity.number
        this.props.navigator.push({
            component: Plans,
            params: {
                plans: plan,
                code: code,
                siteUrl: siteUrl,
                name: name,
                periods: periods
            }
        })
    },
    goCommentsPage: function () {
        let comment_field = this.state.dataSource.acinfo.activity.comment_field
        this.props.navigator.push({
            component: CommentsPage,
            params: {
                activityid: this.props.id,
                comment_field: comment_field
            }
        })
    }

})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    headerContainer: {
        marginTop: 23,
        height: 46,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backBtn: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        paddingRight: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#666',
        fontSize: 16,
    },
    detailBox: {
        padding: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e4e4e4',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e4',
    },
    tags: {
        marginRight: 8,
        paddingLeft: 4,
        paddingRight: 4,
        borderWidth: 1,
        borderColor: Theme.color,
        borderRadius: 4,
        height: 25,
        minWidth: 65,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagsText: {
        color: Theme.color,
        fontSize: 11,
    },
    planList: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e4e4e4',
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e4',
    },
    planTd: {
        height: 40,
        justifyContent: 'center',
    },
    planTdText: {
        color: '#666',
        fontSize: 11
    },
    planTd1: {
        paddingLeft: 10,
        width: 40,

    },
    planTd2: {
        width: 78,
    },
    planTd3: {
        width: 88,
    },
    planTd4: {
        width: 64,
    },
    planTd5: {
        width: 52,
    },
    planMore: {
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
    },
    planMoreText: {
        fontSize: 11,
        color: '#999',
    },
    dtText: {
        color: '#666',
        fontSize: 14,
    },
    ddView: {
        marginTop: 8
    },
    ddText: {
        color: '#999',
        lineHeight: 20,
        fontSize: 13
    },
    moreComment: {
        marginTop: 5,
        marginBottom: 5,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreCommentText: {
        color: '#34a0e7',
        fontSize: 15,
    },
    qqOnlineWP: {
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    qqOnline: {
        marginRight: 10,
        width: (Theme.screenWidth - 55) / 3,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D8D8D8',
        borderRadius: 5,
    },
    qqOnlineText: {
        color: '#888',
        fontSize: 13,
    },
    qqgroup: {
        paddingTop: 15,
        color: '#666',
    }
})

module.exports = DetailPage;
