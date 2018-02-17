import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from '../styles/styles';
import LogoutButton from '../components/LogoutButton';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Wellcome',
            headerTitleStyle:{alignSelf: 'center'},
            headerRight: <LogoutButton navigation={navigation} />
        }
    };

    static goToLoginScreenAction = NavigationActions.reset({
        index: 0,
        actions: [ NavigationActions.navigate({ routeName: 'LoginScreen'}) ]
    });

    componentDidMount() {
        if (!this.props.auth.name) {
            this.props.navigation.dispatch(HomeScreen.goToLoginScreenAction)
        }
    } 

    render() {
        if (!this.props.auth.name) {
            return <View />;
        }

        const goToMainScreenAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainScreen'})]
        });

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontSize: 20, alignSelf: 'center'}}>Hello, {this.props.auth.name}</Text>
                <Button title={"Continue"} style={{alignSelf: 'center'}} onPress={() => this.props.navigation.dispatch(goToMainScreenAction)} />
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps) (HomeScreen);