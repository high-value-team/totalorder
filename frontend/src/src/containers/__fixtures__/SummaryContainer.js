// import React  from 'react';
import SummaryContainer from "../SummaryContainer";

export default {
    component: SummaryContainer,

    props: {
        router: {
            params: {
                projectID: "ID"
            }
        },
        project: {
            title: "hello world",
            email: "florian@fnkb.cc",
        },
    },

    // to avoid the following error: Could not find "store" in either the context or props of "Connect
    reduxState: {
    },

    fetch: [
        {
            matcher: '/api/v1/projects/ID/summary',
            response: {
                title: "my-title",
                numberOfSubmissions: 42,
                items: [ "item-1", "item-2", "item-3"],
            },
        }
    ]
};

