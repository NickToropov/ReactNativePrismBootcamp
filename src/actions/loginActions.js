import * as types from './actionTypes';

export function logging() {
    return {type: types.LOGGING};
}

export function login(user) {
    return {type: types.LOGIN, user};
}

export function logout() {
    return {type: types.LOGOUT};
}