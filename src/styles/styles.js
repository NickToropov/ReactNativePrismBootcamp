import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 5,
        margin: 10,
        padding: 10,
        marginBottom:10,
    },
    cardTitle: {
        fontSize: 18,
    },
    divider: {
        backgroundColor:'#b2b2b2',
    },
    inputErrorMsg: {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 12
    },
    actionBarButton: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
        color: '#1C78FE'
    },
    tabBarLabel: {
        alignSelf: 'center',
        fontSize: 14,
        padding: 3
    }
});

export default styles;