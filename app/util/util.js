import React, { Component } from 'react';
import { Linking } from 'react-native';

'use strict';

module.exports = {
    // 去掉所有的html标记
    delHtmlTag(str) {
        var strH = str.replace(/<[^>]+>/g, "");
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        strH = strH.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
        return strH;
    },
    Linked(url) {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    },
    setDate(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        return year + '/' + month + '/' + day
    },
    formatDate(date) {
        let d = this.setDate(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    formatSymbol(str) {
        let strs;
        strs = str.replace('，', ',')
        return strs.split(',');
    },
    countTime(val,dateDiff) {

        //获取当前时间  
        var date = new Date();
        var now = date.getTime()+dateDiff;
        //设置截止时间  
                
        var endDate = new Date(parseInt(val.replace("/Date(", "").replace(")/", "")));
        var end = endDate.getTime();

        //时间差  
        var leftTime = end - now;
    
        if (leftTime <= 0) {
            return '活动已结束';
        }
    
        //定义变量 d,h,m,s保存倒计时的时间  
        var d, h, m, s;
        if (leftTime >= 0) {
            d = Math.floor(leftTime / 1000 / 60 / 60 / 24) * 24;
            h = Math.floor(leftTime / 1000 / 60 / 60 % 24) + d;
            m = Math.floor(leftTime / 1000 / 60 % 60);
            s = Math.floor(leftTime / 1000 % 60);
        }
        //将倒计时赋值到div中  
    
        var mm=m < 10?'0'+m:m;
        var ss=s < 10?'0'+s:s;

        return h+':'+mm+':'+ss
    
    },
    risklevel(val) {
        // 风险等级
        let risklevel;
        switch (val) {
            case 1:
                risklevel = '风险极低'
                break;

            case 2:
                risklevel = '风险偏低'
                break;
            case 3:
                risklevel = '风险一般'
                break;
            case 4:
                risklevel = '风险偏高'
                break;
            case 5:
                risklevel = '风险极高'
                break;
        }
        return risklevel;
    },
    inType(val) {
        // 风险等级
        let investType;
        switch (val) {
            case 1:
                investType = '风控分'
                break;

            case 2:
                investType = '黄金类产品'
                break;
            case 3:
                investType = '基金类产品'
                break;
            case 4:
                investType = '固收类产品'
                break;
            case 5:
                investType = '风险极高'
            default:
                investType = '其他类产品'
        }
        return investType;
    }

}
