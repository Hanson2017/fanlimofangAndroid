import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import Api from '../../../../util/api';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';
import Loading from '../../../../component/loading';
import NavBar from '../../../../component/navBar';

import Help from '../../../help';

export default class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: null,
        }
    }
    render() {
        const { loading, dataSource } = this.state;
        return (
            <View style={styles.container}>
                <NavBar title={'联系客服'} back={'联系客服'} navigator={this.props.navigator} />
                {
                    loading ?
                        <Loading />
                        :
                        <View>
                            <View style={styles.memberKefuHd}>
                                <Text style={styles.text}>HI！欢迎来到返利魔方！</Text>
                                <Text style={styles.text}>由于在线客服访问人数较多，为节约您的宝贵时间，可先行查阅自助问答。如仍有疑问，请联系在线客服，我们将尽心解决您的问题!</Text>
                                <TouchableOpacity style={styles.linkBtn} onPress={this.goHelp.bind(this)} activeOpacity={0.7}>
                                    <Text style={styles.linkText}>前往自助问答</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.memberKefuOnline}>
                                <View style={styles.kefuOnline}>
                                    {
                                        dataSource.qqservice.split(',').map((text, i) => {
                                            return (
                                                <TouchableOpacity key={i} activeOpacity={0.7} style={styles.onlineBtn} onPress={Util.Linked.bind(this, 'mqqwpa://im/chat?chat_type=wpa&uin=' + text + '&version=1&src_type=web&web_src=fanllimofang.com')}>
                                                    <Text style={styles.linkText}>QQ在线客服{i + 1}</Text>
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
                                            <Text style={styles.text}>返利魔方{dataSource.qqgroup_num + ''}群：{dataSource.qqgroup + ''}（如有疑问，可加群咨询管理员。)</Text>
                                        </TouchableOpacity>
                                        :
                                        null
                                }
                            </View>
                        </View>
                }
            </View>
        )
    }
    componentDidMount() {
        this.getData()
    }
    goHelp() {
        this.props.navigator.push({
            component: Help,
            params: {
                tabId: 1,
            }
        })

    }
    getData() {
        var that = this;
        var url = Api.getqqinfo;
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (response) {
                if (response.result == 1) {
                    that.setState({
                        loading: false,
                        dataSource: response.data
                    })
                }
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    text: {
        color: '#999',
        fontSize: 11,
        lineHeight: 18,
    },
    memberKefuHd: {
        padding: 12,
        backgroundColor: '#fff',
    },
    linkBtn: {
        marginTop: 20,
        width: Theme.screenWidth - 24,
        height: 30,
        backgroundColor: '#e62344',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkText: {
        color: '#fff',
        fontSize: 11,
    },
    memberKefuOnline: {
        marginTop: 15,
        padding: 12,
        backgroundColor: '#fff',
    },
    kefuOnline: {
        flexDirection: 'row',
    },
    onlineBtn: {
        marginRight: 15,
        marginBottom: 12,
        width: 90,
        height: 24,
        backgroundColor: '#ffb045',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }

})    