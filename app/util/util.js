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
        return year + '-' + month + '-' + day
    },
    formatDate(date) {
        let d = this.setDate(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    formatSymbol(str) {
        let strs;
        strs = str.replace('，', ',')
        return strs.split(',');
    }

}
