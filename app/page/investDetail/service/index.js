import React, { Component } from 'react';
import { Text, StyleSheet, View,TouchableOpacity} from 'react-native';
import Util from '../../../util/util';
import Title from '../../../component/title';

export default class DetailService extends Component {
    render() {
        const data = this.props.data;
        return (
            <View style={{marginTop:5}}>
            <Title title={'寻求帮助'} />
                <View style={styles.memberKefuOnline}>
                    <View style={styles.kefuOnline}>
                        {
                            data.qqservice.split(',').map((text, i) => {
                                return (
                                    <TouchableOpacity key={i} activeOpacity={0.7} style={styles.onlineBtn} onPress={Util.Linked.bind(this, 'mqqwpa://im/chat?chat_type=wpa&uin=' + text + '&version=1&src_type=web&web_src=fanllimofang.com')}>
                                        <Text style={styles.linkText}>QQ在线客服{i + 1}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {
                        data.qqgroup != '' ?
                            <TouchableOpacity
                                onPress={() => {
                                    let key = data.qqgroup_key;
                                    let linkUrl = "mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D" + key;
                                    Util.Linked(linkUrl)
                                }}
                            >
                                <Text style={styles.text}>返利魔方{data.qqgroup_num + ''}群：{data.qqgroup + ''}（如有疑问，可加群咨询管理员。)</Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    memberKefuOnline: {
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
    },
    linkText: {
        color: '#fff',
        fontSize: 11,
    },
    text: {
        color: '#999',
        fontSize: 11,
        lineHeight: 18,
    },
})