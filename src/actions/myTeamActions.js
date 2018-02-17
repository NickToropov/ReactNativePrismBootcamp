import * as types from './actionTypes';

export function add(person) {
    return {type: types.ADD_TO_MY_TEAM, person};
}

export function remove(person) {
    return {type: types.REMOVE_FROM_MY_TEAM, person};
}