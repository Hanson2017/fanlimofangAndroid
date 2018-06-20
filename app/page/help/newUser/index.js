import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity } from 'react-native';

import Api from '../../../util/api';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Title from '../../../component/title';

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: [true, true],
            ref: false,
            fixed: null
        };
    }
    render() {
        return (
            <ScrollView style={styles.newUserContainer} onScroll={this._onScroll.bind(this)}>
                <Title title={'平台介绍'} />
                <View style={styles.newUserBox}>
                    <Text style={styles.newUserText}>
                        返利魔方是基于网贷行业的返利平台，通过返利魔方进行网贷出借您可以获得额外返利。
                    </Text>
                </View>
                <View style={styles.mt15}>
                    <Title title={'网址、微信公众号及APP下载'} />
                    <View style={styles.newUserBox}>
                        <View style={Theme.flexDrow}>
                            <Text style={styles.newUserText}>PC版网址：  </Text>
                            <TouchableOpacity onPress={Util.Linked.bind(this, 'http://www.fanlimofang.com')}>
                                <Text style={[styles.newUserText,styles.red]}>http://www.fanlimofang.com</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Theme.flexDrow}>
                            <Text style={styles.newUserText}>移动版网址：</Text>
                            <TouchableOpacity onPress={Util.Linked.bind(this, 'http://m.fanlimofang.com')}>
                                <Text style={[styles.newUserText,styles.red]}>http://m.fanlimofang.com</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.newUserText}>微信公众号：魔方活动  （因“返利”被禁止申请，所以叫魔方活动）</Text>
                        <Text style={styles.newUserText}>APP下载请扫描二维码  （安卓版及IOS版均有效）：</Text>
                        <View style={[styles.imgContainer,styles.mt5,{width:126}]}>
                            <Image source={{ uri: Api.domain + '/images/app/appdown.png' }} style={[styles.img,{ width: 120, height: 120 }]} />
                        </View>

                    </View>
                </View>
                <View style={styles.mt15}>
                    <Title title={'新手操作流程'} />
                    <View style={styles.newUserBox}>

                        <Text style={styles.newUserText}>先说2个关键点：</Text>
                        <Text style={styles.newUserText}>① 首次出借活动<Text style={styles.red}>必须从直达链接跳转到平台进行注册，必须！ </Text><Text style={styles.blod}>（多次出借不需要）</Text>；</Text>
                        <Text style={styles.newUserText}>② 严格按照页面里描述的出借规则进行出借，完事了记得在页面下方回帖，留下正确信息以及支付宝帐号，这样才能拿到返利。</Text>
                        <View style={[styles.imgContainer,styles.mt5,{}]}>
                            <Image resizeMode={'contain'} source={{ uri: Api.domainM + '/images/newser/pp.png' }} style={{height: (Theme.screenWidth-30)*1.473 }} />
                        </View>    
                        <View style={styles.bdr}>
                            <Text style={styles.newUserText}>下面以桔子理财活动为例来讲解具体操作过程。</Text>
                        </View>


                    </View>
                </View>
                <View style={[styles.mt10, styles.newUserBox]}>
                    <Text style={[styles.newUserText,styles.newUserh5]}>一、首先从返利魔方APP首页或项目列表页找到您感兴趣的活动，如下图所示：</Text>
                    <View style={[styles.imgContainer,styles.mt5]}>
                        <Image resizeMode={'contain'} source={{ uri: Api.domainM + '/images/newser/p1.png' }} style={{ height: (Theme.screenWidth-30)*0.392 }} />
                    </View>
                    <Text style={styles.newUserText}>（在上图您可以看到该平台的风控评分和风险等级等信息。）</Text>
                </View>
                <View style={[styles.mt10, styles.newUserBox]}>
                        <Text style={[styles.newUserText,styles.newUserh5]}>二、如果您对该活动有兴趣，</Text>
                        <Text style={[styles.newUserText,styles.newUserh6]}>A、点击进入详情页面进行查看，如下图所示：</Text>
                        <View style={[styles.imgContainer,styles.mt5]}>
                            <Image resizeMode={'contain'} source={{ uri: Api.domainM + '/images/newser/p2a.png' }} style={{height: (Theme.screenWidth-30)*0.399 }} />
                        </View>
                        <Text style={styles.newUserText}>在上图中我们可以了解到关于活动的大体情况描述:</Text>
                        <TouchableOpacity style={styles.more} onPress={() => {
                            this.state.isHidden[0] = !this.state.isHidden[0];
                            this.setState({
                                ref: !this.state.ref
                            })
                        }}>
                            <Text style={styles.moreText}>点开查看详情</Text>
                            <View style={[styles.moreIcon,!this.state.isHidden[0]?styles.moreIconOpen:null]}></View>
                        </TouchableOpacity>
                        {
                            this.state.isHidden[0] ?
                                null
                                :
                                <View style={[styles.mt10]}>
                                    <Text style={styles.newUserText}><Text style={styles.blod}>1代表</Text> 方案序号</Text>
                                    <Text style={styles.newUserText}><Text style={styles.blod}>2代表</Text> 每个方案出借是出借多长时间的项目；（出借项目的期限可以比方案要求的更长，但不能短于方案要求的期限。）</Text>
                                    <Text style={styles.newUserText}><Text style={styles.blod}>3代表</Text> 出借哪一类项目；</Text>
                                    <Text style={styles.newUserText}><Text style={styles.blod}>4代表</Text> 需要充值多少；（可以充值更多，也可以分次充值，但不能少于方案要求的金额。）</Text>
                                    <Text style={styles.newUserText}><Text style={styles.blod}>5代表</Text> 返利魔方给多少返利；（<Text style={styles.red}>这里就是通过魔方出借可以多得到的钱了</Text>。）</Text>
                                    <Text style={styles.newUserText}><Text style={styles.blod}>6代表</Text> 总回报是多少；</Text>
                                    <Text style={styles.newUserText}><Text style={styles.blod}>7代表</Text> 查看此方案更多详细资料</Text>
                                </View>
                        }
                        <View style={styles.bdr}>
                            <Text style={[styles.newUserText,styles.newUserh6]}>B、点击某个方案下面的“点击查看详情”按钮，可以很清楚得看到出借方案的信息。</Text>
                            <Text style={styles.newUserText}>如下图所示：</Text>
                            <View style={[styles.imgContainer,styles.mt5]}>
                                <Image resizeMode={'contain'} source={{ uri: Api.domainM + '/images/newser/p2b.png' }} style={{height: (Theme.screenWidth-30)*1.5453 }} />
                            </View>

                             <TouchableOpacity style={styles.more} onPress={() => {
                                this.state.isHidden[1] = !this.state.isHidden[1];
                                this.setState({
                                    ref: !this.state.ref
                                })
                            }}>
                                <Text style={styles.moreText}>点开查看详情</Text>
                                <View style={[styles.moreIcon,!this.state.isHidden[1]?styles.moreIconOpen:null]}></View>
                            </TouchableOpacity>
                            {
                                this.state.isHidden[1] ?
                                    null
                                    :
                                    <View style={[styles.mt10]}>
                                         <Text style={styles.newUserText}><Text style={styles.blod}>1代表</Text>  出借回报换算成年化收益率是多少</Text>
                                        <Text style={styles.newUserText}><Text style={styles.blod}>2代表</Text>  假设平台发生意外导致拿不回本金，返利魔方对本金的赔付比例。（示例这里写的是0.30%，意思就是假设您参加方案一，出借10500，赔付给您本金的0.3%，也就是31.5元）。</Text>
                                        <Text style={styles.newUserText}><Text style={styles.blod}>3代表</Text>  魔方赔付的保障期限，比如您2007年1月1日参加活动进行出借，假设保障期是35天，那么在2007年2月4日之前如果因网贷平台原因导致无法拿回本金，则魔方会对该笔出借进行赔付。赔付兑现时间为从返利魔方确认该平台无法兑付起，1个月内按照赔付率进行赔付。（该示例中：如果在2月4日之前网贷平台状态为正常，但用户自己未提现，则魔方不予赔付）。</Text>
                                        <Text style={styles.newUserText}><Text style={styles.blod}>4代表</Text>  出借流程，这里是对出借过程做详细说明，请根据出借流程指引进行出借。
                                            （出借流程说明一般分为几部分内容，
                                            一是通过直达链接进入网站注册，请千万记住，其他渠道注册的无法获得返利哦；
                                            二是一些普通操作，比如实名认证，绑定银行卡之类的；
                                            三是充值多少钱，准备投多长期限的哪种类型的项目；
                                            四是具体是怎么投，怎么用红包之类的，写得很清楚；
                                            五是出借明细和收益明细是怎么样的；
                                            六是返利魔方的返现周期是怎么样的。）
                                        </Text>
                                        <Text style={styles.newUserText}><Text style={styles.blod}>5代表</Text>  特别说明，这里是对该活动一些特别需要注意的地方进行描述，请仔细阅读。</Text>    
                                        <Text style={styles.newUserText}><Text style={styles.blod}>6代表</Text>  页面最下面是“直达链接”，需要点击“直达链接”到平台去注册才行哦。</Text>                                   
                                    </View>
                            }
                        </View>
                </View>
                <View style={[styles.mt10, styles.newUserBox]}>
                    <Text style={[styles.newUserText,styles.newUserh5]}>三 、出借完记得在活动页面回帖</Text>
                    <View style={[styles.imgContainer,styles.mt5]}>
                        <Image resizeMode={'contain'} source={{ uri: Api.domainM + '/images/newser/p3.png' }} style={{ height: (Theme.screenWidth-30)*0.768 }} />
                    </View>
                    <Text style={styles.newUserText}>如上图所示，出借完记得在页面下面跟帖留下出借相关信息，包括您的支付宝帐号。</Text>
                    <Text style={styles.newUserText}>必须有支付宝帐号，返利魔方工作人员才能把返利支付给您。</Text>
                    <Text style={styles.newUserText}>建议回帖前先用QQ一键登录 或者 微信一键登录功能登录返利魔方，这样后续可以在个人中心里查看返利进度。</Text>
                </View>

               <View style={[styles.mt15]}>
                    <Title title={'免责声明'} />
                    <View style={[styles.newUserBox]}>
                        <Text style={styles.newUserText}>
                            返利魔方仅为信息平台，本身不吸纳用户资金。活动平台不保证100%安全，如出现意外情况（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），如该活动享受魔方保障，返利魔方仅在该活动注明的保障期内（自用户通过返利魔方出借之日起计算保障期限），按照赔付率对部分本金进行赔付。
                        </Text>
                    </View>
                </View>
            </ScrollView>
        
        )
    }
    _onScroll(e){
        let that=this.props.that;
        var offsetY = e.nativeEvent.contentOffset.y;

        if (offsetY > 0) {
            that.setState({
                isFixed: true
            })
        }
        else {
            that.setState({
                isFixed: false
            })
        }
    }
}

const styles = StyleSheet.create({
    mt15:{
        marginTop:15,
    },
    mt10:{
        marginTop:10,
    },
    mt5:{
        marginTop:5,
    },
    blod:{
        fontWeight:'bold',
    },
    red:{
        color:'#E62344',
    },
    newUserh5:{
        paddingTop:5,
        paddingBottom:5,
        fontWeight:'bold',
        color:'#434343',
    },
    newUserh6:{
        paddingTop:5,
        paddingBottom:5,
        fontWeight:'bold',
        color:'#E62344',
    },
    imgContainer:{
        padding:1.5,
        borderWidth:1.5,
        borderColor:'#d3d3d3',
    },
    img:{
        width:Theme.screenWidth-30
    },
    bdr:{
        paddingTop:15,
        marginTop:15,
        borderTopWidth:1,
        borderTopColor:'#f2f2f2',
    },
    newUserBox:{
        padding:12,
        paddingBottom:10,
        backgroundColor: '#fff',
    },
    newUserText:{
        fontSize:11,
        color:'#666',
        lineHeight:18,
    },
    more:{
        marginTop:12,
        marginBottom:12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreText:{
        color:'#999',
        fontSize:11,
    },
    moreIcon:{
        marginTop:10,
        width:20,
        height:2,
        backgroundColor:'#c9c9c9',
    },
    moreIconOpen:{
        backgroundColor:'#e62344',
    }
})