import {API_ROOT} from "./Config";

//
// api
//

// request: write, data mapping
// response: read, validate, data mapping

export function createProject(title, email, items, rearrangePageUrlSchema, summaryPageUrlSchema) {
    const itemList = items.map((item) => item.text);
    const body = JSON.stringify({
        title: title,
        productowneremail: email,
        items: itemList,
        rearrangePageUrlSchema: rearrangePageUrlSchema,
        summaryPageUrlSchema: summaryPageUrlSchema,
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Length', body.length);

    return new Promise((resolve, reject) => {
        fetch(`${API_ROOT}/api/v1/projects`, {
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
                reject(`API endpoint failed: resp: ${resp}`);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

export function createOrder(projectID, stakeholderemail, items) {
    const itemids = items.map((item) => item.id);
    const body = JSON.stringify({
        stakeholderemail: stakeholderemail,
        itemids: itemids,
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Length', body.length);

    return new Promise((resolve, reject) => {
        fetch(`${API_ROOT}/api/v1/projects/${projectID}/submissions`, {
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

export function fetchSummary(projectID) {
    return new Promise((resolve, reject) => {
        fetch(`${API_ROOT}/api/v1/projects/${projectID}/summary`, {
            method: 'GET',
        }).then(resp => {
            if (resp.ok) {
                resp.json().then(body => {
                    resolve({
                        title: body.title,
                        numberOfSubmissions: body.numberOfSubmissions,
                        items: body.items.map((item, index) => ({id: index, text: item})),
                    });
                    // resolve(body);
                });
            } else {
                reject(`API endpoint failed: resp: ${JSON.stringify(resp, null, 2)}`);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

export function getItems(projectID) {
    return new Promise((resolve, reject) => {
        fetch(`${API_ROOT}/api/v1/projects/${projectID}/items`, {
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

export function getVersion() {
    return new Promise((resolve, reject) => {
        fetch(`${API_ROOT}/api/v1/version`, {
            method: 'GET',
        }).then(resp => {
            if (resp.ok) {
                resp.text().then(version => {
                    console.log(`version:${version}`);
                    resolve(version);
                });
            } else {
                console.warn(`getVersion():${JSON.stringify(resp, null, 2)}`);
                reject(`API endpoint failed: resp: ${JSON.stringify(resp, null, 2)}`);
            }
        }).catch(err => {
            reject(err);
        });
    });
}


