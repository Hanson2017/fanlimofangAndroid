import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Theme from '../util/theme';
import Header from '../component/Header';
import Loading from '../component/Loading';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TopTabBar from '../component/TopTabBarMore';
import ListPage from '../component/listPage'

export default class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['大额', '小额', '高返', '存管', '融资', '国资', '上市'],
        };
    }
    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            let tabNames = this.state.tabNames;
            console.log(this.props.tabId)
            return (
                <View style={styles.container}>
                    <Header navigator={this.props.navigator} headerText={''}  />
                    <ScrollableTabView
                        renderTabBar={() => <TopTabBar tabNames={tabNames} />}
                        initialPage={this.props.tabId}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            <ListPage tType='listTag' type={'dae'} navigator={this.props.navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <ListPage tType='listTag' type={'xiaoe'} navigator={this.props.navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <ListPage tType='listTag' type={'gaofan'} navigator={this.props.navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage tType='listTag' type={'cunguan'} navigator={this.props.navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key5'>
                            <ListPage tType='listTag' type={'rongzi'} navigator={this.props.navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key6'>
                            <ListPage tType='listTag' type={'guozi'} navigator={this.props.navigator} backName={'首投'} />
                        </View>
                        <View style={styles.content} tabLabel='key7'>
                            <ListPage tType='listTag' type={'shangshi'} navigator={this.props.navigator} backName={'首投'} />
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