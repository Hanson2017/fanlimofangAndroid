import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Item from '../component/item';
import Loading from '../../app/component/loading';
import Util from '../../app/util/util'
import Theme from '../../app/util/theme'


class Title extends React.Component {
    render() {
        let titleText = this.props.titleText;
        return (
            <View style={styles.Title}>
                <View style={styles.TitleIcon}></View>
                <Text style={styles.TitleText}>{titleText}</Text>
            </View>
        )
    }

}

class Header extends Component {
    render() {
        return (
            <View style={[styles.headerContainer, Platform.OS != 'ios' ? { marginTop: 0 } : null]}>
                <TouchableOpacity style={{ width: 50, paddingLeft: 13, }} onPress={this.goBack.bind(this)}>
                    <Icon name='back' size={26} color={'#a9a9a9'} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#333' }}>{this.props.platName}</Text>
                </View>

            </View>
        )
    }
    goBack() {
        this.props.navigator.pop();
    }
}

class Basic extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <View>
                <Title titleText={'基础信息'} />
                <View style={styles.basicBox}>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>运营公司</Text>
                        <Text style={styles.basicListText}>{data.info_yygs+''}</Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>公司地址</Text>
                        <Text style={styles.basicListText}>{data.info_address+''}</Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>客服电话</Text>
                        <Text style={styles.basicListText}>{data.info_tel+''}</Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>邮件地址</Text>
                        <Text style={styles.basicListText}>{data.info_email+''}</Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>注册资金</Text>
                        <Text style={styles.basicListText}>
                            {data.info_Funds == '' || data.info_Funds == '不明' ?
                                '不明'
                                :
                                data.info_Funds + '万人民币'
                            }

                        </Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>ICP备案号</Text>
                        <Text style={styles.basicListText}>{data.info_icp}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

class Yunying extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <View>
                {
                    data != null ?
                        <View>
                            <Title titleText={'交易类数据（万）'} />
                            <View style={styles.YunyingBox}>
                                <Text style={styles.ListTextYun}>成交量：{data.amount+''} </Text>
                                <Text style={styles.ListTextYun}>资金净流入/出：{data.inamount+''} </Text>
                                <Text style={styles.ListTextYun}>当日待还金额：{data.stayStill+''} </Text>
                                <Text style={styles.ListTextYun}>累计待还：{data.stayStillOfTotal+''} </Text>
                                <Text style={styles.ListTextYun}>平均投资金额：{data.avgBidMoney+''} </Text>
                                <Text style={styles.ListTextYun}>平均借款金额：{data.avgBorrowMoney+''} </Text>
                            </View>
                            <Title titleText={'用户类数据（人）'} />
                            <View style={styles.YunyingBox}>
                                <Text style={styles.ListTextYun}>当日投资人数：{data.bidderNum+''} </Text>
                                <Text style={styles.ListTextYun}>当日借款人数：{data.borrowerNum+''} </Text>
                                <Text style={styles.ListTextYun}>待收投资人数：{data.bidderWaitNum+''} </Text>
                                <Text style={styles.ListTextYun}>待还借款人数：{data.borrowWaitNum+''} </Text>

                            </View>
                            <Title titleText={'占比数据'} />
                            <View style={[styles.YunyingBox, styles.YunyingBox2]}>
                                <Text style={[styles.ListTextYun, styles.ListTextYun2]}>前10大投资人待收占比：  {data.top10DueInProportion+''} %</Text>
                                <Text style={[styles.ListTextYun, styles.ListTextYun2]}>前10大借款人待还占比：  {data.top10StayStillProportion+''} %</Text>
                            </View>
                            <Title titleText={'其它数据'} />
                            <View style={styles.YunyingBox}>
                                <Text style={styles.ListTextYun}>收益率：{data.rate+''} %</Text>
                                <Text style={styles.ListTextYun}>平均借款期限：{data.loanPeriod+''} 月</Text>
                                <Text style={styles.ListTextYun}>满标用时：{data.fullloanTime+''} 分钟</Text>

                            </View>
                        </View>
                        :
                        <Text style={styles.null}>暂无运营数据</Text>
                }

            </View>
        )
    }
}

class UserInfo extends React.Component {
    render() {
        let data = this.props.data;
        if (data != null) {
            var areaData = data.areaDetail.data;
            if (data.age != '') {
                var ageText = ['18岁及以下', '19-24岁', '25-34岁', '35-49岁', '50岁及以上'];
                var age = data.age.split(',')
                var newdata = [];
                for (const i = 0; i < age.length; i++) {
                    newdata.push(parseInt(age[i]))
                }
                age = newdata
                var maxValue = Math.max.apply(null, age);
            }
        }
        return (
            <View>
                {
                    data != null ?
                        <View>
                            <Title titleText={'投资人地域分布'} />
                            <View style={styles.areaDetail}>
                                {
                                    areaData != null ?
                                        areaData.list.map((list, i) => {
                                            return (
                                                <View style={styles.areaDetailList}>
                                                    <View style={[styles.number, styles['number' + i]]}><Text style={styles.numberText}>{i + 1 + ''}</Text></View>
                                                    <Text style={styles.platName}>{list.province}</Text>
                                                    <View style={[styles.progress, { width: Theme.screenWidth / 2 * list.perctent }]}></View>
                                                </View>
                                            )
                                        })
                                        :
                                        <Text style={styles.null}>暂无数据</Text>
                                }
                            </View>
                            <Title titleText={'投资人年龄占比'} />
                            <View style={styles.ageDetail}>
                                {
                                    data.age != '' ?
                                        age.map((list, i) => {
                                            return (
                                                <View style={styles.ageDetailList}>
                                                    <Text style={styles.ageNum}>{ageText[i]}</Text>
                                                    <Text style={styles.ageBili}>{list+''}%</Text>
                                                    <View style={[styles.progress, styles.progressAge, { width: (Theme.screenWidth - 50) / 2 * (list / maxValue) }]}></View>
                                                </View>
                                            )
                                        })

                                        :
                                        <Text style={styles.null}>暂无数据</Text>
                                }
                            </View>

                            <Title titleText={'投资人性别占比'} />
                            <View style={styles.sexDetail}>
                                {
                                    data.male != 0 ?
                                        <View style={styles.sexBox}>
                                            <View style={[styles.sex, styles.sexMale]}>
                                                <Text style={[styles.sexText, styles.sexMaleText]}>男{data.male+''}%</Text>
                                                <View style={[styles.sexProgress, styles.sexProgressMale,
                                                data.male > data.female ?
                                                    null
                                                    :
                                                    { height: 160 * (data.female / data.male) }
                                                ]}></View>
                                            </View>
                                            <View style={[styles.sex, styles.sexFemale]}>
                                                <Text style={[styles.sexText, styles.sexFemaleText]}>女{data.female+''}%</Text>
                                                <View style={[styles.sexProgress, styles.sexProgressFemale,
                                                data.male < data.female ?
                                                    null
                                                    :
                                                    { height: 160 * (data.female / data.male) }
                                                ]}></View>
                                            </View>
                                        </View>
                                        :
                                        <Text style={styles.null}>暂无数据</Text>
                                }
                            </View>
                        </View>
                        :
                        <Text style={[styles.null, { paddingLeft: 10, }]}>暂无用户数据</Text>
                }

            </View>
        )
    }
}


export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: null,
        };
    }
    render() {

        let data = this.state.dataSource;
        return (
            <View style={{ flex: 1 }}>
                <Header navigator={this.props.navigator} platName={this.props.platName} />
                {this.state.loading ?
                    <Loading />
                    :
                    <ScrollView style={styles.container}>
                        <Yunying data={data.dataDetail} />
                        <Basic data={data.comDetail} />
                        
                        <UserInfo data={data.userDetail} />
                    </ScrollView>
                }
            </View>
        )

    }
    componentDidMount() {
        this.getDataDetail()
    }
    getDataDetail(type) {
        let that = this;
        let id = this.props.id;
        let url = "http://www.dailuopan.com/MPAPI/GetPlatdetail?type=data&id_dlp=" + id
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                dataSource: responseData,
                            })
                            console.log('responseData', responseData)
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 23,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingRight: 50,
    },
    Title: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 34,
        backgroundColor: '#dfe5ea'
    },
    TitleIcon: {
        marginRight: 8,
        width: 4,
        height: 16,
        backgroundColor: '#2c3641',
    },
    TitleText: {
        color: '#2D3640',
    },

    basicBox: {
        padding: 10,
    },
    basicList: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    basicListText: {
        flex: 1,
        color: '#333',
        lineHeight: 22,
    },
    basicListLabel: {
        lineHeight: 22,
        width: 90,
        color: '#ccc',
    },
    ListText: {
        width: 170,
        color: '#ABB7C4',
        fontSize: 12,
        lineHeight: 24,
    },

    YunyingBox: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    YunyingBox2: {
        flexDirection: 'column',
    },
    ListTextYun: {
        width: (Theme.screenWidth - 20) / 2,
        color: '#ABB7C4',
        fontSize: 12,
        height: 24,
        lineHeight: 24,
    },
    ListTextYun2: {
        width: 200
    },
    null: {
        paddingTop: 15,
        paddingLeft: 10,
        color: '#ccc',
    },
    areaDetail: {
        padding: 10,
    },
    areaDetailList: {
        marginBottom: 6,
        marginTop: 6,
        flexDirection: 'row',
        height: 22,
        alignItems: 'center',
    },
    number: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 26,
        height: 22,
        backgroundColor: '#a9b7c5',
    },
    number0: {
        backgroundColor: '#000',
    },
    number1: {
        backgroundColor: '#000',
    },
    number2: {
        backgroundColor: '#000',
    },
    numberText: {
        color: '#fff'
    },
    platName: {
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 22,
        color: '#ABB7C4',
    },
    progress: {
        width: (Theme.screenWidth) / 2,
        height: 20,
        backgroundColor: '#ccc',
    },
    null: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#ccc',
    },
    ageDetail: {
        padding: 10,
    },
    ageDetailList: {
        paddingRight: 30,
        marginBottom: 6,
        marginTop: 6,
        flexDirection: 'row',
        height: 22,
        alignItems: 'center',
    },
    ageNum: {
        width: 90,
        color: '#ABB7C4',
    },
    ageBili: {
        width: 65,
        color: '#ABB7C4',
    },
    progressAge: {
        width: (Theme.screenWidth - 50) / 2,
    },
    sexDetail: {
        padding: 10,
    },
    sexBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sex: {
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sexMale: {
        marginRight: 30,
    },
    sexProgress: {
        marginTop: 8,
        width: 50,
        height: 160,
        backgroundColor: '#ccc',
    },
    sexProgressMale: {
        backgroundColor: '#00757d',
    },
    sexProgressFemale: {
        backgroundColor: '#ff7557',
    },
    sexMaleText: {
        color: '#00757d',
    },
    sexFemaleText: {
        color: '#ff7557',
    }
})