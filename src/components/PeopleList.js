import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
  } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import AddToMyTeamButton from '../components/AddToMyTeamButton';
import RemoveFromMyTeamButton from '../components/RemoveFromMyTeamButton';

export default class PeopleList extends React.Component {

    render() {
        const {store} = this.context;
        const state = store.getState();
        const myTeamIds = state.myteam.map((p) => p.id);
        const filtered = state.people.filter 
            ? this.props.items.filter((p) => p.firstName.indexOf(state.people.filter) != -1 || p.lastName.indexOf(state.people.filter) != -1)
            : this.props.items;
        return (
            <View style={{flex: 1, marginTop: 0}}>
                {state.people.isLoading ? (
                    <ActivityIndicator style={{flex: 1}} size="large" />
                ):(
                    <FlatList data={filtered}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) =>
                            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingTop: 5, paddingBottom: 5}}>
                                <Avatar source={{uri: item.avatarUrl}} medium />
                                <View style={{flex: 1, paddingStart: 10}}>
                                    <Text style={{fontSize: 16,fontWeight: 'bold'}}>{item.lastName} {item.firstName}</Text>
                                    <Text style={{fontSize: 14, color: '#b2b2b2'}}>{item.dislocation}</Text>
                                </View>
                                {myTeamIds.indexOf(item.id) != -1 
                                    ? (<RemoveFromMyTeamButton containerStyle={{padding:10}} person={item} />)
                                    : (<AddToMyTeamButton containerStyle={{padding:10}} person={item}/>)}
                            </View>}
                    />
                )}
            </View>
        );
    } 
}

PeopleList.contextTypes = {
    store: PropTypes.object
};