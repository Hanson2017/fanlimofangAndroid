import React, { Component } from 'react';
import { Text, StyleSheet, View, } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Theme from '../../../../util/theme';
import NavBar from '../../../../component/navBar';
import TabBar from '../../../../component/tabBar/index';
import List from './list';

export default class InvestTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['全部', '待审核', '已通过', '已驳回'],
            isFixed:false,
        };
    }
    render() {

        let tabNames = this.state.tabNames;
        const { navigator } = this.props;
        return (
            <View style={styles.container}>
                <NavBar title={'活动记录'} back={'活动记录'} navigator={this.props.navigator} />
                <ScrollableTabView
                    renderTabBar={() => <TabBar tabNames={tabNames} isFixed={this.state.isFixed} />}
                >
                    <View style={styles.content} tabLabel='key1'>
                        <List  that={this} type={-1} navigator={navigator} />
                    </View>
                    <View style={styles.content} tabLabel='key2'>
                        <List  that={this} type={0} navigator={navigator} />
                    </View>
                    <View style={styles.content} tabLabel='key3'>
                        <List  that={this} type={1} navigator={navigator} />
                    </View>
                    <View style={styles.content} tabLabel='key4'>
                        <List that={this} type={2} navigator={navigator} />
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
    }
})