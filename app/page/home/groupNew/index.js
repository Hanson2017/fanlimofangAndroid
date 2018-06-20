import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import Api from '../../../util/api';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import InvestDetail from '../../investDetail';

export default class GroupNew extends Component {
    render() {
        const { lists, title } = this.props;
        return (
            <View style={Theme.mt15}>
                <Title title={title} />
                <View style={styles.ItemNewList}>
                    {
                        lists.map((list, i) => {
                            let uri = Api.domain + list.plat.platlogo;
                            return (
                                <TouchableOpacity key={i} onPress={this.goDetail.bind(this, list.activity.id)} activeOpacity={0.8} style={styles.ItemNew}>
                                    <View style={styles.ItemNewPic}>
                                        <Image source={{ uri: uri }} style={{ width: 70, height: 28 }} />
                                    </View>
                                    <View style={[Theme.flexDrow, { alignItems: 'center', }]}>
                                        <Text style={styles.ItemNewText}>出借{list.activity.invest + ''}获得</Text>
                                        <Text style={[styles.ItemNewText, { color: '#E62344' }]}>{list.activity.rebate + ''}</Text>
                                    </View>
                                    <View style={[Theme.flexDrow, Theme.mt5, { alignItems: 'center' }]}>
                                        <Text style={styles.ItemNewText}>相当于年化</Text>
                                        <Text style={[styles.ItemNewText, { color: '#E62344' }]}>
                                            {
                                                list.activity.atype == 1 || list.activity.atype == 4 ?
                                                    list.activity.rate + '%'
                                                    :
                                                    '浮动'
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </View>
        )
    }
    goDetail(id) {
        this.props.navigator.push({
            component: InvestDetail,
            params: {
                id: id
            }
        })
    }
}



var styles = StyleSheet.create({
    ItemNewList: {
        paddingBottom: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    ItemNew: {
        marginLeft: 12,
        overflow: 'hidden',
        width: (Theme.screenWidth - 48) / 3
    },
    ItemNewPic: {
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },

    ItemNewText: {
        fontSize: 11,
        color: '#868686',
    }
})