import React, { Component } from 'react';
import { Dimensions,}from 'react-native';

const { width, height } = Dimensions.get('window');

module.exports = {
    _keyboardDidShow(that,e) {
       
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
                if (this.moveH + conHeight > this.contentHeight) {
                    this.moveH = this.contentHeight - conHeight;
                    console.log("===error===");
                }
                this.lastMoveH = this.moveH;
                this.refs.scroll.scrollTo({ y: this.moveH + moveHeight, x: 0 });
            }
        });
    },

    _keyboardDidHide(that) {
        if (that.needMove) {
            that.refs.scroll.scrollTo({ y: that.lastMoveH, x: 0 });
        }
        that.textInputView = null;
    }
}