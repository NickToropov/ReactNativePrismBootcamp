import { LOAD, SAVE } from 'redux-storage';
import * as types from '../actions/actionTypes';
import { NavigationActions } from 'react-navigation';

export const auth = (state = {}, action) => {
    switch (action.type) {
        case types.AUTH_LOGIN: 
            return {... state, isLogging: true};
        case types.AUTH_LOGIN_FAILED: 
            return {... state, isLogging: false};
        case types.AUTH_LOGIN_SUCCEDED: 
            return {... state, isLogging: false, name: action.user.name};
        case types.AUTH_LOGOUT: 
            return {};
        default: 
            return state;
    }
}

export const people = (state = {items: [], isLoading: false, filter: ''}, action) => {
    switch (action.type) {
        case types.REQUEST_PEOPLE: 
            return {... state, isLoading: true };
        case types.REQUEST_PEOPLE_FAILED: 
            return {... state, isLoading: false };
        case types.REQUEST_PEOPLE_SUCCEDED:
            return { ... state,
                isLoading: false,
                error: {},
                items: [...action.people]
            };
        case types.PEOPLE_FILTER: 
            return {...state, filter: action.filter};
        default:
            return state;
    }
}

export const myteam = (state = [], action) => {
    switch(action.type) {
        case types.ADD_TO_MY_TEAM: 
            return state.find((p) => p.id == action.person.id) 
                ? state 
                : [...state, Object.assign({}, action.person)].sort((p1,p2) => (p1.lastName + ' ' + p1.firstName).localeCompare(p2.lastName + ' ' + p2.firstName));
        case types.REMOVE_FROM_MY_TEAM:
            return state.filter((p) => p.id != action.person.id);
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