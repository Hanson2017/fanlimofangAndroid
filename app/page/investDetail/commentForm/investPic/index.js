import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Api from '../../../../util/api';
import ModalImg from '../../../../component/modalImg';
import CameraAction from '../../../../component/cameraAction';
export default class Pic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            preview: '',
        }
    }
    render() {
        const uri = Api.domain + this.props.uri;
        const fileUri = this.props.fileUri;
        return (
            <View style={[styles.container]}>
                <ModalImg that={this} visible={this.state.visible} uri={this.state.preview} />
                <View style={styles.label}><Text style={styles.labelText}>出借截图</Text></View>
                <View style={styles.investPic}>
                    <View>
                        <TouchableOpacity style={styles.picContainer} activeOpacity={0.7}
                            onPress={() => {
                                if (fileUri !== '') {
                                    this.setState({
                                        visible: true,
                                        preview: fileUri,
                                    })
                                }

                            }}
                        >
                            {
                                fileUri == '' ?
                                    <Text style={styles.picContainerText}>等待上传</Text>
                                    :
                                    <Image source={{ uri: fileUri }} style={styles.img} />
                            }

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.7}
                            onPress={CameraAction.cameraAction.bind(this, this.props.that)}
                        >
                            <Text style={styles.uploadBtnText}>本地上传</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.picContainer} activeOpacity={0.7} onPress={() => {
                            this.setState({
                                visible: true,
                                preview: uri,
                            })
                        }}>
                            <Image source={{ uri: uri }} style={styles.img} />
                        </TouchableOpacity>
                        <View style={styles.jietuView}>
                            <Text style={styles.jietuViewText}>截图示例</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        width: 70,
    },
    labelText: {
        fontSize: 11,
        color: '#6B6B6B',
    },
    investPic: {
        width: 180,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    picContainer: {
        width: 85,
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picContainerText: {
        color: '#C9C9C9',
        fontSize: 11,
    },
    uploadBtn: {
        marginTop: 6,
        width: 85,
        height: 18,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b3b0b0',
    },
    uploadBtnText: {
        fontSize: 11,
        color: '#fff',
    },
    jietuView: {
        marginTop: 6,
        width: 85,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    jietuViewText: {
        fontSize: 11,
        color: '#6B6B6B',
    },
    img: {
        width: 85,
        height: 55,
        borderRadius: 5,
    }
})
