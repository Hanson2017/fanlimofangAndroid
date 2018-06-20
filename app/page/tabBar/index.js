import React, { Component } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Icomoon';

import Theme from '../../util/theme';
import HomePage from '../home';
import Invest from '../invest';
import Help from '../help';
import Account from '../account';

export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: '#E62344',
        normalColor: '#888',
        size: 22,
        normalColorText: '#666'
    };
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '首次', '多次', '问答', '我的']
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
                    <Invest type={'first'} navigator={this.props.navigator} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[2]}
                    renderIcon={() => <Icon name='repeatInv' size={24} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='repeatInv' size={24} color={selectedColor} />}
                    selected={this.state.selectedTab === 'repeat'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'repeat'
                        })
                    }}
                >
                    <Invest type={'repeat'} navigator={this.props.navigator} />
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
                    <Account navigator={this.props.navigator} />
                    
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}

var styles = StyleSheet.create({
    tab: {
        width: 26,
        height: 26
    }
})