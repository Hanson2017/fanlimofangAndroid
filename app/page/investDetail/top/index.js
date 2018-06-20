import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Util from '../../../util/util';

export default class DetailTop extends Component {
    render() {
        const data = this.props.data;
        const activity = data.activity;
        const plat = data.plat;
        return (
            <View style={[styles.deatilTopContainer]}>
                <View style={styles.deatilTopHd}>
                    <View>
                        <Text style={styles.deatilTopHdText}>已参加</Text>
                        <Text style={styles.number}>{data.commentnum + ''}人</Text>
                    </View>
                    <View style={styles.keywords}>
                        <Text style={[styles.keywordText, styles.keywordTit]}>关键字:</Text>
                        {
                            Util.formatSymbol(activity.keywords).map((item, i) => {
                                return <Text key={i} style={[styles.keywordText, styles.keyword]}>{item}</Text>;
                            })
                        }
                    </View>
                </View>
                <View style={styles.tagsContainer}>
                    <View style={styles.tags}>
                        <View style={[styles.tag, activity.isrepeat == 0 ? styles.tagFirst : styles.tagRepeat]}>
                            <Text style={[styles.tagText, activity.isrepeat == 0 ? styles.tagFirstText : styles.tagRepeatText]}>
                                {activity.isrepeat == 0 ? '首次出借' : '多次出借'}
                            </Text>
                        </View>
                        {
                            activity.ishighest == 1 ?
                                <View style={styles.tag}><Text style={styles.tagText}>全网最高</Text></View>
                                :
                                null
                        }
                        {
                            activity.isprotect == 1 ?
                                <View style={styles.tag}><Text style={styles.tagText}>魔方保障</Text></View>
                                :
                                null
                        }
                        {
                            data.repayday == '当日返现' ?
                                <View style={styles.tag}><Text style={styles.tagText}>当日返现</Text></View>
                                :
                                <View style={styles.tag}><Text style={styles.tagText}>{data.repayday.replace('个', '') + '返'}</Text></View>
                        }
                    </View>
                    {
                        activity.status == 1 ?
                            activity.atype == 1 ?
                                <View style={styles.tags}>
                                    <View style={styles.tag}><Text style={styles.tagText}>风控分:{plat.riskscore + ''}</Text></View>
                                    {
                                        plat.noshowrisk !== 1 ?
                                            <View style={styles.tag}><Text style={styles.tagText}>{Util.risklevel(plat.risklevel)}</Text></View>
                                            :
                                            null
                                    }
                                </View>
                                :
                                <View style={styles.tags}>
                                    <View style={styles.tag}><Text style={styles.tagText}>{Util.inType(activity.atype)}</Text></View>
                                </View>  
                            :
                            null
                    }
                </View>
                <View style={styles.reasonContainer}>
                    <Text style={[styles.reasonText, styles.reasonTit]}>推荐理由：</Text>
                    <Text style={styles.reasonText}>{Util.delHtmlTag(activity.reasons)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deatilTopContainer: {
        padding: 12,
        backgroundColor: '#fff',
    },
    deatilTopHd: {
        marginTop: 5,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deatilTopHdText: {
        fontSize: 12,
        color: '#868686',
    },
    number: {
        paddingTop: 3,
        fontSize: 24,
        color: '#868686',
    },
    keywords: {
        height:12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    keywordText: {
        fontSize: 11,
        color: '#999',
    },
    keyword: {
        paddingLeft: 5,
    },
    tags: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tag: {
        marginRight: 8,
        paddingLeft: 4,
        paddingRight: 4,
        borderWidth: 0.5,
        borderColor: '#E62344',
        borderRadius: 3,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagText: {
        color: '#E62344',
        fontSize: 10,
    },
    tagFirst: {
        borderColor: '#67cbdb',
    },
    tagRepeat: {
        borderColor: '#FF9900',
    },
    tagFirstText: {
        color: '#67cbdb',
    },
    tagRepeatText: {
        color: '#FF9900',
    },
    reasonContainer: {
        marginTop: 3,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    reasonText: {
        color: '#6B6B6B',
        fontSize: 11,
    },
    reasonTit: {
        paddingBottom: 5,
    }
})