import * as types from './actionTypes';

export function filter(filter) {
    return {type: types.PEOPLE_FILTER, filter};
}

export function requestPeople() {
    return { type: types.REQUEST_PEOPLE };
}

export function requestPeopleSucceded(people) {
    return { type: types.REQUEST_PEOPLE_SUCCEDED, people };
}

export function requestPeopleFailed(error) {
    return { type: types.REQUEST_PEOPLE_FAILED, error };
}

export function fetchPeople() {
    return function(dispatch) {
        dispatch(requestPeople());
        return fetch('http://prism.akvelon.net/api/employees/all')
            .then(r => r.json())
            .then(r => r.map((p) => { 
                    return {
                        id: p.Id,
                        firstName: p.FirstName,
                        lastName: p.LastName,
                        email: p.Mail,
                        phone: p.Telephone,
                        dislocation: p.Dislocation,
                        avatarUrl: 'http://prism.akvelon.net/api/system/getphoto/' + p.Id
                    };
                }).sort((p1,p2) => (p1.lastName + ' ' + p1.firstName).localeCompare(p2.lastName + ' ' + p2.firstName))
            )
            .then(r => {
                dispatch(requestPeopleSucceded(r));
            })
            .catch(err => {
                dispatch(requestPeopleFailed(err));
                throw(err);
            });
    }
}
