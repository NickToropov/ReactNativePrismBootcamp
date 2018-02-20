import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import * as myTeamActions from '../actions/myTeamActions';
import PeopleListItem from './PeopleListItem';

const PeopleList = props => {
    const myTeamIds = props.myteam.map((p) => p.id);
    const filtered = props.filter 
        ? props.items.filter((p) => p.firstName.indexOf(props.filter) != -1 || p.lastName.indexOf(props.filter) != -1)
        : props.items;
    return (
        <View style={{flex: 1}}>
            <FlatList data={filtered}
                keyExtractor={(item) => item.id.toString()}
                extraData={props.myteam}
                renderItem={({item}) =>
                    <PeopleListItem {...item} 
                        isInMyTeam={myTeamIds.indexOf(item.id) != -1} 
                        onRemoveClick={() => props.removeFromMyTeam(item)}
                        onAddClick={() => props.addToMyTeam(item)}/>
                }
            />
        </View>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        items: state.people.items,
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