import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, Platform } from 'react-native';
import Api from '../../util/api';
import Util from '../../util/util';
import Theme from '../../util/theme';
import InvestDetail from '../../page/investDetail/index';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }
    render() {
        let dateDiff = this.props.dateDiff;
        let data = this.props.data;
        let activity = data.activity;
        let plat = data.plat;
        let uri = Api.domain + data.plat.platlogo;
        return (
            <View>

                <TouchableOpacity onPress={this.goDetail.bind(this)} style={styles.item} activeOpacity={0.8}>
                    <View style={[styles.listHd, Platform.OS == 'android' ? { paddingTop: 5 } : null]}>
                        <View style={styles.listHdLeft}>
                            <Image source={{ uri: uri }} style={{ width: 70, height: 28 }} />
                            <View style={styles.listHdTags}>
                                {
                                    activity.isrepeat === 0 ?
                                        <View style={[styles.tags, styles.tagsHd, styles.tagsFirst]}><Text style={[styles.tagsText, styles.tagsTextHd, styles.tagsTextFirst]}>首次出借</Text></View>
                                        :
                                        <View style={[styles.tags, styles.tagsHd, styles.tagsRepeat]}><Text style={[styles.tagsText, styles.tagsTextHd, styles.tagsTextRepeat]}>多次出借</Text></View>
                                }

                                {
                                    Util.formatSymbol(activity.keywords).map((keyword, i) => {
                                        return (
                                            <View key={i} style={[styles.tags, styles.tagsHd]}><Text style={[styles.tagsText, styles.tagsTextHd]}>{keyword}</Text></View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        {
                            activity.isend === 1 && activity.status !== 2 ?
                                <View style={styles.countdown}>
                                    <Text style={styles.countdownText}>即将结束</Text>
                                    <Text style={styles.countdownDateText}>{Util.countTime(activity.endtime,dateDiff)}</Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={styles.listBd}>
                        <View style={styles.listBdli}>
                            <View><Text style={styles.listBdliText}>出借{activity.invest + ''}获得</Text></View>
                            <View style={Theme.mt5}><Text style={styles.listBdliTextNum}>{activity.rebate + ''}</Text></View>
                        </View>
                        <View style={styles.listBdli}>
                            <View><Text style={styles.listBdliText}>相当于年化</Text></View>
                            <View style={Theme.mt5}>
                                <Text style={styles.listBdliTextNum}>
                                    {
                                        activity.atype == 1 || activity.atype == 4 ?
                                            activity.rate + '%'
                                            :
                                            '浮动'
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listBdli}>
                            <View><Text style={styles.listBdliText}>已参加</Text></View>
                            <View style={Theme.mt5}><Text style={[styles.listBdliTextNum, { color: '#666' }]}>{data.commentnum + ''}人</Text></View>
                        </View>
                    </View>
                    <View style={[styles.listFt]}>
                        {
                            activity.status == 1 ?
                                activity.atype == 1 ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={[styles.tags]}><Text style={[styles.tagsText]}>风控分:{plat.riskscore + ''}</Text></View>
                                        {
                                            plat.noshowrisk !== 1 ?
                                                <View style={[styles.tags]}><Text style={[styles.tagsText]}>{Util.risklevel(plat.risklevel)}</Text></View>
                                                :
                                                null
                                        }

                                    </View>
                                    :
                                    <View style={[styles.tags]}><Text style={[styles.tagsText]}>{Util.inType(activity.atype)}</Text></View>
                                :
                                null
                        }
                        {
                            activity.ishighest == 1 ?
                                <View style={[styles.tags]}><Text style={[styles.tagsText]}>全网最高</Text></View>
                                :
                                null
                        }
                        {
                            activity.isprotect == 1 ?
                                <View style={[styles.tags]}><Text style={[styles.tagsText]}>魔方保障</Text></View>
                                :
                                null
                        }
                        {
                            <View style={[styles.tags]}>
                                <Text style={[styles.tagsText]}>
                                    {data.repayday == '当日返现' ? '当日返现' : data.repayday.replace('个', '') + '返'}
                                </Text>
                            </View>
                        }
                    </View>
                    {
                        activity.status == 2 ?
                            <View style={styles.maskView}>
                                <View style={styles.mask}></View>
                                <View style={styles.maskTextContainer}></View>
                                <View style={styles.maskText}>
                                    <Text style={styles.maskTextT}>已结束</Text>
                                    <Text style={[styles.maskTextT, Theme.mt5, { fontSize: 11 }]}>查看历史详情</Text>
                                </View>
                            </View>
                            :
                            null
                    }
                </TouchableOpacity>
            </View>
        )
    }
    goDetail() {
        const { data, navigator } = this.props;
        const id = data.activity.id;
        const name = data.plat.platname;
        navigator.push({
            component: InvestDetail,
            params: {
                id: id,
                name: name,
            }
        })
    }
    tick() {
        this.setState((prevState) => ({
            seconds: prevState.seconds + 1
        }));
    }
    componentDidMount() {
        var activity = this.props.data.activity;
        if (activity.isend === 1) {
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    componentWillUnmount() {
        var activity = this.props.data.activity;
        if (activity.isend === 1) {
            clearInterval(this.interval);
        }

    }
}

const styles = StyleSheet.create({
    tags: {
        marginRight: 5,
        paddingLeft: 4,
        paddingRight: 4,
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: '#c9c9c9',
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagsText: {
        color: '#c9c9c9',
        fontSize: 10,

    },
    item: {
        position: 'relative',
        flex: 1,
        padding: 12,
        backgroundColor: '#fff',
        marginBottom: 10,
        height: 147,
    },
    listHd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    listHdLeft:{
        flexDirection: 'row', 
    },
    countdown:{
        width:60,
        height:23,
        paddingLeft:8,
        borderLeftWidth:1,
        borderLeftColor:'#bcbcbc',
    },
    countdownText:{
        color:'#868686',
        fontSize:11
    },
    countdownDateText:{
        color:'#E61C2C',
        fontSize:11
    },
    listHdTags: {
        flexDirection: 'row',
        marginTop: 0,
        marginLeft: 8,
    },
    tagsHd: {
        marginRight: 8,
        borderColor: '#E62344',
    },
    tagsTextHd: {
        color: '#E62344',
    },
    tagsFirst: {
        borderColor: '#67cbdb',
    },
    tagsTextFirst: {
        color: '#67cbdb',
    },
    tagsRepeat: {
        borderColor: '#FF9900',
    },
    tagsTextRepeat: {
        color: '#FF9900',
    },
    listBd: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 8,
    },
    listBdli: {
        width: (Theme.screenWidth - 24) / 3
    },
    listBdliText: {
        fontSize: 12,
        color: '#868686',
    },
    listBdliTextNum: {
        fontSize: 18,
        color: '#E62344',
    },
    listFt: {
        flexDirection: 'row',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    maskView: {
        width: Theme.screenWidth,
        height: 147,
        position: 'absolute',
    },
    mask: {
        width: Theme.screenWidth,
        height: 147,
        position: 'absolute',
        backgroundColor: '#fff',
        opacity: 0.6,
    },
    maskTextContainer: {
        width: (Theme.screenWidth - 24) / 3,
        height: 60,
        position: 'absolute',
        top: 50,
        backgroundColor: '#000',
        opacity: 0.6,
    },
    maskText: {
        width: (Theme.screenWidth - 24) / 3,
        height: 60,
        position: 'absolute',
        top: 50,
        paddingLeft: 12,
        justifyContent: 'center',
    },
    maskTextT: {
        fontSize: 15,
        color: '#fff',
        backgroundColor: 'rgba(52, 52, 52, 0)',
    }
})

