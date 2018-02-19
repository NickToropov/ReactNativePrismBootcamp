import * as types from './actionTypes';

export function logout() {
    return { type: types.AUTH_LOGOUT };
}

export function requestLogin() {
    return { type: types.AUTH_LOGIN };
}

export function requestLoginSucceded(user) {
    return { type: types.AUTH_LOGIN_SUCCEDED, user };
}

export function requestLoginFailed(error) {
    return { type: types.AUTH_LOGIN_FAILED, error };
}

export function login(email, password) {
    return function(dispatch) {
        dispatch(requestLogin());
        return new Promise(resolve => setTimeout(resolve, 1000))
            .then(r => {
                if (email != 't@ttt.tt' || password != '123') {
                    throw {message: 'Invalid login or password'};
                }
            })
            .then(r => {
                dispatch(requestLoginSucceded({name: 'Demo user'}));
            })
            .catch(err => {
                dispatch(requestLoginFailed(err));
                throw(err);
            });
    }
}