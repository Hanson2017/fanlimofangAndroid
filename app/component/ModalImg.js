import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity, DeviceEventEmitter, Modal } from 'react-native';

import Theme from '../util/theme';

export default class ModalImg extends Component {
    render() {
        let that=this.props.that;
        return (
            
            <Modal visible={this.props.visible} animationType={'fade'}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => {
                        that.setState({
                            visible: false
                        })
                    }}
                >
                    <Image resizeMode={'center'} source={{ uri: this.props.uri }} style={{ width: Theme.screenWidth, height: 498 * Theme.screenWidth / 750 }} />
                </TouchableOpacity>
            </Modal>
        )
    }
}


