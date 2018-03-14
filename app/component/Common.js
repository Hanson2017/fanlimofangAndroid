import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Tags from '../component/Tags'
module.exports = {
    isTag: function (val, text, styles) {
        //是否魔方保障 
        let isprotect = val ?
            (
                <Tags tagsName={text} styles={styles} />
            )
            : null
        return isprotect;
    },
    risklevel: function (val) {
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
    investType:function(val){
        // 投资类型
        let investType;
        switch (val) {
            case 0:
                investType = '首次出借'
                break;

            case 1:
                investType = '多次出借'
                break;
        }
        return investType;
    }
}

