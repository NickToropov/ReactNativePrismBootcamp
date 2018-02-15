import React, { Component } from 'react';
import { Icon } from "react-native-elements";
import PropTypes from 'prop-types';

export default class AddToMyTeamButton extends React.Component {

    _addToMyTeam() {
        const {store} = this.context; 
        store.dispatch({type: 'ADD_TO_MY_TEAM', person: this.props.person});
    }

    render() {
        return <Icon name="add-circle-outline" containerStyle={this.props.containerStyle} onPress={() => this._addToMyTeam()} />;
    }
}

AddToMyTeamButton.contextTypes = {
    store: PropTypes.object
};