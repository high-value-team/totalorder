import { fromJS } from 'immutable';

//
// constants
//

const CREATE_PROJECT = 'CREATE_PROJECT';

//
// actions
//


export function submitProject() {
    return function () {
    };
}

export function createProject() {
    return function () {
    };
}

//
// reducers
//

const initialState = fromJS({
    title: '',
    email: '',
    items: [],

    invitationKey: '',
    adminKey: '',

    totalOrder: [],
    orders: {},
});

export default function project (state = initialState, action) {
    switch (action.type) {
    case CREATE_PROJECT :
        return {
            ...state,
            title: action.title,
            email: action.email,
        };
        default :
        return state;
    }
}