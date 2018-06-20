import React, { Component } from 'react';
import { Text, StyleSheet, View,  TextInput,TouchableOpacity,Keyboard, Platform, DatePickerAndroid,Dimensions, Picker, DeviceEventEmitter,Alert } from 'react-native';

import Api from '../../../util/api';
import Util from '../../../util/util';
import FormValidation from '../../../util/FormValidation';
import InvestPic from './investPic';
import InputList from '../../../component/inputList';
import ActiveList from '../../account/member/activeList';
import Account from '../../account/index';

const { width, height } = Dimensions.get('window');

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: '',
            userID: '',
            userPhone: '',
            userRealName: '',
            investPlan: 1,
            investDate: Util.setDate(new Date()),
            alipayId: '',
            fileUri: '',
            fileName: '',
            userSetInfo: '',
            disabled: false,
            selectList: []
        }
        this.textInputView = null;//当前编辑的textInput
        this.lastMoveH = 0;//保留上次滑动的距离
        this.needMove = false;//弹出键盘时，textInputView是否需要滑动
    }
    componentWillMount() {
        //方案
        let selectList = []
        var plans = this.props.data.plans;
        for (let i = 0; i < plans.length; i++) {
            selectList.push({ number: plans[i].number, value: '方案' + plans[i].number })
        }
        this.setState({
            dataSource: this.props.data,
            selectList: selectList
        })
        if (Platform.OS === 'ios') {
            this.subscriptions2 = [
                Keyboard.addListener('keyboardDidShow', this._keyboardDidShow),
                Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
            ];
        }
    }
    render() {
        const { dataSource, userSetInfo, userID, userPhone, userRealName, investPlan, investDate, alipayId, investPic, selectList } = this.state;

        var acinfo = dataSource.acinfo;
        var plans = dataSource.plans;
        var comment_field = acinfo.activity.comment_field;

        return (
            <View style={[styles.FormContainer]}>
                {
                    signState !== null ?
                        <View style={styles.commentsFormFill}>
                            <View style={styles.commentsFormFillLabel}><Text style={styles.FillText}>一键填充：</Text></View>
                            <View style={styles.commentsFormFillPhones}>
                                {
                                    userSetInfo.listdata && userSetInfo.listdata.length > 0 ? userSetInfo.listdata.map((item, i) => {
                                        return (
                                            <TouchableOpacity style={styles.commentsFormFillPhone} key={i}
                                                onPress={() => {
                                                    this.setState({
                                                        userPhone: item.c_phone
                                                    })
                                                }}>
                                                <Text style={styles.FillText}>{item.c_phone}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                        :
                                        null
                                }

                            </View>
                        </View>
                        :
                        null
                }
                <View style={styles.commentsForm}>
                    {
                        comment_field.indexOf('c_userid') >= 0 ?
                            <View style={[styles.inputView]}>
                                <Text style={styles.label}>注册ID</Text>
                                <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                                    ref={'userID'}
                                    value={userID}
                                    placeholder={'请输入注册ID'}
                                    onChangeText={this.onChangeTextUserid.bind(this)}
                                    onFocus={()=>this.textInputView = 'userID'}
                                />
                            </View>
                            :
                            null
                    }
                    {
                        comment_field.indexOf('c_phone') >= 0 ?
                            <View style={[styles.inputView]}>
                                <Text style={styles.label}>注册手机号</Text>
                                <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                                    ref={'userPhone'}
                                    type={'text'}
                                    maxLength={11}
                                    value={userPhone}
                                    placeholder={'请输入注册手机号'}
                                    onChangeText={this.onChangeTextPhone.bind(this)}
                                    onFocus={()=>this.textInputView = 'userPhone'}
                                />
                            </View>
                            :
                            null
                    }
                    {
                        comment_field.indexOf('c_username') >= 0 ?
                            <View style={[styles.inputView]}>
                                <Text style={styles.label}>真实姓名</Text>
                                <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                                    ref={'userRealName'}
                                    value={userRealName}
                                    placeholder={'请输入真实姓名'}
                                    onChangeText={this.onChangeTextRealname.bind(this)}
                                    onFocus={()=>this.textInputView = 'userRealName'}
                                />
                            </View>
                            :
                            null
                    }
                    {Platform.OS === 'ios' ?
                        <InputList
                            label={'所选方案'}
                            value={investPlan.toString()}
                            ViewInput={true}
                            onPress={this._selectPlan.bind(this)}
                        />
                        :
                        <View style={[styles.inputView]}>
                            <Text style={styles.label}>所选方案</Text>
                            <View style={styles.ViewInput}>
                                <Picker
                                    style={{ height: 80, color: '#666',fontSize:11, }}
                                    selectedValue={investPlan}
                                    onValueChange={(lang) => {
                                        this.setState({
                                            investPlan: lang
                                        })
                                    }}
                                >
                                    {selectList.map((aOption) => <Picker.Item itemStyle={{ fontSize: 11 }} label={aOption.value} value={aOption.number} key={aOption.number} />)}
                                </Picker>
                            </View>
                        </View>
                    }
                    {
                        comment_field.indexOf('investdate') >= 0 ?
                            <InputList
                                label={'出借日期'}
                                value={investDate}
                                ViewInput={true}
                                onPress={Platform.OS === 'ios' ? this._selectData.bind(this) : this.showPicker.bind(this)}
                            />
                            :
                            null
                    }

                    {
                        comment_field.indexOf('img_invest') >= 0 ?
                            <InvestPic fileUri={this.state.fileUri} uri={acinfo.activity.img_invest} that={this} />
                            :
                            null
                    }
                    <View style={[styles.inputView]}>
                        <Text style={styles.label}>支付宝账号</Text>
                        <TextInput style={styles.textInput} underlineColorAndroid="transparent"
                            ref={'alipay'}
                            value={alipayId}
                            placeholder={'请输入收款支付宝账号'}
                            onChangeText={this.onChangeTextAlipay.bind(this)}
                            onFocus={()=>this.textInputView = 'alipay'}
                        />
                    </View>

                </View>
                <View style={styles.commentsSubmit}>
                    <TouchableOpacity style={[styles.submit, this.state.disabled ? styles.disabled : null]} 
                        onPress={signState !== null?!this.state.disabled ? this.handleSubmit.bind(this) : null:this.goLogin.bind(this)}
                    >
                        <Text style={styles.submitText}>
                            {!this.state.disabled ? '提交回帖' : '正在提交...'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    onChangeTextUserid(text) {
        this.setState({
            userID: text
        })
    }
    onChangeTextPhone(text) {
        this.setState({
            userPhone: text
        })
    }
    onChangeTextRealname(text) {
        this.setState({
            userRealName: text
        })
    }
    onChangeTextAlipay(text) {
        this.setState({
            alipayId: text
        })
    }
    _selectPlan() {
        const that = this.props.that;
        let selectNo = this.state.investPlan == '请选择' ? 1 : this.state.investPlan
        that.refs.select.show(this.state.investPlan)
    }
    _selectData() {
        const that = this.props.that;
        that.refs.Calendar.show()
    }
    async showPicker() {
        let that = this;
        try {
            var newState = {};
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day);
                that.setState({
                    investDate: Util.setDate(date)
                })
            }
        }
        catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    goLogin(){
        var { navigator } = this.props;
        Alert.alert('温馨提示', '请先登录后回帖！', [
            { text: '稍后', onPress: () => console.log('cancel') },
            {
                text: '前往', onPress: () => {
                    navigator.push({
                        component: Account
                    })
                }
            },
        ])
    }

    handleSubmit() {
        var { navigator } = this.props;
        var that = this;
        var thatt = this.props.that;
        var dataSource = this.state.dataSource;

        var memberid = 0; //用户ID 
        var username = '游客'; //登录用户名

        if (signState !== null) {
            memberid = signState.r_id;
            username = signState.r_username;
        }

        var activityid = dataSource.acinfo.activity.id; //活动ID
        var periodnumber = dataSource.acinfo.activity.number; // 期数 

        var userID = this.state.userID; //注册ID
        var userPhone = this.state.userPhone; //注册手机
        var userRealName = this.state.userRealName; //真实姓名
        var investPlan = this.state.investPlan; //投资方案
        var investDate = this.state.investDate; //投资日期
        var alipayId = this.state.alipayId; //支付宝账号
        var fileUri = this.state.fileUri;//投资截图
        var fileName = this.state.fileName;//投资截图

        var url = Api.addcommentmulti; //提交数据请求地址
        var comment_field = dataSource.acinfo.activity.comment_field; //需要提交的字段

        // userid 判断
        if (comment_field.indexOf('c_userid') >= 0) {
            if (FormValidation.empty(userID, '用户ID不能为空') == false) {
                return;
            }
        }
        // phone 判断
        if (comment_field.indexOf('c_phone') >= 0) {
            if (FormValidation.phoneValid(userPhone) == false) {
                return;
            }
        }
        // realname 判断
        if (comment_field.indexOf('c_username') >= 0) {
            if (FormValidation.empty(userRealName, '真实姓名不能为空') == false) {
                return;
            }
        }
        // plan 判断
        if (investPlan == '请选择') {
            Alert.alert('提示', '请选择方案')
            return;
        }

        // investdate 判断
        if (comment_field.indexOf('investdate') >= 0) {
            if (FormValidation.empty(investDate, '投资日期不能为空') == false) {
                return;
            }
        }

        // 投资截图判断
        if (comment_field.indexOf('img_invest') >= 0) {
            if (FormValidation.empty(fileUri, '请上传投资截图') == false) {
                return;
            }
        }

        if (FormValidation.empty(alipayId, '支付宝账号不能为空') == false) {
            return;
        }


        var formData = new FormData();

        if (comment_field.indexOf('img_invest') >= 0) {
            formData.append("img_invest1", { uri: fileUri, type: 'multipart/form-data', name: fileName });    //上传图片
        }
        else {
            formData.append("img_invest1", '')
        }

        formData.append("c_userid1", userID); // c_userid 用户注册id
        formData.append("c_phone1", userPhone); // c_phone 手机
        formData.append("c_username1", userRealName); // c_username 真实姓名
        formData.append("plannumber1", investPlan); // plannumber 方案
        formData.append("investdate1", investDate); // investdate 投资日期

        formData.append("addnum", '1'); // 
        formData.append("alipayid", alipayId); // alipayid 支付宝
        formData.append("activityid", activityid); // activityid 活动ID
        formData.append("periodnumber", periodnumber); // periodnumber 期数  
        formData.append("memberid", memberid); // memberid 用户ID 
        formData.append("username", username); // username 登录用户 

        let opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        }

        this.setState({
            disabled: true
        });
        console.log(formData)

        fetch(url, opt)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (response) {
                that.setState({
                    disabled: true
                });
                if (response.result == 1) {
                    Alert.alert('回帖成功', '可在个人中心查看进度', [
                        { text: '稍后', onPress: () => console.log('cancel') },
                        {
                            text: '前往', onPress: () => {
                                navigator.push({
                                    component: ActiveList
                                })
                            }
                        },
                    ])
                    that.setState({
                        userID: '',
                        userPhone: '',
                        userRealName: '',
                        investPlan: '',
                        investDate: Util.setDate(new Date()),
                        fileUri: '',
                        fileName: '',
                        disabled: false,
                    });
                }
                else {
                    Alert.alert('提示', response.resultmsg)
                }
            });
    }

    _keyboardDidShow = (e) => {
        console.log(this.textInputView)
        let { that, KeyboardAvoidingViewData } = this.props;
        let moveH = KeyboardAvoidingViewData.moveH;
        let contentHeight = KeyboardAvoidingViewData.contentHeight;
        if (!this.textInputView) return;
        this.needMove = false;
        this.refs[this.textInputView].measure((ox, oy, w, h, px, py) => {
            let conHeight = height - 60;
            let leftHeight = conHeight - py;//输入框距离底部的距离 = （屏幕的高度 - 当前TextInput的高度）  
            //输入框距离底部的距离小于键盘的高度，需要滑动  
            if (leftHeight < e.startCoordinates.height + 25) {
                this.needMove = true;
                // 需要移动的距离  
                let moveHeight = 30 + (e.startCoordinates.height - leftHeight);

                //moveH 异常数据处理  
                if (moveH + conHeight > contentHeight) {
                    moveH = contentHeight - conHeight;
                }
                this.lastMoveH = moveH;
                that.refs.scroll.scrollTo({ y: moveH + moveHeight, x: 0 });
            }
        });
    }

    _keyboardDidHide = () => {
        let that = this.props.that;
        if (this.needMove) {
            that.refs.scroll.scrollTo({ y: this.lastMoveH, x: 0 });
        }
        this.textInputView = null;
    }

    componentDidMount() {

        let that = this;

        if (signState !== null) {
            this.getUserSetInfo();
        }
        this.subscriptions = [
            DeviceEventEmitter.addListener('select', (data) => {
                that.setState({
                    investPlan: data
                })
            }),
            DeviceEventEmitter.addListener('selectDate', (data) => {
                that.setState({
                    investDate: data
                })
            })
        ]
    }
    componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.remove());
        if (Platform.OS === 'ios') {
            this.subscriptions2.forEach((sub) => sub.remove());
        }
    };

    getUserSetInfo() {
        let that = this;
        let memberId = signState.r_id;
        let url = Api.memberSet + memberId;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                userSetInfo: responseData.data,
                                alipayId: responseData.data.alipayid
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
}

const styles = StyleSheet.create({
    FormContainer: {
        padding: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    commentsFormFill: {
        flexDirection: 'row',
    },
    commentsFormFillLabel: {
        marginBottom: 10,
        width: 70,
    },
    FillText: {
        fontSize: 11,
        color: '#E62344',
    },
    inputView: {
        marginBottom:10,
        flexDirection: 'row',
        height: 22,
        alignItems: 'center',
    },
    label: {
        width: 70,
        fontSize: 11,
        color: '#6B6B6B'
    },    
    text: {
        fontSize: 11,   
        color: '#6B6B6B',
    },
    textInput: {
        padding:0,
        paddingLeft: 8,
        width:180,
        height: 22,
        fontSize: 11,
        color: '#6B6B6B',
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:4,
    },
    ViewInput: {
        paddingLeft: 8,
        width:180,
        height: 22,
        borderWidth:1,
        borderColor:'#ccc',
        justifyContent:'center',
        borderRadius:4,
    },
    commentsFormFillPhones: {
        width: 210,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    commentsFormFillPhone: {
        marginBottom: 10,
        width: 104,
    },
    commentsSubmit: {
        paddingLeft: 70,
    },
    submit: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        height: 18,
        backgroundColor: '#e62344',
        borderRadius: 4,
    },
    disabled: {
        backgroundColor: '#ccc',
    },
    submitText: {
        color: '#fff',
        fontSize: 11,
    }
})