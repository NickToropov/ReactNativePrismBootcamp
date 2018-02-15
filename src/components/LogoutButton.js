import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import styles from '../styles/styles';

export default class LogoutButton extends React.Component {

    _logOut() {
        const {store} = this.context; 
        store.dispatch({type: 'LOGOUT'});
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen'})
            ]
        })); 
    }

    render() {
        return <Text style={[styles.actionBarButton, { }]} onPress={() => {this._logOut();}}>Logout</Text>;
    }
}

LogoutButton.contextTypes = {
    store: PropTypes.object
};