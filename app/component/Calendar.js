import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, DeviceEventEmitter, DatePickerIOS } from 'react-native';
import Theme from '../util/theme';
import Util from '../util/util';
import Header from '../component/Header';
import Icon from 'react-native-vector-icons/Icomoon';

export default class Calendar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: new Date(),
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} headerText={this.props.headerText} rightText={'确定'} _onPressRight={this.confirmSelect.bind(this)} />
                <View style={styles.content}>
                    <DatePickerIOS
                        date={this.state.date}
                        mode="date"
                        onDateChange={this.onDateChange.bind(this)}
                    />
                </View>
            </View>
        )
    }
    onDateChange(date) {
        this.setState({
            date: date
        })
    }
    confirmSelect() {
        let data;
        if (this.props.index !== null && this.props.index !== undefined) {
            data = {
                index: this.props.index,
                date: Util.setDate(this.state.date)
            }
        }
        else {
            data = Util.setDate(this.state.date);
        }
      
        DeviceEventEmitter.emit('selectDate', data)
        this.props.navigator.pop();
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
    btnView: {
        paddingLeft: 30,
        paddingRight: 30,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})


