import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import LogoutButton from '../components/LogoutButton';

export default class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Wellcome',
            headerTitleStyle:{alignSelf: 'center'},
            headerRight: <LogoutButton navigation={navigation} />
        }
    };

    constructor(props) {
        super(props);

        this.goToLoginScreenAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'LoginScreen'})
                ]
            });
        
    }

    componentDidMount() {
        const {store} = this.context;
        const state = store.getState();
        if (!state.auth.name) {
            this.props.navigation.dispatch(this.goToLoginScreenAction)
        }
    } 

    render() {
        const {store} = this.context;
        const state = store.getState();
        if (!state.auth.name) {
            return <View />;
        }

        const goToMainScreenAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainScreen'})]
        });

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontSize: 20, alignSelf: 'center'}}>Hello, {state.auth.name}</Text>
                <Button title={"Continue"} style={{alignSelf: 'center'}} onPress={() => this.props.navigation.dispatch(goToMainScreenAction)} />
            </View>
        );
    }
}

HomeScreen.contextTypes = {
    store: PropTypes.object
};