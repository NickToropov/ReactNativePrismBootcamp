import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import styles from '../styles/styles';

const MyTeamTabBarTitle = props => {
    return <Text style={[styles.tabBarLabel, {color: props.tintColor}]}>{'My team ('}{props.count}{')'}</Text>;
}

function mapStateToProps(state, ownProps) {
    return {
        count: state.myteam.length
    };
}

export default connect(mapStateToProps)(MyTeamTabBarTitle);