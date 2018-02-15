import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Icon } from "react-native-elements";
import PropTypes from 'prop-types';
import PeopleList from '../components/PeopleList'
import styles from '../styles/styles';
import LogoutButton from '../components/LogoutButton';

export default class PeopleScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'People',
            headerTitleStyle:{alignSelf: 'center'},
            headerRight: <LogoutButton navigation={navigation} />,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name="people" size={28} color={tintColor} />;
            },
            tabBarLabel: ({ focused, tintColor }) => { 
                return <Text style={[styles.tabBarLabel, {color: tintColor}]}>People</Text>;
            }
        }
    };

    _items = []

    _loadData() {
        const {store} = this.context;
        const state = store.getState();
        store.dispatch({type: 'LOADING'});

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
                });
            })
            .then((people) => {
                store.dispatch({type: 'LOADED'});
                this._items = people;
            })
            .catch((err) => {
                store.dispatch({type: 'LOADED', error: err});
                Alert.alert(err.message);
            });
    }

    _filter(filter = '') {
        const {store} = this.context;
        store.dispatch({type: 'FILTER', filter});
    }

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
        this._loadData();
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const state = store.getState();
        return (
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="search" containerStyle={{paddingLeft: 10}} />
                    <TextInput style={{flex: 1}} placeholder={'Find...'} onChangeText={(val) => this._filter(val)} value={state.people.filter} />
                    <Icon name="clear" onPress={() => this._filter()} containerStyle={{padding: 10}} />
                </View>
                <PeopleList items={this._items} />
            </View>
        );
    }
};


PeopleScreen.contextTypes = {
    store: PropTypes.object
};