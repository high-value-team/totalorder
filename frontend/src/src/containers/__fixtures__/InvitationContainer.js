// import React  from 'react';
import InvitationContainer from "../InvitationContainer";

export default {
    component: InvitationContainer,

    props: {
        router: {
            params: {
                projectID: "my-project-ID"
            }
        },
        project: {
            title: "hello world",
        },
    },

    context: {
        router: {},
    },


    // to avoid the following error: Could not find "store" in either the context or props of "Connect
    reduxState: {
    },

    // fetch: [
    // ]
};

