import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Theme from '../../util/theme';
import NavBar from '../../component/navBar';
import TabBar from '../../component/tabBar';
import NewUser from './newUser';
import HelpList from './helpList';

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['新手指南', '常用问答'],
            isFixed:false,
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        
        return (
            <View style={styles.container}>
                <NavBar title={'帮助中心'} navigator={this.props.navigator} />
                <ScrollableTabView
                    renderTabBar={() => <TabBar tabNames={tabNames} isFixed={this.state.isFixed} />}
                    initialPage={this.props.tabId?this.props.tabId:0}
                >

                    <View style={styles.content} tabLabel='key1'>
                        <NewUser that={this} />
                    </View>
                    <View style={styles.content} tabLabel='key2'>
                        <HelpList that={this} />
                    </View>
                </ScrollableTabView>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    content: {
        flex: 1,
    },

})