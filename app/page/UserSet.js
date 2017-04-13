import React, { Component } from 'react';
import {Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert, Keyboard, Dimensions,Platform} from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../util/theme';
import Api from '../util/api';
import Header from '../component/Header';
import Loading from '../component/Loading';
import TxtInput from '../component/TextInput'
import BottomBtn from '../component/BottomBtn'
import FormValidation from '../util/FormValidation'

var dismissKeyboard = require('dismissKeyboard');
const { width, height } = Dimensions.get('window');


class TextInputs extends Component {
    render() {
        return (
            <View style={[styles.inputView, this.props.borderBt ? null : styles.borderBt]}>
                <Text style={styles.label}>{this.props.label}</Text>
                <TxtInput params={this.props.params} />
            </View>
        )
    }
}


export default class UserSet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listdata: [
                {
                    id: 0,
                    c_userid: '',
                    c_phone: '',
                    c_username: ''
                }
            ],
            alipay: '',
            alipayName: '',
            len: 1,
        }
        this.contentHeight = 0;
        this.textInputView = null;//当前编辑的textInput
        this.moveH = 0;//ScrollView滑动的距离
        this.lastMoveH = 0;//保留上次滑动的距离
        this.needMove = false;//弹出键盘时，textInputView是否需要滑动
    }
    render() {

        let inputForm = [];
        let that = this;
        let listdata = that.state.listdata;
        for (let i = 0; i < that.state.len; i++) {
            inputForm.push(

                this._renderGroupItem(i)
            )

        }
        return (
            <View style={styles.container}>
                <Header navigator={this.props.navigator} headerText={'快捷设置'} rightText={'新增'} _onPressRight={this.addInputForm.bind(this)} />
                <View style={styles.content}>
                    <ScrollView ref={'scroll'}
                        onContentSizeChange={(contentWidth, contentHeight) => {
                            this.contentHeight = parseInt(contentHeight);
                        }}
                        onScrollEndDrag={(e) => {
                            this.moveH = e.nativeEvent.contentOffset.y;
                        }}>
                        <View>
                            <View style={{ marginBottom: 10 }}>
                                <TextInputs
                                    label={'支付宝帐号(用于接收返利)'}
                                    params={{ value: this.state.alipay, onChangeText: this.onChangeTextAlipay.bind(this) }}
                                />
                                <TextInputs
                                    label={'支付宝帐号对应的真实姓名'}
                                    params={{ value: this.state.alipayName, onChangeText: this.onChangeTextAlipayName.bind(this) }}
                                />
                            </View>
                            {inputForm}
                        </View>
                    </ScrollView>
                    <BottomBtn value={'提交保存'} onPress={this.onSubmit.bind(this)} />
                </View>
            </View>
        )
    }
    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.subscriptions = [
                Keyboard.addListener('keyboardDidShow', this._keyboardDidShow),
                Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
            ];
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'ios') {
            this.subscriptions.forEach((sub) => sub.remove());
        }
    }
    _keyboardDidShow = (e) => {
        if (!this.textInputView) return;
        this.needMove = false;
        this.refs[this.textInputView].measure((ox, oy, w, h, px, py) => {
            let conHeight=height-96;
            let leftHeight = conHeight - py;//输入框距离底部的距离 = （屏幕的高度 - 当前TextInput的高度）  
            //输入框距离底部的距离小于键盘的高度，需要滑动  
            if (leftHeight < e.startCoordinates.height + 25) {
                this.needMove = true;
                // 需要移动的距离  
                let moveHeight = 30 + (e.startCoordinates.height - leftHeight);
                console.log("this.moveH=" + this.moveH, "this.contentHeight=" + this.contentHeight, "height=" + height);
                //moveH 异常数据处理  
                if (this.moveH + conHeight > this.contentHeight && conHeight<this.contentHeight) {
                    this.moveH = this.contentHeight - conHeight;
                    console.log("===error===");
                }             
                this.lastMoveH = this.moveH;
                this.refs.scroll.scrollTo({ y: this.moveH + moveHeight, x: 0 });
            }
        });
    }

    _keyboardDidHide = () => {
        if (this.needMove) {
            this.refs.scroll.scrollTo({ y: this.lastMoveH, x: 0 });
        }
        this.textInputView = null;
    }
    _renderGroupItem(i) {
        let data = this.state.listdata[i];
        return (

            <View style={styles.SetViewList} key={i}>
                <View style={styles.SetViewListHd}>
                    <View><Text style={{ color: '#666' }}>快捷设置{i + 1}</Text></View>
                    <TouchableOpacity style={[Theme.flexDirection, { flexDirection: 'row' }]} onPress={this.deleteInputForm.bind(this,i)}>
                        <Icon name={'delete'} size={16} color={'#999'} />
                        <Text style={{ color: '#666', marginLeft: 5, }}>删除</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.inputView, styles.borderBt]}>
                    <Text style={styles.label}>常用注册手机号</Text>
                    <TextInput
                        style={styles.textInput}
                        ref={i}
                        onFocus={() => this.textInputView = i}
                        keyboardType={'numeric'}
                        maxLength={11}
                        defaultValue={data.c_phone}
                        onChangeText={(text) => { data.c_phone = text }}
                        clearButtonMode={'while-editing'}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={[styles.inputView, styles.borderBt]}>
                    <Text style={styles.label}>平台实名认证对应真实姓名</Text>
                    <TextInput
                        style={styles.textInput}
                        ref={i + 100}
                        onFocus={() => this.textInputView = i + 100}
                        defaultValue={data.c_username}
                        onChangeText={(text) => { data.c_username = text }}
                        clearButtonMode={'while-editing'}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </View>

        )
    }
    componentDidMount() {
        this.getData();
    }
    onSubmit() {
        let url = Api.memberModSet;

        let memberId = signState.r_id;
        let listdata = this.state.listdata;
        let alipayid = this.state.alipay;
        let alipayname = this.state.alipayName;

        if (FormValidation.empty(alipayid, '支付宝账号不能为空') == false) {
            return;
        }
        if (FormValidation.empty(alipayname, '支付宝对应真实姓名不能为空') == false) {
            return;
        }


        for (let j = 0; j < listdata.length; j++) {
            if (FormValidation.phoneValid(listdata[j].c_phone, '快捷设置' + (j + 1) + ':') == false) {
                return;
            }
        }

        let formData = new FormData();
        for (let i = 0; i < listdata.length; i++) {
            formData.append('listdata' + '[' + i + ']' + '.id', listdata[i].id);
            formData.append('listdata' + '[' + i + ']' + '.c_userid', listdata[i].c_userid);
            formData.append('listdata' + '[' + i + ']' + '.c_phone', listdata[i].c_phone);
            formData.append('listdata' + '[' + i + ']' + '.c_username', listdata[i].c_username);
        }
        formData.append("memberid", memberId);
        formData.append("alipayid", alipayid);
        formData.append("alipayname", alipayname);

        let opt = {
            method: 'POST',
          
            body: formData
        }
        console.log(formData)
        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {

                                Alert.alert(null, '修改成功',
                                    [
                                        { text: 'OK', onPress: () => { } },
                                    ])
                            }
                            else {
                                Alert.alert('提示', responseData.resultmsg)
                            }
                        }))
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => { console.error(error) })
    }
    getData() {
        let that = this;
        let memberId = signState.r_id;
        let url = Api.memberSet + memberId;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            let len = responseData.data.listdata.length

                            that.setState({
                                listdata: responseData.data.listdata,
                                alipay: responseData.data.alipayid,
                                alipayName: responseData.data.alipayname,
                                len: len
                            })
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }
    onChangeTextAlipay(text) {
        this.setState({
            alipay: text
        })
    }
    onChangeTextAlipayName(text) {
        this.setState({
            alipayName: text
        })
    }
    addInputForm() {
        var that = this;
        that.state.listdata.push(
            {
                id: 0,
                c_userid: '',
                c_phone: '',
                c_username: ''
            }
        )
        this.setState({
            len: this.state.len + 1,
        })
        setTimeout(() => {
            this.refs.scroll.scrollToEnd();
        }, 300)

    }
    deleteInputForm(index) {
        this.setState({
            len: this.state.len - 1,
        })
        this.state.listdata.splice(index, 1)
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
    },
    SetViewList: {
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    SetViewListHd: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputView: {
        flexDirection: 'row',
        height: 46,
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    borderBt: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    label: {
        width: 175,
        color: '#999'
    },
    textInput: {
        paddingLeft: 10,
        height: 46,
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
})    