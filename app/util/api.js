'use strict';

const host = 'http://www.fanlimofang.com/DataApi/';
// const host = 'http://192.168.1.18:8083/DataApi/';

module.exports = {
    domain: 'http://www.fanlimofang.com',
    domainM: 'http://m.fanlimofang.com',
    home: host + 'GetHome',
    list: host + 'GetActivityList',
    listTag: host + 'GetActivityList_tag',
    detail: host + 'GetActivityDetail',
    comment: host + 'GetCommentList',
    login: host + 'Login',
    addcommentone: host + 'Addcommentone',
    addcommentmulti: host + 'Addcommentmulti',
    getmemberlist: host + 'Getmemberlist',
    getmembercommentRow: host + 'GetmembercommentRow',
    membermodcomment: host + 'membermodcomment',
    memberModPass: host + 'memberModPass',
    memberSet: host + 'memberSet?memberid=',
    memberModSet: host + 'memberModSet',
    memberModSet_alipay:host+'memberModSet_alipay', //快捷设置修改支付宝
    memberModSet_contact:host+'memberModSet_contact', //快捷设置修改设置或添加设置（id  当新增时id=0）
    memberModSet_contact_del:host+'memberModSet_contact_del', //快捷设置删除（memberid，id）
    memberdelcomment:host+'memberdelcomment',//删除留言
    getUserinfo: host + 'GetUserinfo', //QQ,wechat 登录
    getInfoList: host + 'GetInfoList', //常用问答
    searchJson:host+'Searchjson',//搜索简易列表
    searchActivity:host+'SearchActivity',//搜索详细列表
    getqqinfo: host + 'Getqqinfo' //单独获取QQ客服信息
}