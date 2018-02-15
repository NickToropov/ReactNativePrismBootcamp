import { LOAD, SAVE } from 'redux-storage';
import { NavigationActions } from 'react-navigation';

export const auth = (state = {}, action) => {
    switch (action.type) {
        case 'LOGGING': return {... state, isLogging: true};
        case 'LOGIN': return {... state, name: action.name, isLogging: false};
        case 'LOGOUT': return {};
        default: return state;
    }
}

export const people = (state = {isLoading: false, filter: '', error:{}}, action) => {
    switch (action.type) {
        case 'LOADING': return {... state, isLoading: true };
        case 'LOADED':
            return { ... state,
                isLoading: false,
                error: Object.assign({}, action.error),
                // items: action.people ? action.people.map((r) => {
                //     return {
                //         id: r.Id,
                //         firstName: r.FirstName,
                //         lastName: r.LastName,
                //         email: r.Mail,
                //         phone: r.Telephone,
                //         dislocation: r.Dislocation,
                //         avatarUrl: 'http://prism.akvelon.net/api/system/getphoto/' + r.Id};
                //     }) : []
            };
        case 'FILTER': 
            return {...state, filter: action.filter};
        default:
            return state;
    }
}

export const myteam = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TO_MY_TEAM': return state.find((p) => p.id == action.person.id) ? state : [...state, action.person].sort((p1,p2) => (p1.lastName + ' ' + p1.firstName).localeCompare(p2.lastName + ' ' + p2.firstName));
        case 'DELETE_FROM_MY_TEAM': return state.filter((p) => p.id != action.person.id);
        default: return state;
    }    
}

export const store = (state = { loaded: false }, action) => {
    switch (action.type) {
        case LOAD:
            console.log('Loading state...');
            return { ...state, loaded: true };

        case SAVE:
            console.log('Something has changed and written to disk!');

        default:
            return state;
    }
} 