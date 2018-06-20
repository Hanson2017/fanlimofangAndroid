import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, DeviceEventEmitter, Picker, Animated, Dimensions, Easing } from 'react-native';
import Theme from '../../util/theme';

const { width, height } = Dimensions.get('window');
const [aWidth, aHeight] = [width, 253];
const [left, top] = [0, 0];


export default class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true,
            choice: 1,
        }
        this.options = this.props.options;
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {

        let that = this;
        if (this.state.hide) {
            return (<View />)
        }
        else {
            return (
                <View style={styles.container}>


                    <Animated.View style={[styles.mask, {
                        opacity: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.8]
                        })

                    }]} >
                    <TouchableOpacity style={{flex:1}} onPress={this.cancel.bind(this)}></TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[
                        styles.tip,
                        {
                            transform: [{
                                translateY: this.state.offset.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [aHeight, 0]
                                }),
                            }]
                        }
                    ]}>
                        <View style={styles.tipTitleView} >
                            <TouchableOpacity style={styles.tipBtn} onPress={this.cancel.bind(this)}>
                                <Text style={styles.cancelText}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tipBtn} onPress={this.ok.bind(this)}>
                                <Text style={styles.okText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                        <Picker
                            itemStyle={styles.itempicker}
                            selectedValue={this.state.choice}
                            onValueChange={(choice) =>{ 
                                   that.setState({ choice: choice })
                           }}>
                            {this.options.map((aOption) =>  <Picker.Item  label={aOption.value} value={aOption.number} key={aOption.number} /> )}  
                          
                        </Picker>
                    </Animated.View>
                </View>
            )
        }
    }

    //显示动画
    inAnimated() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 1,
                }
            )
        ]).start();
    }
    // 隐藏动画  
    outAnimated() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 0,
                }
            )
        ]).start();

        this.timer = setTimeout(
            () => this.setState({ hide: true }),
            500
        );
    }
    //取消  
    cancel(event) {
        if (!this.state.hide) {
            this.outAnimated();
        }
    }
    //选择  
    ok() {
        if (!this.state.hide) {
            this.outAnimated();
            DeviceEventEmitter.emit('select', this.state.choice)
        }
    }
    show(selectNo) {
        if (this.state.hide) {
            this.setState({ 
                hide: false,
                choice: selectNo
            }, this.inAnimated);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
        justifyContent: 'flex-end',
        zIndex: 999,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0,
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    tip: {
        width: aWidth,
        height: aHeight,
        backgroundColor: '#fff',
    },
    itempicker: {
        height: 200,
    },
    tipTitleView: {
        backgroundColor: '#fff',
        height: 53,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: "#f2f2f2",

    },
    tipBtn: {
        height: 53,
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancelText: {
        color: "#999",
        fontSize: 14,
    },
    okText: {
        color: "#E62344",
        fontSize: 14,
    },
})


