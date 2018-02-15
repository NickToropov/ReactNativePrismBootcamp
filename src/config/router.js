import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom  } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
//import MainScreen from '../screens/MainScreen';
import PeopleScreen from '../screens/PeopleScreen';
import MyTeamScreen from '../screens/MyTeamScreen';


const MainScreen = TabNavigator({
    PeopleScreen: { screen: PeopleScreen },
    MyTeamScreen: { screen: MyTeamScreen }
}, {
    tabBarOptions: {
        activeTintColor: '#1C78FE',
        inactiveTintColor: '#b2b2b2',
        upperCaseLabel: false,
        showIcon: true,
        indicatorStyle: {
          backgroundColor: 'white'
        },
        labelStyle: {
          fontSize: 14,
        },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
});

const RootNavigator = StackNavigator({
    LoginScreen: { screen: LoginScreen },
    HomeScreen: { screen: HomeScreen },
    MainScreen: { screen: MainScreen }
}, {
    initialRouteName: 'HomeScreen',
    headerMode: 'screen',
});

export default RootNavigator;