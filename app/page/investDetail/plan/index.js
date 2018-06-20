import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Title from '../../../component/title';

export default class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: [],
            ref: false,
            siteUrl: '',
        };
    }
    componentWillMount() {
        const activity = this.props.data.acinfo.activity
        const siteUrls = activity.siteurl.split(',')
        const index = Math.floor((Math.random() * siteUrls.length));
        const siteUrl = siteUrls[index];
        const siteUrlH5 = activity.siteurl_h5;
        const acSiteUrl = siteUrlH5 ? siteUrlH5 : siteUrl;

        const isHiddenNew = [];
        for (let i = 0; i < this.props.data.plans.length; i++) {
            isHiddenNew.push({ hidden: true, moreText: '点击查看详情' })
        }
        this.setState({
            isHidden: isHiddenNew,
            siteUrl: acSiteUrl
        })
    }
    render() {
        const data = this.props.data;
        const plans = data.plans;
        const acinfo = data.acinfo;

        return (
            <View style={styles.planContainer}>
                <Title title={'出借方案'} iconBgC={acinfo.activity.isrepeat == 0 ?'#67cbdb':'#FF9900'} />
                {
                    plans.map((item, i) => {
                        return (
                            <View style={styles.planList} key={i}>
                                <View style={styles.planHd}>
                                    <View style={[styles.planTd1, styles.planTd]}><Text style={styles.planTdText}>方案</Text></View>
                                    <View style={[styles.planTd2, styles.planTd]}><Text style={styles.planTdText}>服务期限</Text></View>
                                    <View style={[styles.planTd3, styles.planTd]}><Text style={styles.planTdText}>出借项目</Text></View>
                                    <View style={[styles.planTd4, styles.planTd]}><Text style={styles.planTdText}>充值金额</Text></View>
                                    <View style={[styles.planTd5, styles.planTd]}><Text style={styles.planTdText}>魔方返利</Text></View>
                                    <View style={[styles.planTd]}><Text style={styles.planTdText}>总回报</Text></View>
                                </View>
                                <View style={styles.planBd}>
                                    <View style={[styles.planTd1, styles.planTd]}><Text style={styles.planTdText}>{item.number + ''}</Text></View>
                                    <View style={[styles.planTd2, styles.planTd]}><Text style={styles.planTdText}>{item.termdescription}</Text></View>
                                    <View style={[styles.planTd3, styles.planTd]}><Text style={styles.planTdText}>{item.projects}</Text></View>
                                    <View style={[styles.planTd4, styles.planTd]}><Text style={styles.planTdText}>≥ {item.invest + ''}</Text></View>
                                    <View style={[styles.planTd5, styles.planTd]}><Text style={[styles.planTdText, Theme.red]}>{item.mfrebate + ''}</Text></View>
                                    <View style={[styles.planTd]}>
                                        <Text style={[styles.planTdText]}>
                                            {
                                                acinfo.activity.atype == 1 || acinfo.activity.atype == 4 ?
                                                    item.rebate + ''
                                                    :
                                                    '浮动'
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.planMore}
                                    onPress={() => {
                                        const isHidden = this.state.isHidden;
                                        isHidden[i].hidden = !isHidden[i].hidden;
                                        if (!isHidden[i].hidden) {
                                            isHidden[i].moreText = '点击收起'
                                        }
                                        else {
                                            isHidden[i].moreText = '点击查看详情'
                                        }
                                        this.setState({
                                            ref: !this.state.ref
                                        })

                                    }}>
                                    <Text style={styles.planMoreText}>
                                        {this.state.isHidden[i].moreText}
                                    </Text>
                                    <View style={[styles.moreIcon, this.state.isHidden[i].hidden ? null : styles.moreIconOpen]}></View>
                                </TouchableOpacity>

                                {
                                    !this.state.isHidden[i].hidden ?
                                        <View style={styles.planContent}>
                                            <View style={styles.planContentHd}>
                                                <View><Text style={styles.planContentHdText}>第{acinfo.activity.number + ''}期</Text></View>
                                                <View style={styles.planContentHdNum}><Text style={styles.planContentHdText}>方案{item.number + ''}</Text></View>
                                            </View>
                                            <View style={styles.planContentBd}>
                                                <Text style={styles.text}>
                                                    换算成年化收益率：
                                            <Text style={[styles.text, Theme.red]}>
                                                        {
                                                            acinfo.activity.atype == 1 || acinfo.activity.atype == 4 ?
                                                                item.rate + '%'
                                                                :
                                                                '浮动'
                                                        }
                                                    </Text>
                                                </Text>
                                                <Text style={styles.text}>
                                                    赔付率：
                                             {
                                                        item.invest > 0 ?
                                                            (item.protectamount / item.invest * 100).toFixed(2) + '%'
                                                            :
                                                            0
                                                    }
                                                    ({item.protectamount + ''}元)
                                        </Text>
                                                <Text style={styles.text}>保障时间：{item.protectday + ''}天（从出借当日起算）</Text>
                                            </View>
                                            <View style={styles.planLiuc}>
                                                <View style={styles.planTit}><Text style={styles.planTitText}>出借流程</Text></View>

                                                <View style={{ flexDirection: 'row', }}>
                                                    <Text style={styles.text}>1、通过</Text>
                                                    {
                                                        acinfo.activity.status == 1 ?
                                                        <TouchableOpacity onPress={Util.Linked.bind(this, this.state.siteUrl)}>
                                                            <Text style={[styles.text, Theme.red]}>直达链接</Text>
                                                        </TouchableOpacity>
                                                        :                                                       
                                                        <Text style={[styles.text, Theme.red]}>直达链接</Text>
                                                    }
                                                    
                                                    {
                                                        acinfo.activity.invitation_code != '' ?
                                                            <Text style={styles.text}>
                                                                进入网站并注册，邀请码填写<Text style={[styles.text, Theme.red]}>{acinfo.activity.invitation_code}</Text>
                                                            </Text>
                                                            :
                                                            <Text style={styles.text}>
                                                                进入网站{acinfo.activity.isrepeat != 1 ? '并注册' : null}
                                                            </Text>
                                                    }
                                                </View>
                                                {
                                                    item.investprocess.split('<br />').map((text, i) => {
                                                        let newText = Util.delHtmlTag(text)
                                                        return (
                                                            <Text style={styles.text}>{newText}</Text>
                                                        )
                                                    })
                                                }
                                            </View>
                                            {
                                                acinfo.activity.special ?
                                                    <View style={styles.planSpecial}>
                                                        <View style={styles.planTit}><Text style={styles.planTitText}>特别说明</Text></View>
                                                        <Text style={[styles.text, Theme.red]}>{Util.delHtmlTag(acinfo.activity.special)}</Text>
                                                    </View>
                                                    :
                                                    null
                                            }
                                        </View>
                                        :
                                        null
                                }

                            </View>
                        )

                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    planContainer: {
        marginTop: 15,
    },
    text: {
        lineHeight: 20,
        fontSize: 11,
        color: '#666',
    },
    planTit: {
        marginBottom: 8,
        width: 50,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e62344',
        borderRadius: 3,
    },
    planTitText: {
        fontSize: 11,
        color: '#fff',
    },
    planList: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    planHd: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    planBd: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    planTd: {
        justifyContent: 'center',
    },
    planTdText: {
        color: '#666',
        fontSize: 11
    },
    planTd1: {
        paddingRight:2,
        width: 45,
        alignItems: 'center',
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
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    planMoreText: {
        fontSize: 11,
        color: '#999',
    },
    moreIcon: {
        marginTop: 13,
        width: 20,
        height: 2,
        backgroundColor: '#c9c9c9',
    },
    moreIconOpen: {
        backgroundColor: '#e62344',
    },
    planContent: {
        paddingBottom: 15,
        paddingLeft: 12,
        paddingRight: 12,
    },
    planContentHd: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    planContentHdText: {
        color: '#666',
        fontSize: 12,
        fontWeight: 'bold',
    },
    planContentHdNum: {
        paddingLeft: 10,
        marginLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: '#e4e4e4',
    },
    planContentBd: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 12,
        marginBottom: 12,
    },
    planSpecial: {
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        paddingTop: 10,
        marginTop: 10,
    }
})