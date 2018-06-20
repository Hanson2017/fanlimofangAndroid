import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert, DeviceEventEmitter, Modal, Platform, DatePickerAndroid, Picker } from 'react-native';
import Theme from '../../../../../util/theme';
import Api from '../../../../../util/api';
import Util from '../../../../../util/util';
import FormValidation from '../../../../../util/FormValidation'
import NavBar from '../../../../../component/navBar';
import Loading from '../../../../../component/loading';
import Select from '../../../../../component/select';
import Calendar from '../../../../../component/selectDate';
import TxtInput from '../../../../../component/inputList';
import SubmitBtn from '../../../../../component/submit';



export default class ActiveRecordEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: null,
            planList: null,
            userid: '',
            phone: '',
            realname: '',
            plan: 1,
            investdate: '',
            alipay: '',
            loading: true,
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <NavBar title={'活动记录修改'} back={'活动记录修改'} navigator={this.props.navigator} />
                    <Loading />
                </View>
            )

        }
        else {

            let comment_field = this.props.comment_field;
            const { dataSource } = this.state;
            // 方案
            let selectList = [];
            let plans = this.state.planList;
            for (let i = 0; i < plans.length; i++) {
                selectList.push({ number: plans[i].number, value: '方案' + plans[i].number })
            }

            let planstr = this.state.plan.toString()

            return (
                <View style={styles.container}>
                    <NavBar title={'活动记录修改'} back={'活动记录修改'} navigator={this.props.navigator} />
                    <Select ref="select" options={selectList} />
                    <Calendar ref="Calendar" />
                    <ScrollView style={styles.content}>
                        <View style={styles.activeEdit}>
                            <View style={styles.activeEditHd}>
                                <Text style={styles.platname}>
                                    {dataSource.platname}
                                </Text>
                                {
                                    dataSource.isrepeat === 0 ?
                                        <View style={[styles.type, styles.typeFirst]}>
                                            <Text style={[styles.typeText, styles.typeFirstText]}>首次出借</Text>
                                        </View>
                                        :
                                        <View style={[styles.type, styles.typeRepeat]}>
                                            <Text style={[styles.typeText, styles.typeRepeatText]}>多次出借</Text>
                                        </View>
                                }
                            </View>
                            <View style={styles.activeEditForm}>
                                {
                                    comment_field.indexOf('c_userid') >= 0 ?
                                        <TxtInput
                                            label={'注册ID'}
                                            params={{ value: this.state.userid, onChangeText: this.onChangeTextUserid.bind(this) }}
                                        />
                                        :
                                        null
                                }
                                {
                                    comment_field.indexOf('c_phone') >= 0 ?
                                        <TxtInput
                                            label={'注册手机号'}
                                            params={{ value: this.state.phone, maxLength: 11, keyboardType: 'numeric', onChangeText: this.onChangeTextPhone.bind(this) }}
                                        />
                                        :
                                        null
                                }
                                {
                                    comment_field.indexOf('c_username') >= 0 ?
                                        <TxtInput
                                            label={'真实姓名'}
                                            params={{ value: this.state.realname, onChangeText: this.onChangeTextRealname.bind(this) }}
                                        />
                                        :
                                        null
                                }

                                {Platform.OS === 'ios' ?
                                    <TxtInput
                                        label={'所选方案'}
                                        value={planstr}
                                        ViewInput={true}
                                        onPress={this._selectPlan.bind(this)}
                                    />
                                    :
                                    <View style={[styles.inputView]}>
                                        <Text style={styles.label}>所选方案</Text>
                                        <View style={styles.ViewInput}>
                                            <Picker
                                                style={{ height: 80, color: '#666', }}
                                                selectedValue={this.state.plan}
                                                onValueChange={(lang) => {
                                                    this.setState({
                                                        plan: lang
                                                    })
                                                }}
                                            >
                                                {selectList.map((aOption) => <Picker.Item itemStyle={{ fontSize: 12 }} label={aOption.value} value={aOption.number} key={aOption.number} />)}
                                            </Picker>
                                        </View>
                                    </View>
                                }
                                {
                                    comment_field.indexOf('investdate') >= 0 ?
                                        <TxtInput
                                            label={'出借日期'}
                                            value={this.state.investdate}
                                            ViewInput={true}
                                            onPress={Platform.OS === 'ios' ? this._selectData.bind(this) : this.showPicker.bind(this)}
                                        />
                                        :
                                        null
                                }
                                <TxtInput
                                    label={'支付宝账号'}
                                    borderBt={'null'}
                                    params={{ value: this.state.alipay, onChangeText: this.onChangeTextAlipay.bind(this) }}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.submitBtn}
                                activeOpacity={0.7}
                                onPress={this.onSubmit.bind(this)}
                            >
                                <Text style={styles.submitBtnText}>提交修改</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )
        }

    }

    onChangeTextUserid(text) {
        this.setState({
            userid: text
        })
    }
    onChangeTextPhone(text) {
        this.setState({
            phone: text
        })
    }
    onChangeTextRealname(text) {
        this.setState({
            realname: text
        })
    }
    onChangeTextInvestdate(text) {
        this.setState({
            investdate: text
        })
    }

    onChangeTextPlan(text) {
        this.setState({
            plan: text
        })
    }
    onChangeTextAlipay(text) {
        this.setState({
            alipay: text
        })
    }
    _selectPlan() {
        this.refs.select.show(this.state.plan)
    }
    _selectData() {
        this.refs.Calendar.show()
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
                    investdate: Util.setDate(date)
                })

            }
        }
        catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    onSubmit() {
        let that = this;
        let dataSource = this.state.dataSource;
        let memberId = signState.r_id;
        let id = dataSource.id;
        let activityid = dataSource.activityid;
        let activitynumber = dataSource.activitynumber;
        let alipayid = this.state.alipay;
        let data_c_userid = this.state.userid;
        let data_c_phone = this.state.phone;
        let data_c_username = this.state.realname;
        let data_activityplannumber = this.state.plan;
        let data_investdate = this.state.investdate;
        let url = Api.membermodcomment;

        let comment_field = this.props.comment_field;

        if (comment_field.indexOf('c_userid') >= 0) {
            if (FormValidation.empty(data_c_userid, '用户ID不能为空') == false) {
                return;
            }
        }
        if (comment_field.indexOf('c_phone') >= 0) {
            if (FormValidation.phoneValid(data_c_phone) == false) {
                return;
            }
        }
        if (comment_field.indexOf('c_username') >= 0) {
            if (FormValidation.empty(data_c_username, '真实姓名不能为空') == false) {
                return;
            }
        }
        if (FormValidation.empty(data_activityplannumber, '活动方案不能为空') == false) {
            return;
        }
        if (comment_field.indexOf('investdate') >= 0) {
            if (FormValidation.empty(data_investdate, '投资日期不能为空') == false) {
                return;
            }
        }
        if (FormValidation.empty(alipayid, '支付宝账号不能为空') == false) {
            return;
        }

        let formData = {
            memberid: memberId,
            id: id,
            activityid: activityid,
            activitynumber: activitynumber,
            alipayid: alipayid,
            data_c_userid: data_c_userid,
            data_c_phone: data_c_phone,
            data_c_username: data_c_username,
            data_activityplannumber: data_activityplannumber,
            data_investdate: data_investdate
        }

        let opt = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {

                                Alert.alert(null, '修改成功',
                                    [
                                        { text: 'OK', onPress: () => { that.goback() } },
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
    componentDidMount() {
        let that = this;
        this.getData();
        this.subscription = DeviceEventEmitter.addListener('select', (data) => {
            that.setState({
                plan: data
            })
        })
        this.subscription2 = DeviceEventEmitter.addListener('selectDate', (data) => {
            that.setState({
                investdate: data
            })
        })
    }
    componentWillUnmount() {
        this.subscription.remove();
        this.subscription2.remove();
    };
    getData() {
        let that = this;
        let memberId = signState.r_id;
        let id = this.props.id;
        let url = Api.getmembercommentRow + '?memberid=' + memberId + '&commentid=' + id;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            let comments = responseData.data.comment;
                            let planList = responseData.data.planlist;
                            let selectList = [];

                            for (let i = 0; i < planList.length; i++) {
                                selectList.push({ number: planList[i].number, value: '方案' + planList[i].number })
                            }
                            that.setState({
                                dataSource: comments,
                                planList: planList,
                                userid: comments.data_c_userid,
                                phone: comments.data_c_phone,
                                realname: comments.data_c_username,
                                plan: comments.data_activityplannumber,
                                investdate: comments.data_investdate,
                                alipay: comments.alipayid,
                                loading: false
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
    goback() {
        DeviceEventEmitter.emit('editComment', '修改成功')
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    activeEdit: {
        padding: 12,
        paddingTop: 0,
        backgroundColor: '#fff',
    },
    activeEditHd: {
        paddingTop: 15,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    platname: {
        fontSize: 12,
        color: '#666',
    },
    type: {
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 4,
        width: 55,
        height: 16,
    },
    typeText: {
        fontSize: 11,
        color: '#ccc',
    },
    typeFirst: {
        borderColor: '#67CBDB',
    },
    typeRepeat: {
        borderColor: '#ff9900',
    },
    typeFirstText: {
        color: '#67CBDB',
    },
    typeRepeatText: {
        color: '#ff9900',
    },
    inputView: {
        marginBottom: 10,
        flexDirection: 'row',
        height: 22,
        alignItems: 'center',
    },
    label: {
        width: 70,
        fontSize: 11,
        color: '#6B6B6B'
    },
    ViewInput: {
        paddingLeft: 8,
        width: 180,
        height: 22,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        borderRadius: 4,
    },
    submitBtn: {
        marginTop:10,
        height: 30,
        backgroundColor: '#f95252',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        backgroundColor: '#ccc',
    },
    submitBtnText: {
        color: '#fff',
        fontSize: 12,
    },
})