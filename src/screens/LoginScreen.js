import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Card, FormLabel } from 'react-native-elements';
import styles from '../styles/styles';
import * as authActions from '../actions/authActions';

class LoginScreen extends React.Component {

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

        this._logIn = this._logIn.bind(this);
        this._validateInputs = this._validateInputs.bind(this);
    }

    _logIn() {
        if (!this._validateInputs())
            return;

        this.props.login(this._form.email, this._form.pwd)
            .then(r => this.props.navigation.dispatch(this.goToHomeScreenAction))
            .catch(err => Alert.alert(err.message));
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

    render() {
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
                    {this.props.auth.isLogging ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <View style={{alignSelf: 'flex-end'}} >
                            <Button title="Login" onPress={this._logIn} />
                        </View>
                    )}
                </Card>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password) => dispatch(authActions.login(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginScreen);