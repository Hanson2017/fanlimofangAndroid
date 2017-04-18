import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Theme from '../util/theme';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TopTabBar from '../component/TopTabBar';
import NewUser from './newUser'
import HelpList from './HelpList'

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['新手指南', '常用问答']
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <TopTabBar tabNames={tabNames} />}
                >

                    <View style={styles.content} tabLabel='key1'>
                        <NewUser />

                    </View>
                    <View style={styles.content} tabLabel='key2'>
                        <HelpList />
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
        marginTop: 10,
        flex: 1,
    },

})