import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Theme from '../../util/theme';
import Loading from '../../component/loading';
import NavBar from '../../component/navBar';
import TabBar from '../../component/tabBar/index';
import InvestList from '../investList/index'

export default class InvestTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['大额', '小额', '高返', '存管', '融资', '国资', '上市'],
            isFixed:false,
        };
    }
    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            let tabNames = this.state.tabNames;
            const { navigator, tabId } = this.props;
            return (
                <View style={styles.container}>
                    <NavBar title={''} back='tab' navigator={navigator} />
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} isFixed={this.state.isFixed} />}
                        initialPage={tabId}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            <InvestList that={this}  tType='listTag' type={'dae'} navigator={navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <InvestList that={this}  tType='listTag' type={'xiaoe'} navigator={navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <InvestList that={this}  tType='listTag' type={'gaofan'} navigator={navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <InvestList that={this}  tType='listTag' type={'cunguan'} navigator={navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key5'>
                            <InvestList that={this}  tType='listTag' type={'rongzi'} navigator={navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key6'>
                            <InvestList that={this}  tType='listTag' type={'guozi'} navigator={navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key7'>
                            <InvestList that={this}  tType='listTag' type={'shangshi'} navigator={navigator} backName={'首投'} />
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