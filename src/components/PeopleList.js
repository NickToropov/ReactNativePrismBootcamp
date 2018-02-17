import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator
  } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Icon } from "react-native-elements";
import styles from '../styles/styles';
import * as myTeamActions from '../actions/myTeamActions';

const PeopleList = props => {
    const myTeamIds = props.myteam.map((p) => p.id);
    const filtered = props.filter 
        ? props.items.filter((p) => p.firstName.indexOf(props.filter) != -1 || p.lastName.indexOf(props.filter) != -1)
        : props.items;
    return (
        <View style={{flex: 1}}>
            {props.isLoading ? (
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
                                ? (<Icon name="remove-circle-outline" containerStyle={{padding:10}} onPress={() => props.removeFromMyTeam(item)}/>)
                                : (<Icon name="add-circle-outline" containerStyle={{padding:10}} onPress={() => props.addToMyTeam(item)} />)}
                        </View>}
                />
            )}
        </View>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.people.isLoading,
        filter: state.people.filter,
        myteam: state.myteam
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToMyTeam: person => dispatch(myTeamActions.add(person)),
        removeFromMyTeam: person => dispatch(myTeamActions.remove(person)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (PeopleList);