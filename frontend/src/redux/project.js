import 'react-redux'

//
// constants
//

const CREATE_PROJECT = 'CREATE_PROJECT';
const CHANGING_ORDER = 'CHANGING_ORDER';
const NEW_ID = 'NEW_ID';
const LOAD_SUMMARY = 'LOAD_SUMMARY';
const LOAD_ITEMS = 'LOAD_ITEMS';

//
// actions
//

export function submitProject(project, changeRoute) {
    return function (dispatch) {
        createProject(project.title, project.email, project.items)
            .then((projectID) => {
                dispatch(newID(projectID));
                dispatch(changeRoute(`/${projectID}/invitation`));
                console.log('Success in submitProject, projectID:', projectID);
            })
            .catch((err) => {
                console.warn('Error in submitProject', err);
            });
    };
}

export function submitOrder(projectID, stakeholderemail, items, changeRoute) {
    return function(dispatch) {
        createOrder(projectID, stakeholderemail, items)
            .then(() => {
                dispatch(changeRoute(`/${projectID}/thank-you`));
                console.log('Success in createOrder');
            })
            .catch((err) => {
                console.warn('Error in createOrder', err);
            });
    }
}

function newID(projectID) {
    return {
        type: NEW_ID,
        projectID: projectID,
    }
}

export function orderChanged(items) {
    return {
        type: CHANGING_ORDER,
        items,
    }
}

export function loadSummary(projectID) {
    return function(dispatch) {
        getSummary(projectID)
            .then((body) => {
                dispatch({
                    type: LOAD_SUMMARY,
                    projectID: projectID,
                    title: body.title,
                    numberOfSubmissions: body.numberOfSubmissions,
                    items: body.items.map((item, index) => ({id: index, text: item})),
                });
            })
            .catch((err) => {
                console.warn('Error in loadSummary', err);
            });
    }
}

export function loadItems(projectID) {
    return function(dispatch) {
        getItems(projectID)
            .then((body) => {
                dispatch({
                    type: LOAD_ITEMS,
                    projectID: projectID,
                    title: body.title,
                    items: body.items,
                });
            })
            .catch((err) => {
                console.warn('Error in loadSummary', err);
            });
    }
}

//
// reducers
//

const initialState = {
    projectID: '',
    title: 'demoTitle',
    email: 'demoEmail',
    items: [
        {id: 'a', text: 'item 1'},
        {id: 'b', text: 'item 2'},
        {id: 'd', text: 'item 4'},
        {id: 'c', text: 'item 3'},
    ],
    numberOfSubmissions: 0,
};

export default function project (state = initialState, action) {
    switch (action.type) {
        case CREATE_PROJECT :
            return {
                ...state,
                title: action.title,
                email: action.email,
            };
        case CHANGING_ORDER :
            return {
                ...state,
                items: action.items,
            };
        case NEW_ID:
            return {
                ...state,
                projectID: action.projectID,
            };
        case LOAD_SUMMARY:
            return {
                ...state,
                projectID: action.projectID,
                title: action.title,
                numberOfSubmissions: action.numberOfSubmissions,
                items: action.items,
            };
        case LOAD_ITEMS:
            return {
                ...state,
                projectID: action.projectID,
                title: action.title,
                items: action.items,
            };
        default :
            return state;
    }
}

//
// helpers
//

function createProject(title, email, items) {
    const itemList = items.map((item) => item.text);
    const body = JSON.stringify({
        title: title,
        productowneremail: email,
        items: itemList,
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
                resp.text().then(projectID => {
                    resolve(projectID);
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

function createOrder(projectID, stakeholderemail, items) {
    const itemids = items.map((item) => item.id);
    const body = JSON.stringify({
        stakeholderemail: stakeholderemail,
        itemids: itemids,
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Length', body.length);

    return new Promise((resolve, reject) => {
        fetch(`/api/v1/projects/${projectID}/submissions`, {
            method: 'POST',
            headers,
            body,
        }).then(resp => {
            if (resp.ok) {
                resp.text().then(projectID => {
                    resolve(projectID);
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



function getSummary(projectID) {
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/projects/${projectID}/summary`, {
            method: 'GET',
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(body => {
                    resolve(body);
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

function getItems(projectID) {
    return new Promise((resolve, reject) => {
        fetch(`/api/v1/projects/${projectID}/items`, {
            method: 'GET',
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(body => {
                    resolve(body);
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

