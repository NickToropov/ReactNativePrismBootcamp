import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { Card, Avatar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import LogoutButton from '../components/LogoutButton';
import RemoveFromMyTeamButton from '../components/RemoveFromMyTeamButton';

export default class MyTeamScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let title;
        if (navigation.state.params && navigation.state.params['title'])
            title = navigation.state.params['title'];
        return {
            title: 'My team',
            headerTitleStyle:{alignSelf: 'center'},
            headerRight: <LogoutButton navigation={navigation} />,
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name="factory" size={25} color={tintColor} />;
            },
            tabBarLabel: ({ focused, tintColor }) => { 
                return <Text style={[styles.tabBarLabel, {color: tintColor}]}>{title || 'My team'}</Text>;
            }
        }
    };

    _updateTabBarTitle() {
        const {store} = this.context;
        const state = store.getState();
        this.props.navigation.setParams({'title': 'My team (' + state.myteam.length + ')'});
    }

    componentWillMount() {
        this._updateTabBarTitle();
    }

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            this._updateTabBarTitle();
            this.forceUpdate();            
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    } 

    render() {
        const {store} = this.context;
        const state = store.getState();
        if (state.myteam.length < 1) {
            return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>There are no people in your team...</Text></View>
        }
        const {width} = Dimensions.get('window');
        const cardWidth = width / 2;
        return (
            <FlatList numColumns={2}
                data={state.myteam} 
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) =>
                    <View style={{width: cardWidth, height: cardWidth, padding: 10}}>
                        <Image source={{uri: item.avatarUrl}} style={{flex: 1}}  resizeMode="cover"/>
                        <View style={{position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingLeft: 5}}>
                            <Text style={{fontSize: 16,fontWeight: 'bold', textAlign: 'right' }}>{item.lastName} {item.firstName}</Text>
                        </View>                        
                        <RemoveFromMyTeamButton containerStyle={{position: 'absolute', top: 10, right: 10, padding: 5, backgroundColor: '#fff'}} person={item} />
                    </View>}
            />
        );
    }
};


MyTeamScreen.contextTypes = {
    store: PropTypes.object
};