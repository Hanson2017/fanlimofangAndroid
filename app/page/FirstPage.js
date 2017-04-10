import React, { Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';

import Theme from '../util/theme';
import Header from '../component/Header';
import Loading from '../component/Loading';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TopTabBar from '../component/TopTabBar';
import ListPage from '../component/listPage'

export default class FirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['进行中', '已结束'],
        };
    }
    render() {
        if (this.state.loading) {
            return <Loading />
        }
        else {
            let tabNames = this.state.tabNames;
            return (
                <View style={styles.container}>
                    <ScrollableTabView
                        renderTabBar={() => <TopTabBar tabNames={tabNames} />}
                    >

                        <View style={styles.content} tabLabel='key1'>
                            <ListPage type={this.props.type=='first' ? 'first':'repeat'} navigator={this.props.navigator} backName={this.props.type=='first' ?'首投':'复投'} />
                        </View>

                        <View style={styles.content} tabLabel='key2'>
                             <ListPage type={this.props.type=='first' ? 'firstover':'repeatover'} navigator={this.props.navigator} backName={this.props.type=='first' ?'首投':'复投'} />
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
   content:{
      flex: 1, 
   }
})