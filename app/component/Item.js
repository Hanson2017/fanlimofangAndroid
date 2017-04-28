import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
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
                            <View style={[Theme.flexDrow, { marginTop: 10 }]}>
                                <Tags tagsName={'风控分:' + data.plat.riskscore} styles={styles} />
                                <Tags tagsName={risklevel} styles={styles} />

                            </View>
                        )
                }
                else if (data.activity.atype == 2) {
                    isRisk =
                        (
                            <View style={[Theme.flexDrow, { marginTop: 10 }]}>
                                <Tags tagsName={'黄金类产品'} styles={styles} />
                            </View>
                        )
                }
                else if (data.activity.atype == 3 || data.activity.atype == 4) {
                    isRisk =
                        (
                            <View style={[Theme.flexDrow, { marginTop: 10 }]}>
                                <Tags tagsName={'基金类产品'} styles={styles} />
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
                joinText = '已结束'
                btnJoinOver = styles.btnJoinOver
                isRisk = null
                break;
        }

        // 是否全网最高,是否魔方保障,返利日期
        let ishighest = Common.isTag(data.activity.ishighest, '全网最高', styles);
        let isprotect = Common.isTag(data.activity.isprotect, '魔方保障', styles);

        let repayText = data.repayday == '当日返现' ? data.repayday : data.repayday.replace('个','') + '返'
        let repaydays = Common.isTag(data.repayday, repayText, styles);

        let rateStr=null;
        if(data.activity.atype == 1 || data.activity.atype == 4){
            rateStr=data.activity.rate + '%'
        }
        else{
            rateStr='浮动';
        }
         

        //关键字
        let keywords = Util.formatSymbol(data.activity.keywords);
        keywords = keywords.map((keyword, i) => {
            return (
                <View style={{ marginTop: 5 }} key={i}><Text style={{ color: '#bdbaba', fontSize: 11 }}>{keyword}</Text></View>
            )
        })

        return (
            <TouchableOpacity onPress={this.goDetail.bind(this, data.activity.id, data.plat.platname)} style={styles.item} activeOpacity={0.8}>
                <View style={{ flex: 1 }}>
                    <View style={Theme.flexDrow}>
                        <View>
                            <View style={[Theme.flexDrow, { marginRight: 6 }]}>
                                <Image source={{ uri: uri }} style={{ width: 70, height: 28 }} />
                                <View style={[styles.type, { marginTop: -8, marginLeft: 3 }]}>
                                    <Text style={styles.typeText}>{investType}</Text>
                                </View>
                            </View>
                            <View>
                                {keywords}
                            </View>
                        </View>

                        <View>
                            <View style={Theme.flexDrow}>
                                {ishighest}
                                {isprotect}
                                {repaydays}
                            </View>
                            {isRisk}
                        </View>
                    </View>

                    <View style={[Theme.flexDrow, Theme.mt15]}>
                        <View style={{ width: 120 }}>
                            <View><Text style={Theme.c666}>投{data.activity.invest + ''}获得</Text></View>
                            <View style={Theme.mt5}><Text style={[Theme.red, styles.font17]}>{data.activity.rebate + ''}</Text></View>
                        </View>
                        <View style={{ width: 110 }}>
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
                    <View style={[styles.btnJoin, btnJoinOver, Theme.mt10]}>
                        <Text style={styles.btnJoinText}>{joinText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 10,
    },
    type: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        height: 20,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeText: {
        color: '#999',
        fontSize: 12,
    },
    tags: {
        marginRight: 6,
        paddingLeft: 4,
        paddingRight: 4,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Theme.color,
        height: 25,
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagsText: {
        color: Theme.color,
        fontSize: 11,
    },

    font17: {
        fontSize: 17,
    },

    mrl25: {
        marginLeft: 25,
        marginRight: 25,
    },
    btnJoin: {
        flex: 1,
        height: 40,
        backgroundColor: Theme.color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnJoinOver: {
        backgroundColor: '#ccc',
    },
    btnJoinText: {
        fontSize: 18,
        color: '#fff',
    },

})

