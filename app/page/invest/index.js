import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Loading from '../../component/loading';
import Theme from '../../util/theme';
import NavBar from '../../component/navBar';
import TabBar from '../../component/tabBar';
import InvestList from '../investList/index'

export default class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['进行中', '已结束'],
            isFixed:false,
        };
    }
    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            const {navigator,type}=this.props;
            let tabNames = this.state.tabNames;
            return (
                <View style={styles.container}>
                    <NavBar title={''} navigator={navigator} />
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} isFixed={this.state.isFixed} />}
                    >

                        <View style={styles.content} tabLabel='key1'>
                            <InvestList that={this} type={type == 'first' ? 'first' : 'repeat'} navigator={navigator} backName={type == 'first' ? '首投' : '复投'} />
                        </View>

                        <View style={styles.content} tabLabel='key2'>
                            <InvestList that={this}  type={type == 'first' ? 'firstover' : 'repeatover'} navigator={navigator} backName={type == 'first' ? '首投' : '复投'} />
                        </View>

                    </ScrollableTabView>

                </View>
            )
        }
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