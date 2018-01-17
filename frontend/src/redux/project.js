import { fromJS } from 'immutable';

//
// constants
//

const CREATE_PROJECT = 'CREATE_PROJECT';

//
// actions
//

export function submitProject(title, email, items) {
    return function (dispatch) {
        createProject(title, email, items)
            .then((id) => {
                console.log('Success in submitProject, id:', id);
            })
            .catch((err) => {
                console.warn('Error in submitProject', err);
            });
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

//
// helpers
//

export function createProject(title, email, items) {
    const body = JSON.stringify({
        title: title,
        productowneremail: email,
        items: items,
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Length', body.length);

    return new Promise((resolve, reject) => {
        // fetch('https://totalorder-backend.cloud.dropstack.run/api/v1/projects', {
        fetch('/api/v1/projects', {
            // mode: 'no-cors',
            method: 'POST',
            headers,
            body,
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(id => {
                    resolve(id);
                });
            } else {
                console.warn(`createProject():${JSON.stringify(resp, null, 2)}`);
                reject(`API endpoint failed: resp: ${JSON.stringify(resp, null, 2)}`);
            }
        }).catch(err => {
            reject(err);
        });
    });
}