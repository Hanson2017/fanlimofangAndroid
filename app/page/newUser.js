import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, ScrollView ,TouchableOpacity} from 'react-native';

import Api from '../util/api'
import Theme from '../util/theme'
import Util from '../util/util'

export default class Help extends Component {
    render() {
        return (
            <View style={styles.content}>
                <ScrollView>
                    <Text style={[styles.textH1,{marginBottom:8,}]}>平台介绍：</Text>
                    <Text style={styles.textP}>返利魔方是基于网贷行业的返利平台，</Text>
                    <Text style={styles.textP}>通过返利魔方进行网贷投资你可以获得额外返利。</Text>
                    <Text style={[styles.textH1,{marginTop:15,marginBottom:8}]}>网址，微信公众号及APP下载：</Text>
                    <View style={Theme.flexDrow}>
                        <Text style={styles.textP}>PC版网址： </Text>
                        <TouchableOpacity onPress={Util.Linked.bind(this,'http://www.fanlimofang.com')}>
                            <Text style={{lineHeight:24,color:Theme.color}} >http://www.fanlimofang.com</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Theme.flexDrow}>
                        <Text style={styles.textP}>移动版网址： </Text>
                        <TouchableOpacity onPress={Util.Linked.bind(this,'http://m.fanlimofang.com')}>
                            <Text style={{lineHeight:24,color:Theme.color}} >http://m.fanlimofang.com</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textP}>微信公众号：网贷魔方  （因“返利”被禁止申请，所以叫网贷魔方）</Text>
                    <Text style={styles.textP}>APP下载请扫描二维码  （安卓版及IOS版均有效）：</Text>
                    <Text style={[styles.textH1,{marginBottom:8,marginTop:10,}]}>返利魔方APP</Text>
                    <Image source={{ uri: Api.domain + '/images/app/appdown.png' }} style={{ width: 180, height: 180 }} />
                    <Text style={[styles.textH1,{marginTop:15,marginBottom:8}]}>新手操作流程：</Text>
                    <Text style={styles.textP}>先说2个关键点：</Text>
                    <Text style={styles.textP}>1.首投活动<Text style={Theme.red}>必须从直达链接跳转到平台进行注册，必须！ </Text>（复投不需要）；</Text>
                    <Text style={styles.textP}>2.严格按照页面里描述的投资规则进行投资，完事了记得在页面下方回帖，留下正确信息以及支付宝帐号，这样才能拿到返利。</Text>
                    <Text style={styles.textP}>下面以投哪网活动为例来讲解具体操作过程。</Text>
                    <Text style={[styles.textH2,{marginTop:5,marginBottom:5}]}>一、首先从返利魔方APP首页或项目列表页找到你感兴趣的活动，</Text>
                    <Text style={styles.textP}>如下图所示：</Text>
                    <Image resizeMode={'contain'} source={{ uri: Api.domain + '/images/app/p1.png' }} style={{ width: 270, height: 136 }} />
                    <Text style={styles.textP}>在上图你可以看到该平台的风控评分和风险等级等信息。</Text>
                    <Text style={[styles.textH2,{marginTop:5,marginBottom:5}]}>二、如果你对该活动有兴趣，</Text>
                    <Text style={[styles.textP,styles.blod]}>A、点击进入详情页面进行查看，如下图所示：</Text>
                    <Image  resizeMode={'contain'}  source={{ uri: Api.domain + '/images/app/p2.png' }} style={{ width: 270, height: 425 }} />
                    <Text style={styles.textP}>在上图中我们可以了解到关于活动的大体情况描述，</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>1代表</Text> 方案序号</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>2代表</Text> 每个方案投资是投资多长时间的项目；（投资项目的期限可以比方案要求的更长，但不能短于方案要求的期限。）</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>3代表</Text> 投资哪一类项目；</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>4代表</Text> 需要充值多少；（可以充值更多，也可以分次充值，但不能少于方案要求的金额。）</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>5代表</Text> 返利魔方给多少返利；（<Text style={Theme.red}>这里就是通过魔方投资可以多得到的钱了</Text>。）</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>6代表</Text> 总收益是多少；</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>7代表</Text> 页面最下面是“直达链接”，需要点击“直达链接”到平台去注册才行哦。</Text>
                    <Text style={[styles.textP,styles.blod]}>B、点击某个方案下面的“点击查看详情”按钮，可以很清楚得看到投资方案的信息。</Text>
                    <Text style={styles.textP}>如下图所示：</Text>
                    <Image resizeMode={'contain'}  source={{ uri: Api.domain + '/images/app/p3.png' }} style={{ width: 270, height: 434 }} />
                    <Text style={styles.textP}><Text style={styles.blod}>1代表</Text>  投资收益换算成年化收益率是多少</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>2代表</Text>  假设平台发生意外导致拿不回本金，返利魔方对本金的赔付比例。（示例这里写的是0.30%，意思就是假设你参加方案一，投资10500，赔付给你本金的0.3%，也就是31.5元）。</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>3代表</Text>  魔方赔付的保障期限，比如你2007年1月1日参加活动进行投资，假设保障期是35天，那么在2007年2月4日之前如果因网贷平台原因导致无法拿回本金，则魔方会对该笔投资进行赔付。赔付兑现时间为从返利魔方确认该平台无法兑付起，1个月内按照赔付率进行赔付。（该示例中：如果在2月4日之前网贷平台状态为正常，但用户自己未提现，则魔方不予赔付）。</Text>
                    <Text style={styles.textP}><Text style={styles.blod}>4代表</Text>  投资流程，这里是对投资过程做详细说明，请根据投资流程指引进行投资。
                        （投资流程说明一般分为几部分内容，
                        一是通过直达链接进入网站注册，请千万记住，其他渠道注册的无法获得返利哦；
                        二是一些普通操作，比如实名认证，绑定银行卡之类的；
                        三是充值多少钱，准备投多长期限的哪种类型的项目；
                        四是具体是怎么投，怎么用红包之类的，写得很清楚；
                        五是投资明细和收益明细是怎么样的；
                        六是返利魔方的返现周期是怎么样的。）
                        </Text>
                    <Text style={styles.textP}><Text style={styles.blod}>5代表</Text>  特别说明，这里是对该活动一些特别需要注意的地方进行描述，请仔细阅读。</Text>
                    <Text style={styles.textH2}>三 、投资完记得在活动页面回帖</Text>
                     <Image resizeMode={'contain'}  source={{ uri: Api.domain + '/images/app/p4.png' }} style={{ width: 270, height: 345 }} />
                    <Text style={styles.textP}>如上图所示，投资完记得在页面下面跟帖留下投资相关信息，包括你的支付宝帐号。</Text>
                    <Text style={styles.textP}>必须有支付宝帐号，返利魔方工作人员才能把返利支付给你）</Text>
                    <Text style={styles.textP}>建议回帖前先用QQ一键登录 或者 微信一键登录功能登录返利魔方，这样后续可以在个人中心里查看返利进度。</Text>
                    <View style={styles.textSm}>                   
                        <Text style={styles.textP}>免责声明：</Text>
                        <Text style={styles.textP}>返利魔方仅为信息平台，本身不吸纳用户资金。活动平台不保证100%安全，如出现意外情况（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），如该活动享受魔方保障，返利魔方仅在该活动注明的保障期内（自用户通过返利魔方投资之日起计算保障期限），按照赔付率对部分本金进行赔付。</Text>
                     </View>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    content:{
        backgroundColor:'#fff',
        flex:1,
        padding:15,
    },
    textH1:{
        fontWeight:'bold',
        color:'#000',
        fontSize:16,
    },
    textH2:{
        fontWeight:'bold',
        color:'#000',
        fontSize:14,
        lineHeight:22,
    },
    textP:{
        color:'#666',
        lineHeight:24,
    },
    blod:{
       fontWeight:'bold',  
       color:'#444'
    },
    textSm:{
        marginTop:15,
        paddingTop:10,
        borderTopWidth:1,
        borderColor:'#f2f2f2',
    }
})