import React, { Component } from 'react';
import {
  Text,
  TextInput,
  Alert,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button } from "react-native-elements";
import PeopleList from '../components/PeopleList'
import styles from '../styles/styles';
import LogoutButton from '../components/LogoutButton';
import * as peopleActions from '../actions/peopleActions';

class PeopleScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'People',
            headerTitleStyle:{alignSelf: 'center'},
            headerRight: <LogoutButton navigation={navigation} />,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name="people" size={28} color={tintColor} />;
            },
        }
    };

    _items = []

    _loadData() {
        this.props.fetchPeople()
            .catch(err => {
                Alert.alert(err.message);
            });
    }

    componentDidMount() {
        this._loadData();
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="search" containerStyle={{paddingLeft: 10}} />
                    <TextInput style={{flex: 1}} placeholder={'Find...'} onChangeText={this.props.filter} value={this.props.people.filter} />
                    <Icon name="clear" onPress={() => this.props.filter()} containerStyle={{padding: 10}} />
                </View>
                <PeopleList />
            </View>
        );
    }
};

function mapSateToProps(state, ownProps) {
    return {
        people: state.people
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPeople: () => dispatch(peopleActions.fetchPeople()),
        filter: filter => dispatch(peopleActions.filter(filter)),
    };
}

export default connect(mapSateToProps, mapDispatchToProps) (PeopleScreen);