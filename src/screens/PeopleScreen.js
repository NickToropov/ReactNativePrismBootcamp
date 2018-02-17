import React, { Component } from 'react';
import {
  Text,
  TextInput,
  Alert,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from "react-native-elements";
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
        this.props.loading();

        fetch('http://prism.akvelon.net/api/employees/all')
            .then((r) => {
                const body = JSON.parse(r._bodyText);
                if (r.status !== 200) {
                    throw body;
                }
                return body.map((p) => { 
                    return {
                        id: p.Id,
                        firstName: p.FirstName,
                        lastName: p.LastName,
                        email: p.Mail,
                        phone: p.Telephone,
                        dislocation: p.Dislocation,
                        avatarUrl: 'http://prism.akvelon.net/api/system/getphoto/' + p.Id
                    };
                }).sort((p1,p2) => (p1.lastName + ' ' + p1.firstName).localeCompare(p2.lastName + ' ' + p2.firstName));
            })
            .then((people) => {
                this._items = people;
                this.props.loaded();                
            })
            .catch((err) => {
                this.props.loaded(err);
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
                <PeopleList items={this._items} />
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
        loading: () => dispatch(peopleActions.loading()),
        loaded: error => dispatch(peopleActions.loaded(error)),
        filter: filter => dispatch(peopleActions.filter(filter)),
    };
}

export default connect(mapSateToProps, mapDispatchToProps) (PeopleScreen);