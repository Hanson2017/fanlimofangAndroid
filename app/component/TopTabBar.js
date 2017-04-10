'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Platform
} from 'react-native';

class   TopTabBar extends Component {

    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合
        tabNames: React.PropTypes.array, // 保存Tab名称
    }

    setAnimationValue({ value }) {
       
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let tabSty = this.props.activeTab == i ? styles.tabActive : styles.tab; 
        let tabText = this.props.activeTab == i ? styles.tabActiveText : styles.tabText; 
        return (
            <TouchableOpacity onPress={() => this.props.goToPage(i)} style={tabSty} key={i}>
                <Text style={tabText}>{this.props.tabNames[i]}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={[styles.tabsContainer,Platform.OS=='android'?{marginTop:0}:null]}>
                <View style={styles.tabs}>
                    {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabsContainer: {
        marginTop:23,
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
    },
    tabs: {
        flexDirection: 'row',
        height: 30,
        width:200,
        borderWidth:1,
        borderColor:'#ff6666',
        borderRadius:5,
        overflow:'hidden',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
         backgroundColor:'#fff',
       
    },
    tabText:{
         color:'#ff6666',
    },
    tabActive:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ff6666',
    },
    tabActiveText:{
         color:'#fff',
    },
});


export default TopTabBar;