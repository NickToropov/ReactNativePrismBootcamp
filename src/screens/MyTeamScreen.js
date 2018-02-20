import React from 'react';
import { Dimensions, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles';
import LogoutButton from '../components/LogoutButton';
import MyTeamTabBarTitle from '../components/MyTeamTabBarTitle';
import * as myTeamActions from '../actions/myTeamActions';
import MyTeamListItem from '../components/MyTeamListItem';

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
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <MyTeamListItem {...item} itemWidth={cardWidth} onRemoveClick={() => this.props.remove(item)} />}
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