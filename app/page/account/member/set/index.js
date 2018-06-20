import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Alert, Keyboard, Dimensions, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Api from '../../../../util/api';
import FormValidation from '../../../../util/FormValidation'
import Loading from '../../../../component/loading';
import NavBar from '../../../../component/navBar';
import InputList from '../../../../component/inputList';

var dismissKeyboard = require('dismissKeyboard');
var { width, height } = Dimensions.get('window');

export default class UserSet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ref: false,
            loading: true,
            memberId: null,
            alipay: '',
            alipayName: '',
            alipayForm: '',
            alipayNameForm: '',
            editAlipay: false,

            addisHidden: true,
            listdataAdd: {
                id: 0,
                c_phone: '',
                c_username: ''
            },
            listdata: [],
            listdataForm: [],
            editList: [],
        }
        this.contentHeight = 0;
        this.textInputView = null;//当前编辑的textInput
        this.moveH = 0;//ScrollView滑动的距离
        this.lastMoveH = 0;//保留上次滑动的距离
        this.needMove = false;//弹出键盘时，textInputView是否需要滑动
    }
    componentWillMount() {
        this.setState({
            memberId: signState.r_id
        })
        if (Platform.OS === 'ios') {
            this.subscriptions = [
                Keyboard.addListener('keyboardDidShow', this._keyboardDidShow),
                Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
            ];
        }
    }
    render() {
        const { alipay, alipayName, alipayForm, alipayNameForm, editAlipay, addisHidden, listdataAdd, listdata, listdataForm, editList } = this.state;
        return (
            <View style={styles.container}>
                <NavBar title={'快捷设置'} back={'快捷设置'} navigator={this.props.navigator} />
                {
                    this.state.loading ?
                        <Loading />
                        :
                        <View style={styles.content}>
                            <ScrollView ref={'scroll'}
                                onContentSizeChange={(contentWidth, contentHeight) => {
                                    this.contentHeight = parseInt(contentHeight);
                                }}
                                onScrollEndDrag={(e) => {
                                    this.moveH = e.nativeEvent.contentOffset.y;
                                }}>
                                <View style={styles.alipayForm}>
                                    <View style={styles.setHeader}>
                                        <View style={styles.setHeaderTit}>
                                            <Text style={styles.setHeaderTitText}>支付宝账号设置</Text>
                                        </View>
                                        {
                                            editAlipay ?
                                                null
                                                :
                                                <TouchableOpacity onPress={this.editAlipay.bind(this)}>
                                                    <Text style={styles.editText}>编辑</Text>
                                                </TouchableOpacity>
                                        }

                                    </View>
                                    {
                                        editAlipay ?
                                            <View style={styles.alipayFormBody}>
                                                <InputList
                                                    label={'支付宝账号'}
                                                    params={{ value: alipayForm, onChangeText: this.onChangeTextAlipay.bind(this) }}
                                                />
                                                <InputList
                                                    label={'真实姓名'}
                                                    params={{ value: alipayNameForm, onChangeText: this.onChangeTextAlipayName.bind(this) }}
                                                />
                                                <View style={styles.setEditBtnContainer}>
                                                    <TouchableOpacity style={[styles.setEditBtn, styles.setEditBtnCancel]} onPress={this.cancelAlipay.bind(this)}>
                                                        <Text style={[styles.setEditBtnText, styles.setEditBtnCancelText]}>取消</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[styles.setEditBtn, styles.setEditBtnSubmit]} onPress={this.submitAlipay.bind(this)}>
                                                        <Text style={[styles.setEditBtnText, styles.setEditBtnSubmitText]}>保存</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            :
                                            <View style={styles.alipayFormBody}>
                                                <View style={styles.setList}>
                                                    <View style={styles.setListLabel}>
                                                        <Text style={styles.setListLabelText}>支付宝帐号</Text>
                                                    </View>
                                                    <View style={styles.setListCon}>
                                                        <Text style={styles.setListConText}>{alipay}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.setList}>
                                                    <View style={styles.setListLabel}>
                                                        <Text style={styles.setListLabelText}>真实姓名</Text>
                                                    </View>
                                                    <View style={styles.setListCon}>
                                                        <Text style={styles.setListConText}>{alipayName}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                    }
                                </View>
                                <View style={styles.setInfoList}>
                                    <View style={styles.setHeader}>
                                        <View style={styles.setHeaderTit}>
                                            <Text style={styles.setHeaderTitText}>个人平台信息</Text>
                                        </View>
                                        {
                                            addisHidden ?
                                                <TouchableOpacity onPress={this.addSet.bind(this)}>
                                                    <Text style={styles.addText}>新增设置</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                        }
                                    </View>
                                    {
                                        addisHidden ?
                                            null
                                            :
                                            <View style={styles.addformList}>
                                                <View style={styles.setInfoListHd}>
                                                    <Text style={styles.setInfoListHdTitText}>快捷设置</Text>
                                                </View>
                                                <InputList
                                                    label={'常用手机号'}
                                                    params={{ type: "text", value: listdataAdd.c_phone, maxLength: 11, onChangeText: this.onChangeTextAddPhone.bind(this) }}
                                                />
                                                <InputList
                                                    label={'真实姓名'}
                                                    params={{ type: "text", value: listdataAdd.c_username, onChangeText: this.onChangeTextAddUsername.bind(this) }}
                                                />
                                                <View style={styles.setEditBtnContainer}>
                                                    <TouchableOpacity style={[styles.setEditBtn, styles.setEditBtnCancel]} onPress={this.cancelAdd.bind(this)}>
                                                        <Text style={[styles.setEditBtnText, styles.setEditBtnCancelText]}>取消</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={[styles.setEditBtn, styles.setEditBtnSubmit]} onPress={this.submitAdd.bind(this)}>
                                                        <Text style={[styles.setEditBtnText, styles.setEditBtnSubmitText]}>保存</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                    }
                                    {
                                        listdata.length == 1 && listdata[0].id == 0 ?
                                            <Text style={styles.null}>暂无设置</Text>
                                            :
                                            listdata.map((item, i) => {
                                                const isEdit = editList[i];
                                                const dataForm = listdataForm[i];
                                                return (
                                                    <View key={i}>
                                                        {
                                                            isEdit ?
                                                                <View style={styles.formList}>
                                                                    <View style={styles.setInfoListHd}>
                                                                        <View>
                                                                            <Text style={styles.setInfoListHdTitText}>快捷设置 {i + 1}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={[styles.inputView]}>
                                                                        <Text style={styles.label}>常用手机号</Text>
                                                                        <TextInput
                                                                            style={styles.textInput}
                                                                            type={"text"}
                                                                            value={dataForm.c_phone}
                                                                            maxLength={11}
                                                                            ref={'c_phone' + i}
                                                                            onChangeText={
                                                                                (text) => {
                                                                                    dataForm.c_phone = text
                                                                                    this.setState({
                                                                                        ref: !this.state.ref
                                                                                    })
                                                                                }}
                                                                            onFocus={() => this.textInputView = 'c_phone' + i}
                                                                            underlineColorAndroid="transparent" clearButtonMode={'while-editing'} />
                                                                    </View>
                                                                    <View style={[styles.inputView]}>
                                                                        <Text style={styles.label}>真实姓名</Text>
                                                                        <TextInput
                                                                            style={styles.textInput}
                                                                            type={"text"}
                                                                            value={dataForm.c_username}

                                                                            ref={'c_username' + i}
                                                                            onChangeText={
                                                                                (text) => {
                                                                                    dataForm.c_username = text
                                                                                    this.setState({
                                                                                        ref: !this.state.ref
                                                                                    })
                                                                                }}
                                                                            onFocus={() => this.textInputView = 'c_username' + i}
                                                                            underlineColorAndroid="transparent" clearButtonMode={'while-editing'} />
                                                                    </View>
                                                                    <View style={styles.setEditBtnContainer}>
                                                                        <TouchableOpacity style={[styles.setEditBtn, styles.setEditBtnCancel]} onPress={this.cancelSet.bind(this, i)}>
                                                                            <Text style={[styles.setEditBtnText, styles.setEditBtnCancelText]}>取消</Text>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity style={[styles.setEditBtn, styles.setEditBtnSubmit]} onPress={this.submitSet.bind(this, i)}>
                                                                            <Text style={[styles.setEditBtnText, styles.setEditBtnSubmitText]}>保存</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                                :
                                                                <View style={styles.formList}>
                                                                    <View style={styles.setInfoListHd}>
                                                                        <View>
                                                                            <Text style={styles.setInfoListHdTitText}>快捷设置 {i + 1}</Text>
                                                                        </View>
                                                                        {
                                                                            addisHidden ?
                                                                                <View style={styles.operation}>
                                                                                    <TouchableOpacity>
                                                                                        <Text style={styles.editText} onPress={this.editSet.bind(this, i)}>编辑</Text>
                                                                                    </TouchableOpacity>
                                                                                    <TouchableOpacity style={styles.del} onPress={this.delSet.bind(this, i)}>
                                                                                        <Text style={styles.delText}>删除</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                :
                                                                                null
                                                                        }


                                                                    </View>
                                                                    <View style={styles.setList}>
                                                                        <View style={styles.setListLabel}>
                                                                            <Text style={styles.setListLabelText}>常用手机号</Text>
                                                                        </View>
                                                                        <View style={styles.setListCon}>
                                                                            <Text style={styles.setListConText}>{item.c_phone}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={styles.setList}>
                                                                        <View style={styles.setListLabel}>
                                                                            <Text style={styles.setListLabelText}>真实姓名</Text>
                                                                        </View>
                                                                        <View style={styles.setListCon}>
                                                                            <Text style={styles.setListConText}>{item.c_username}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                        }

                                                    </View>
                                                )
                                            })
                                    }
                                </View>
                            </ScrollView>
                        </View>
                }

            </View>
        )
    }
    componentDidMount() {
        this.getData();
    }
    componentWillUnmount() {
        if (Platform.OS === 'ios') {
            this.subscriptions.forEach((sub) => sub.remove());
        }
    }
    editAlipay() {
        this.setState({
            editAlipay: true
        })
    }
    cancelAlipay() {
        this.setState({
            editAlipay: false
        })
    }
    onChangeTextAlipay(text) {
        this.setState({
            alipayForm: text
        })
    }
    onChangeTextAlipayName(text) {
        this.setState({
            alipayNameForm: text
        })
    }
    submitAlipay() {
        const that = this;
        const { memberId, alipayForm, alipayNameForm } = this.state;

        if (FormValidation.empty(alipayForm, '支付宝账号不能为空') == false) {
            return;
        }
        if (FormValidation.empty(alipayNameForm, '支付宝账号对应真实姓名不能为空') == false) {
            return;
        }

        const formData = new FormData();

        formData.append("memberid", memberId);
        formData.append("alipayid", alipayForm);
        formData.append("alipayname", alipayNameForm);

        const opt = {
            method: 'POST',
            body: formData
        }
        const url = Api.memberModSet_alipay;

        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {

                                Alert.alert(null, '修改成功',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                that.cancelAlipay()
                                                that.getData();
                                            }
                                        },
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

    addSet() {
        this.setState({
            addisHidden: false
        })
    }
    cancelAdd() {
        this.setState({
            addisHidden: true,
            listdataAdd: {
                id: 0,
                c_phone: '',
                c_username: ''
            }
        })
    }
    onChangeTextAddPhone(text) {
        this.state.listdataAdd.c_phone = text
        this.setState({
            ref: !this.state.ref
        })
    }
    onChangeTextAddUsername(text) {
        this.state.listdataAdd.c_username = text
        this.setState({
            ref: !this.state.ref
        })
    }
    submitAdd() {
        const listDataForm = this.state.listdataAdd;
        this.onSubmit(listDataForm)
    }

    editSet(i) {
        this.state.editList[i] = true;
        this.setState({
            ref: !this.state.ref
        })
    }
    cancelSet(i) {
        this.state.editList[i] = false;
        this.setState({
            ref: !this.state.ref
        })
    }
    delSet(i) {
        const that = this;
        Alert.alert(
            null,
            '确定删除本条快捷设置',
            [
                { text: '取消' },
                { text: '确认', onPress: () => { that.del(i) } },
            ]
        )

    }
    del(i) {
        const that = this;
        const listDataForm = this.state.listdataForm[i];
        const memberId = this.state.memberId;
        const id = listDataForm.id;

        const formData = new FormData();

        formData.append("memberid", memberId);
        formData.append("id", id);

        const opt = {
            method: 'POST',
            body: formData
        }

        const url = Api.memberModSet_contact_del;

        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {

                                Alert.alert(null, '删除成功',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                that.getData();
                                            }
                                        },
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
    submitSet(i) {
        const listDataForm = this.state.listdataForm[i];
        this.onSubmit(listDataForm, i)
    }

    onSubmit(data, i) {
        const that = this;
        const memberId = this.state.memberId;
        const id = data.id;
        const c_phone = data.c_phone;
        const c_username = data.c_username;

        if (FormValidation.phoneValid(c_phone) == false) {
            return;
        }

        const formData = new FormData();

        formData.append("memberid", memberId);
        formData.append("c_phone", c_phone);
        formData.append("c_username", c_username);
        formData.append("id", id);

        const opt = {
            method: 'POST',
            body: formData
        }

        const url = Api.memberModSet_contact;

        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {

                                Alert.alert(null, '提交成功',
                                    [
                                        {
                                            text: 'OK', onPress: () => {
                                                that.getData();
                                                if (i) {
                                                    that.cancelSet(i);
                                                }
                                                else {
                                                    that.cancelAdd()
                                                }
                                            }
                                        },
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

    _keyboardDidShow = (e) => {
        if (!this.textInputView) return;
        this.needMove = false;
        this.refs[this.textInputView].measure((ox, oy, w, h, px, py) => {
            let conHeight = height - 50;
            let leftHeight = conHeight - py;//输入框距离底部的距离 = （屏幕的高度 - 当前TextInput的高度）  
            //输入框距离底部的距离小于键盘的高度，需要滑动  
            console.log(e.startCoordinates.height)
            if (leftHeight < e.startCoordinates.height + 25) {
                this.needMove = true;
                // 需要移动的距离  
                let moveHeight = 30 + (e.startCoordinates.height - leftHeight);
                console.log("this.moveH=" + this.moveH, "this.contentHeight=" + this.contentHeight, "height=" + height);
                //moveH 异常数据处理  
                if (this.moveH + conHeight > this.contentHeight && conHeight < this.contentHeight) {
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
                            let isHiddenNew = [];

                            for (let i = 0; i < len; i++) {
                                isHiddenNew.push(false)
                            }

                            that.setState({
                                loading: false,
                                alipay: responseData.data.alipayid,
                                alipayName: responseData.data.alipayname,
                                alipayForm: responseData.data.alipayid,
                                alipayNameForm: responseData.data.alipayname,
                                listdata: responseData.data.listdata,
                                listdataForm: responseData.data.listdata,
                                editList: isHiddenNew,
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
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    content: {
        flex: 1,
    },
    setHeader: {
        height: 37,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    setHeaderTitText: {
        fontSize: 12,
        color: '#797979',
    },
    editText: {
        fontSize: 11,
        color: '#E62344',
    },
    addText: {
        fontSize: 12,
        color: '#E62344',
    },
    delText: {
        fontSize: 11,
        color: '#868686',
    },
    setList: {
        flexDirection: 'row',
        height: 24,
        alignItems: 'center',
    },
    setListLabel: {
        width: 65,
    },
    setListLabelText: {
        fontSize: 11,
        color: '#AEAEAE',
    },
    setListConText: {
        fontSize: 11,
        color: '#868686',
    },
    setEditBtnContainer: {
        marginTop: 8,
        marginBottom: 8,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    setEditBtn: {
        width: 150,
        height: 30,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    setEditBtnCancel: {
        backgroundColor: '#bcbcbc',
    },
    setEditBtnSubmit: {
        backgroundColor: '#e62344',
    },
    setEditBtnText: {
        fontSize: 11,
        color: '#fff',
    },
    alipayForm: {
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#fff',
    },
    alipayFormBody: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    setInfoList: {
        marginTop: 10,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#fff',
    },
    setInfoListHd: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    setInfoListHdTitText: {
        color: '#797979',
        fontSize: 12,
    },
    addformList: {
        paddingBottom: 10,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    formList: {
        paddingBottom: 10,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    operation: {
        flexDirection: 'row',
    },
    del: {
        marginLeft: 15,
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
    text: {
        fontSize: 11,
        color: '#6B6B6B',
    },
    textInput: {
        padding:0,
        paddingLeft: 8,
        width: 180,
        height: 22,
        fontSize: 11,
        color: '#6B6B6B',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
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
    null: {
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 11,
        color: '#ccc',
    }
})    