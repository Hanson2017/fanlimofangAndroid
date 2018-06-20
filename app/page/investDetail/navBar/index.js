import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Util from '../../../util/util';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }
    render() {
        const { uri, endtime, dateDiff } = this.props;
        return (
            <View style={[styles.headerContainer, this.props.isFixed ? styles.fixed : null]}>
                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content"
                />

                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={this.goBack.bind(this)}
                >
                    <Icon name='back2' size={15} color={'#a9a9a9'} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    {
                        uri != null ?
                            <Image source={{ uri: uri }} style={{ width: 60, height: 24 }} />
                            :
                            null
                    }
                </View>
                {
                    endtime ?
                        <View style={styles.countdown}>
                            <Text style={styles.countdownText}>即将结束</Text>
                            <Text style={styles.countdownDateText}>{Util.countTime(endtime, dateDiff)}</Text>
                        </View>
                        :
                        null
                }

            </View>
        )
    }
    goBack() {
        this.props.navigator.pop();
    }
    tick() {
        this.setState((prevState) => ({
            seconds: prevState.seconds + 1
        }));
    }
    componentDidMount() {
        const { endtime } = this.props;
        this.interval = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        const { endtime } = this.props;
        clearInterval(this.interval);
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'relative',
        paddingTop: 20,
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    fixed: {
        shadowColor: 'rgba(177, 175, 175, 0.4)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        zIndex: 99,
    },
    backBtn: {
        paddingLeft: 12,
        width: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        paddingRight: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdown: {
        position: 'absolute',
        top: 26,
        right: 0,
        width: 70,
        height: 23,
        paddingLeft: 8,
        borderLeftWidth: 1,
        borderLeftColor: '#bcbcbc',
    },
    countdownText: {
        color: '#868686',
        fontSize: 11
    },
    countdownDateText: {
        color: '#E61C2C',
        fontSize: 11
    },
})