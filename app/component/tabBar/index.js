'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Platform
} from 'react-native';

class TopTabBar extends Component {

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
        let tabSty = this.props.activeTab == i ? styles.tabActive : null;
        let tabText = this.props.activeTab == i ? styles.tabActiveText : null;
        return (
            <TouchableOpacity onPress={() => this.props.goToPage(i)} style={[styles.tab,tabSty]} key={i}>
                <Text style={[styles.tabText,tabText]}>{this.props.tabNames[i]}</Text>
                {this.props.activeTab == i ?
                    <View style={styles.iconActive}></View>
                    :
                    null
                }
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={[styles.tabsContainer,this.props.isFixed?styles.fixed:null]}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabsContainer: {
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        zIndex:99,
        
    },
    fixed:{
        shadowColor:'rgba(177, 175, 175, 0.4)',
        shadowOffset:{width: 0, height: 2},
        shadowRadius:4,
        shadowOpacity:1,
    },
    tab: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        color: '#999',
        fontSize:12,
    },
    tabActive: {
        position:'relative',
    },
    tabActiveText: {
        color: '#E62344',
    },
    iconActive:{
        position:'relative',
        top:12,
        width:20,
        height:2,
        backgroundColor:'#E62344',
    }
});


export default TopTabBar;