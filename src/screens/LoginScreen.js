import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Card, FormLabel } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from '../styles/styles';

export default class LoginScreen extends React.Component {

    _form = {email: '', email_err: '', pwd:'', pwd_err: ''};

    static navigationOptions = ({ navigation }) => {
        return { header: null}
    };

    constructor(props) {
        super(props);

        this.goToHomeScreenAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeScreen'})
                ]
            });
    }

    _logIn() {
        if (!this._validateInputs())
            return;

        const {store} = this.context;
        store.dispatch({type: 'LOGGING'});

        new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        .then((r) => {
            if (this._form.email != 't@ttt.tt' || this._form.pwd != '123') {
                throw {message: 'Invalid login or password'};
            }

            store.dispatch({type: 'LOGIN', name: 'Demo user'});
            this.props.navigation.dispatch(this.goToHomeScreenAction)
        })
        .catch((err) => {
            store.dispatch({type: 'LOGIN', name: ''});
            Alert.alert(err.message);
        });
    }

    _validateInputs() {
        this._form.email_err = '';
        this._form.pwd_err = '';

        if (!this._form.email || this._form.email.length < 1) {
            this._form.email_err = 'email is required'
        }
        if (!this._form.pwd || this._form.pwd.length < 1) {
            this._form.pwd_err = 'password is required'
        }

        if (this._form.email_err || this._form.pwd_err) {
            this.forceUpdate();
            return false;
        }

        return true;
    }

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { navigate } = this.props.navigation;
        const { store } = this.context;
        const state = store.getState();

        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <Card title="Login into Prism"
                    containerStyle={[styles.cardContainer, {margin: 20}]}
                    titleStyle={styles.cardTitle}
                    dividerStyle={styles.divider} >

                    <TextInput placeholder="Email address..." keyboardType="email-address" onChangeText={(val) => this._form.email = val} />
                    {this._form.email_err ? <Text style={styles.inputErrorMsg}>{this._form.email_err}</Text>:<Text />}
                    <TextInput secureTextEntry placeholder="Password..." onChangeText={(val) => this._form.pwd = val} />
                    {this._form.pwd_err ? <Text style={styles.inputErrorMsg}>{this._form.pwd_err}</Text>:<Text />}
                    {state.auth.isLogging ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <View style={{alignSelf: 'flex-end'}} >
                            <Button title="Login" onPress={() => {this._logIn();}} />
                        </View>
                    )}
                </Card>
            </View>
        );
    }
}

LoginScreen.contextTypes = {
    store: PropTypes.object
};