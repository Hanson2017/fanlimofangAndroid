import React, { Component } from 'react';
import {Navigator} from 'react-native';
import MainPage from './../page/MainPage'
import '../config/asyncStorage'
import StorageLoginInfo from '../config/storageLogin'

export default class Navigation extends Component{
    render(){
        let initialRoute={
            component:MainPage
        }
        return (
            <Navigator
                initialRoute={initialRoute}
                configureScene={this.configureScene}
                renderScene={this.renderScene}
             />
        )
    }
    configureScene(route, routeStack){
        return Navigator.SceneConfigs.FloatFromRight;
    }
    renderScene(route,navigator){
        let Component=route.component;
        return <Component navigator={navigator} route={route} {...route.params} />
    }
    componentDidMount() {
     StorageLoginInfo.storageLoad(this)
  }
}


