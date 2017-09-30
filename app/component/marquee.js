import React, { Component } from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Icomoon';
import DetailPage from '../page/DetailPage'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translateY: new Animated.Value(0),
        };
    }
    componentDidMount() {
        this.showHeadBar(0, this.props.data.length);         //从第0条开始，轮播5条数据
    }
    showHeadBar(index, count) {
        index++;
        Animated.timing(this.state.translateY, {
            toValue: -15 * index,             //40为文本View的高度
            duration: 600,                        //动画时间
            Easing: Easing.linear,
            delay: 4000                            //文字停留时间
        }).start(() => {                          //每一个动画结束后的回调 
            if (index >= count) {
                index = 0;
                this.state.translateY.setValue(0);
            }
            this.showHeadBar(index, count);  //循环动画
        })
    }
    render() {
        let data = this.props.data;
        return (
            <View style={styles.container}>
               
                <Animated.View
                    style={[styles.wrapper, {
                        transform: [{
                            translateY: this.state.translateY
                        }],
                        height:data.length*40
                    }
                    ]}
                >              
                    {
                        data.map((item, i) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8}  style={styles.bar} key={i}
                                    onPress={() => {
                                        this.props.navigator.push({
                                            component: DetailPage,
                                            params: {
                                                id: item.activityid
                                            }
                                        })
                                    }}
                                >
                                    <Text numberOfLines={1} style={styles.barText}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity activeOpacity={0.8} style={styles.bar}
                        onPress={() => {
                            this.props.navigator.push({
                                component: DetailPage,
                                params: {
                                    id: data[data.length - 1].title.activityid
                                }
                            })
                        }}
                    >
                        <Text numberOfLines={1} style={styles.barText}>{data[data.length - 1].title}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 8,
        marginRight: 10,
        height: 15,
        overflow: 'hidden',
    },
    noticeIcon: {
        paddingLeft: 10,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        marginHorizontal: 5,
      
    },
    bar: {
        height: 15,
        justifyContent: 'center',
    },
    barText: {
        width: Dimensions.get('window').width - 30 - 16,
        marginLeft: 5,
        color: '#fff',
        fontSize: 12,
    },
});