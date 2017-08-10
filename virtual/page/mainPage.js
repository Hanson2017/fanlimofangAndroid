import React, { Component } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Icomoon';


import Home from './home'
import ListPage from '../component/list'
import PlatListPage from '../component/platList'

export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: '#0055AA',
        normalColor: '#888',
        size: 24,
        normalColorText: '#666'
    };
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '行业资讯', '平台流量', '平台评级']
        }
    }
    render() {
        const { selectedColor, normalColor, size, normalColorText } = this.props;
        return (
            <TabNavigator>
                <TabNavigator.Item
                    title={this.state.tabName[0]}
                    renderIcon={() => <Icon name='home' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='home' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'home'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'home'
                        })
                    }}
                >
                    <Home navigator={this.props.navigator} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[1]}
                    renderIcon={() => <Icon name='hangye' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='hangye' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'first'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'first'
                        })
                    }}
                >
                    <ListPage navigator={this.props.navigator} type={65} title={'行业资讯'} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[2]}
                    renderIcon={() => <Icon name='pingtai' size={26} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='pingtai' size={26} color={selectedColor} />}
                    selected={this.state.selectedTab === 'repeat'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'repeat'
                        })
                    }}
                >
                     <PlatListPage navigator={this.props.navigator} title={'综合流量'} typeInfo={{typeText:'综合流量',typeField:'score',column:'flow',type:'all',dataName:'dataList'}} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[3]}
                    renderIcon={() => <Icon name='zhengche' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='zhengche' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'ask'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'ask'
                        })
                    }}
                >
                    <PlatListPage navigator={this.props.navigator} title={'综合评级'} typeInfo={{typeText:'综合指数',typeField:'score',column:'pingji',type:'all',dataName:'gradeList'}} />
                </TabNavigator.Item>

            </TabNavigator>
        )
    }
    componentDidMount() {

    }
}

var styles = StyleSheet.create({
    page1: {
        flex: 1,
        backgroundColor: '#7fffd4'
    },
    page2: {
        flex: 1,
        backgroundColor: 'blueviolet'
    },
    page3: {
        flex: 1,
        backgroundColor: 'cornflowerblue'
    },
    page4: {
        flex: 1,
        backgroundColor: 'darkgoldenrod'
    },
    page5: {
        flex: 1,
        backgroundColor: 'darkorchid'
    },
    tab: {
        width: 26,
        height: 26
    }
})