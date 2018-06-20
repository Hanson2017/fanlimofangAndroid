import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Search from '../../page/search/index';

export default class NavBar extends React.Component {
    render() {
        const { title, back, navigator, search } = this.props;
        return (
            <View style={[styles.navBarContainer,Platform.OS=='android'?{paddingTop:12,height: 44}:null]}>
                <StatusBar
                    backgroundColor="#1d1d1d"
                    barStyle="light-content"
                />
                <TouchableOpacity style={styles.backBtn} activeOpacity={0.8}
                    onPress={() => {
                        if (navigator.state.routeStack.length > 1) {
                            navigator.pop();
                        }

                    }}
                >
                    {
                        navigator.state.routeStack.length > 1 ?
                            <Icon name={'back2'} size={15} color={'#fff'} />
                            :
                            null
                    }
                </TouchableOpacity>
                {
                    title !== '' || search ?
                        <View style={styles.navBarTitle}>
                            <Text style={styles.navBarTitleText}>{title}</Text>
                        </View>
                        :
                        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}
                            onPress={() => {
                                navigator.push({
                                    component: Search
                                })
                            }}
                        >
                            <Icon name={'searchN'} size={11} color={'#999'} />
                            <Text style={styles.searchText}>搜索你感兴趣的平台活动</Text>
                        </TouchableOpacity>
                }
                <View style={styles.operation}>{this.props.children ? this.props.children : null}</View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    navBarContainer: {
        paddingTop: 25,
        paddingBottom: 12,
        height: 57,
        backgroundColor: '#1d1d1d',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backBtn: {
        paddingLeft: 12,
        width: 50,
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBtn: {
        flex: 1,
        paddingLeft: 6,
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    searchText: {
        paddingLeft: 5,
        fontSize: 11,
        color: '#ccc',
    },
    navBarTitle: {
        flex: 1,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitleText: {
        color: '#fff',
        fontSize: 12,
    },
    operation: {
        width: 50,
    }
})