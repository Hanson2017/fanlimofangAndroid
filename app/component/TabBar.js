import React, { Component } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Icomoon';

import Theme from '../util/theme'
import HomePage from '../page/HomePage'
import FirstPage from '../page/FirstPage'
import Help from '../page/Help'
import MePage from '../page/MePage'

export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: Theme.color,
        normalColor: '#888',
        size: 24,
        normalColorText: '#666'
    };
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '首投', '复投', '问答', '我的']
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
                    {<HomePage navigator={this.props.navigator} />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[1]}
                    renderIcon={() => <Icon name='firstInv' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='firstInv' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'first'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'first'
                        })
                    }}
                >
                    <FirstPage type={'first'} navigator={this.props.navigator} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[2]}
                    renderIcon={() => <Icon name='repeatInv' size={26} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='repeatInv' size={26} color={selectedColor} />}
                    selected={this.state.selectedTab === 'repeat'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'repeat'
                        })
                    }}
                >
                    <FirstPage type={'repeat'} navigator={this.props.navigator} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[3]}
                    renderIcon={() => <Icon name='ask' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='ask' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'ask'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'ask'
                        })
                    }}
                >
                    <Help navigator={this.props.navigator} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[4]}
                    renderIcon={() => <Icon name='my' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='my' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'my'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'my'
                        })
                    }}
                >
                    <MePage navigator={this.props.navigator} />
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