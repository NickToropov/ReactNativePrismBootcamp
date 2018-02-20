import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Icon } from "react-native-elements";
import styles from '../styles/styles';

export default class MyTeamListItem extends React.Component {
    
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <View style={{width: this.props.itemWidth, height: this.props.itemWidth, padding: 10}}>
                <Image source={{uri: this.props.avatarUrl}} style={{flex: 1}}  resizeMode="cover"/>
                <View style={{position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingLeft: 5}}>
                    <Text style={{fontSize: 16,fontWeight: 'bold', textAlign: 'right' }}>{this.props.lastName} {this.props.firstName}</Text>
                </View>                        
                <Icon name="remove-circle-outline" containerStyle={{position: 'absolute', top: 10, right: 10, padding: 5, backgroundColor: '#fff'}} onPress={() => this.props.onRemoveClick()}/>
            </View>
        );
    }
}
