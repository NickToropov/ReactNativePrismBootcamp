import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Icon } from "react-native-elements";

export default class PeopleListItem extends React.PureComponent {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingTop: 5, paddingBottom: 5}}>
                <Avatar source={{uri: this.props.avatarUrl}} medium />
                <View style={{flex: 1, paddingStart: 10}}>
                    <Text style={{fontSize: 16,fontWeight: 'bold'}}>{this.props.lastName} {this.props.firstName}</Text>
                    <Text style={{fontSize: 14, color: '#b2b2b2'}}>{this.props.dislocation}</Text>
                </View>
                {this.props.isInMyTeam
                    ? (<Icon name="remove-circle-outline" containerStyle={{padding:10}} onPress={() => this.props.onRemoveClick()}/>)
                    : (<Icon name="add-circle-outline" containerStyle={{padding:10}} onPress={() => this.props.onAddClick()} />)}
            </View>
        )
    }
}