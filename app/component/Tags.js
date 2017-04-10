import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Tags extends Component {
    render() {
        let styles = this.props.styles;
        return (
            <View style={[styles.tags]}>
                <Text style={styles.tagsText}>{this.props.tagsName}</Text>
            </View>
        )
    }
}