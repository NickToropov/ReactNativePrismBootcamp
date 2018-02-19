import React from 'react';
import { Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from '../styles/styles';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';

class LogoutButton extends React.Component {
    static goToToLoginScreenAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'LoginScreen'})
        ]
    });

    _logOut() {
        this.props.logout();
        this.props.navigation.dispatch(LogoutButton.goToToLoginScreenAction); 
    }

    render() {
        return <Text style={[styles.actionBarButton, { }]} onPress={() => this._logOut()}>Logout</Text>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(authActions.logout())
    };
}

export default connect(null, mapDispatchToProps)(LogoutButton);