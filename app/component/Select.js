import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import Theme from '../util/theme';
import Header from '../component/Header';
import Icon from 'react-native-vector-icons/Icomoon';

export default class Select extends Component {
    render() {
        let selectNo = this.props.selectNo;
        let selectList = this.props.selectList;
        let that = this;
        let selectViewList = selectList.map((list, i) => {
            let gou = selectNo == i ? <Icon name={'gou'} size={18} color={'#FF6666'} /> : null;
            let data;
            if (that.props.index !== null && that.props.index!==undefined) {
                data = {
                    index: that.props.index,
                    value: list.number
                }
            }
            else {
                data = list.number;
            }
            return (
                <TouchableOpacity style={styles.listView} onPress={this._onPress.bind(this, data)} key={i}>
                    <Text style={styles.listViewText}>{list.value}</Text>
                    {gou}
                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} headerText={this.props.headerText} />
                <View style={styles.content}>
                    {selectViewList}
                </View>
            </View>
        )
    }
    _onPress(data) {
        DeviceEventEmitter.emit('select', data)
        this.props.navigator.pop();
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
        backgroundColor: '#fff',
    },
    listView: {
        paddingLeft: 15,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
    },
    listViewText: {
        marginRight: 30,
        color: '#666'
    }
})


