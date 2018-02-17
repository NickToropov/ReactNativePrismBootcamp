import * as types from './actionTypes';

export function loading() {
    return {type: types.PEOPLE_LOADING};
}

export function loaded(error) {
    return {type: types.PEOPLE_LOADED, error};
}

export function filter(filter) {
    return {type: types.PEOPLE_FILTER, filter};
}