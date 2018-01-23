import 'react-redux'
import * as api from '../Api'

//
// actions constants
//

const CREATE_PROJECT = 'CREATE_PROJECT';
const CHANGING_ORDER = 'CHANGING_ORDER';
const NEW_ID = 'NEW_ID';
const LOAD_ITEMS = 'LOAD_ITEMS';
const LOAD_VERSION = 'LOAD_VERSION';
const FETCHING_SUMMARY_SUCCESS = 'FETCHING_SUMMARY_SUCCESS';
const FETCHING_SUMMARY_ERROR = 'FETCHING_SUMMARY_ERROR';


//
// actions
//

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

function fetchingSummarySuccess(summary, projectID) {
    return {
        type: FETCHING_SUMMARY_SUCCESS,
        projectID: projectID,
        title: summary.title,
        numberOfSubmissions: summary.numberOfSubmissions,
        items: summary.items,
    }
}

function fetchingSummaryError(error) {
    return {
        type: FETCHING_SUMMARY_ERROR,
        error: error,
    }
}

//
// action creators
//

export function submitProject(project, changeRoute) {
    return function (dispatch) {
        api.createProject(project.title, project.email, project.items)
            .then((projectID) => {
                dispatch(newID(projectID));
                changeRoute(`/${projectID}/invitation`);
                console.log('Success in submitProject, projectID:', projectID);
            })
            .catch((err) => {
                console.warn('Error in submitProject', err);
            });
    };
}

export function submitOrder(projectID, stakeholderemail, items, changeRoute) {
    return function(dispatch) {
        api.createOrder(projectID, stakeholderemail, items)
            .then(() => {
                changeRoute(`/${projectID}/thank-you`);
                console.log('Success in createOrder');
            })
            .catch((err) => {
                console.warn('Error in createOrder', err);
            });
    }
}


export function fetchAndHandleSummary(projectID) {
    return function (dispatch) {
        api.fetchSummary(projectID)
            .then((summary) => dispatch(fetchingSummarySuccess(summary, projectID)))
            .catch((error) => dispatch(fetchingSummaryError(error)));
    }
}

export function loadItems(projectID) {
    return function(dispatch) {
        api.getItems(projectID)
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

export function loadVersion() {
    return function(dispatch) {
        api.getVersion()
            .then((version) => {
                dispatch({
                    type: LOAD_VERSION,
                    version: version,
                });
            })
            .catch((err) => {
                console.warn('Error in loadVersion:', err);
            });
    }
}

//
// reducers
//

// TODO schema definition?
// https://github.com/scotthovestadt/schema-object
// https://github.com/molnarg/js-schema
// https://github.com/gcanti/tcomb
const initialState = {
    projectID: '',
    title: '',
    email: '',
    items: [
        // {id: 'a', text: 'item 1'},
        // {id: 'b', text: 'item 2'},
        // {id: 'd', text: 'item 4'},
        // {id: 'c', text: 'item 3'},
    ],
    numberOfSubmissions: 0,
    version: '',
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
        case FETCHING_SUMMARY_SUCCESS:
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
        case LOAD_VERSION:
            return {
                ...state,
                version: action.version,
            };
        default :
            return state;
    }
}
