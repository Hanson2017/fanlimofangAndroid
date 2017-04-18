'use strict';

const host = 'http://www.fanlimofang.com/DataApi/';

module.exports = {
    domain: 'http://www.fanlimofang.com',
    home: host + 'GetHome',
    list: host + 'GetActivityList',
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
    getUserinfo: host + 'GetUserinfo', //QQ,wechat 登录
    getInfoList: host + 'GetInfoList' //常用问答
}