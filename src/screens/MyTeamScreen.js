import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Avatar, Icon } from "react-native-elements";
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles';
import LogoutButton from '../components/LogoutButton';
import MyTeamTabBarTitle from '../components/MyTeamTabBarTitle';
import * as myTeamActions from '../actions/myTeamActions';

class MyTeamScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let title;
        if (navigation.state.params && navigation.state.params['title'])
            title = navigation.state.params['title'];
        return {
            title: 'My team',
            headerTitleStyle:{alignSelf: 'center'},
            headerRight: <LogoutButton navigation={navigation} />,
            tabBarIcon: ({ focused, tintColor }) => {
                return <MaterialIcon name="factory" size={25} color={tintColor} />;
            },
            tabBarLabel: ({ focused, tintColor }) => { 
                return <MyTeamTabBarTitle tintColor={tintColor} />;
            }
        }
    };

    render() {
        if (this.props.myteam.length < 1) {
            return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>There are no people in your team...</Text></View>
        }
        const {width} = Dimensions.get('window');
        const cardWidth = width / 2;
        return (
            <FlatList numColumns={2}
                data={this.props.myteam} 
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item, index}) =>
                    <View style={{width: cardWidth, height: cardWidth, padding: 10}}>
                        <Image source={{uri: item.avatarUrl}} style={{flex: 1}}  resizeMode="cover"/>
                        <View style={{position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingLeft: 5}}>
                            <Text style={{fontSize: 16,fontWeight: 'bold', textAlign: 'right' }}>{item.lastName} {item.firstName}</Text>
                        </View>                        
                        <Icon name="remove-circle-outline" containerStyle={{position: 'absolute', top: 10, right: 10, padding: 5, backgroundColor: '#fff'}} onPress={() => this.props.remove(item)}/>
                    </View>}
            />
        );
    }
};


function mapStateToProps(state, ownProps) {
    return {
        myteam: state.myteam
    }
}

function mapDispatchToProps(dispatch) {
    return {
        remove: person => dispatch(myTeamActions.remove(person))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(MyTeamScreen);