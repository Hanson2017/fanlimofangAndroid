import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../util/theme';
import Search from '../../../page/search/index';


export default class SearchBtn extends React.Component {
    render() {
        return (
            <View style={styles.searchWp}>
                <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}
                    onPress={() => {
                        this.props.navigator.push({
                            component: Search
                        })
                    }}
                >
                    <Icon name={'searchN'} size={11} color={'#999'} />
                    <Text style={styles.searchText}>搜索你感兴趣的平台活动</Text>
                </TouchableOpacity>
                {this.props.children}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    searchWp: {
        flex:1,
    },
    searchBtn: {
        flex:1,
        paddingLeft: 6,
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    searchText: {
        marginLeft: 5,
        color: '#ccc',
        fontSize: 10,
    }
})