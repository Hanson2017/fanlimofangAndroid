import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../util/theme';
import Search from '../page/Search';


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
                    <Icon name={'searchN'} size={15} color={'#999'} />
                    <Text style={styles.searchText}>搜索你感兴趣的平台活动</Text>
                </TouchableOpacity>
                {this.props.children}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    searchWp: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#f23b83',
    },
    searchBtn: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        width: Theme.screenWidth * 0.9,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    searchText: {
        marginLeft: 8,
        color: '#ccc',
        fontSize: 13,
    }
})