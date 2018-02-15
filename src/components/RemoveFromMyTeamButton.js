import React, { Component } from 'react';
import { Icon } from "react-native-elements";
import PropTypes from 'prop-types';

export default class RemoveFromMyTeamButton extends React.Component {

    _removeFromMyTeam() {
        const {store} = this.context; 
        store.dispatch({type: 'DELETE_FROM_MY_TEAM', person: this.props.person});
    }

    render() {
        return <Icon name="remove-circle-outline" containerStyle={this.props.containerStyle} onPress={() => this._removeFromMyTeam()} />;
    }
}

RemoveFromMyTeamButton.contextTypes = {
    store: PropTypes.object
};