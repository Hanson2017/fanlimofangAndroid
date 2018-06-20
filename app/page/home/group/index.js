import React, { Component } from 'react';
import { View } from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../../component/item/index';

export default class Group extends Component {
    render() {
        const { lists, navigator, title, type, dateDiff } = this.props;
        return (
            <View style={Theme.mt15}>
                <Title title={title} iconBgC={type == 'first' ? '#67cbdb' : '#FF9900'} />
                {
                    lists.map((list, i) => {
                        return (
                            <Item dateDiff={dateDiff} data={list} key={i} navigator={navigator} backName={'首页'} />
                        )
                    })
                }
            </View>
        )
    }
}