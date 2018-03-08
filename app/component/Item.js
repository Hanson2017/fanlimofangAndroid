import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, Platform } from 'react-native';
import Theme from '../util/theme';
import Api from '../util/api';
import Util from '../util/util';
import DetailPage from '../page/DetailPage'
import Common from '../component/Common'
import Tags from '../component/Tags'

export default class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let data = this.props.data;
        let uri = Api.domain + data.plat.platlogo;

        let joinText;
        let isRisk;

        let risklevel = Common.risklevel(data.plat.risklevel)  //风险等级
        let investType = Common.investType(data.activity.isrepeat)  //投资类型
        // 是否结束
        switch (data.activity.status) {
            case 1:
                joinText = '我要参加'
                btnJoinOver = null
                if (data.activity.atype == 1) {
                    isRisk =
                        (
                            <View style={[Theme.flexDrow]}>
                                <Tags tagsName={'风控分:' + data.plat.riskscore} styles={styles} />
                                {
                                    data.plat.noshowrisk != 1 ? 
                                    <Tags tagsName={risklevel} styles={styles} />
                                    :
                                    null
                                }
                            </View>
                        )
                }
                else if (data.activity.atype == 2) {
                    isRisk =
                        (
                            <Tags tagsName={'黄金类产品'} styles={styles} />
                        )
                }
                else if (data.activity.atype == 3) {
                    isRisk =
                        (
                            <Tags tagsName={'基金类产品'} styles={styles} />
                        )
                }
                else if (data.activity.atype == 4) {
                    isRisk =
                        (
                            <Tags tagsName={'固收类产品'} styles={styles} />
                        )
                }
                else {
                    isRisk =
                        (
                            <Tags tagsName={'其他类产品'} styles={styles} />
                        )
                }
                break;

            case 2:
                joinText = '已结束'
                btnJoinOver = styles.btnJoinOver
                isRisk = null
                break;
        }

        // 是否全网最高,是否魔方保障,返利日期
        let ishighest = Common.isTag(data.activity.ishighest, '全网最高', styles);
        let isprotect = Common.isTag(data.activity.isprotect, '魔方保障', styles);

        let repayText = data.repayday == '当日返现' ? data.repayday : data.repayday.replace('个', '') + '返'
        let repaydays = Common.isTag(data.repayday, repayText, styles);

        let rateStr = null;
        if (data.activity.atype == 1 || data.activity.atype == 4) {
            rateStr = data.activity.rate + '%'
        }
        else {
            rateStr = '浮动';
        }


        //关键字
        let keywords = Util.formatSymbol(data.activity.keywords);

        return (
            <View>

                <TouchableOpacity onPress={this.goDetail.bind(this, data.activity.id, data.plat.platname)} style={styles.item} activeOpacity={0.8}>
                    <View style={[Theme.flexDrow, styles.listHd, Platform.OS == 'android' ? { paddingTop: 5 } : null]}>
                        <Image source={{ uri: uri }} style={{ width: 70, height: 28 }} />
                        <View style={[Theme.flexDrow, { marginTop: -5, marginLeft: 8 }]}>
                            <View style={styles.listHdType}><Text style={styles.listHdTypeText}>{investType}</Text></View>
                            {
                                keywords.map((keyword, i) => {
                                    return (
                                        <View style={styles.listHdType}><Text style={styles.listHdTypeText}>{keyword}</Text></View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={[Theme.flexDrow, Theme.mt15, { justifyContent: 'space-between', }]}>
                        <View style={[Theme.flexDrow]}>
                            <View style={{ width: (Theme.screenWidth - 10) / 3 }}>
                                <View><Text style={Theme.c666}>投{data.activity.invest + ''}获得</Text></View>
                                <View style={Theme.mt5}><Text style={[Theme.red, styles.font17]}>{data.activity.rebate + ''}</Text></View>
                            </View>
                            <View style={{ width: Theme.screenWidth / 3 }}>
                                <View><Text style={Theme.c666}>相当于年化</Text></View>
                                <View style={Theme.mt5}>
                                    <Text style={[Theme.red, styles.font17]}>
                                        {rateStr}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View><Text style={Theme.c666}>已参加</Text></View>
                                <View style={Theme.mt5}><Text style={[styles.font17, { color: '#999' }]}>{data.commentnum + ''}人</Text></View>
                            </View>
                        </View>

                    </View>
                    <View style={[styles.listFt, Theme.flexDrow, {}]}>
                        {isRisk}
                        {ishighest}
                        {isprotect}
                        {repaydays}
                    </View>
                    {
                        data.activity.status == 2 ?
                            <View style={styles.maskView}>
                                <View style={styles.mask}></View>
                                <View style={styles.maskText}><Text style={styles.maskTextT}>已结束</Text></View>
                            </View>
                            :
                            null
                    }
                </TouchableOpacity>
            </View>
        )
    }
    goDetail(id, name) {

        this.props.navigator.push({
            component: DetailPage,
            params: {
                id: id,
                name: name,
                backName: this.props.backName
            }
        })
    }
}

const styles = StyleSheet.create({
    item: {
        height: 174,
        position: 'relative',
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    maskView: {
        width: Theme.screenWidth,
        height: 174,
        position: 'absolute',
    },
    mask: {
        width: Theme.screenWidth,
        height: 174,
        position: 'absolute',
        backgroundColor: 'rgba(52, 52, 52, 0.5)'
    },
    maskText: {
        width: Theme.screenWidth,
        height: 174,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0)',
    },
    maskTextT: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold',
    },
    tags: {
        marginRight: 5,
        paddingLeft: 3,
        paddingRight: 3,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#cdcdcd',
        height: 24,
        minWidth: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagsText: {
        color: '#ccc',
        fontSize: 11,
    },

    font17: {
        fontSize: 17,
    },

    mrl25: {
        marginLeft: 25,
        marginRight: 25,
    },

    // new
    listHd: {
        flex: 1,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    listHdType: {
        marginRight: 8,
        paddingLeft: 4,
        paddingRight: 4,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: Theme.color,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listHdTypeText: {
        color: Theme.color,
        fontSize: 12,
    },
    listbdBtnWp: {
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: '#f2f2f2',
    },
    btnJoinNew: {
        width: 70,
        height: 30,
        backgroundColor: Theme.color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    btnJoinNewText: {
        fontSize: 14,
        color: '#fff',
    },
    listFt: {
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    }
})

