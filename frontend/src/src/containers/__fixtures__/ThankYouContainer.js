// import React  from 'react';
import ThankYouContainer from "../ThankYouContainer";

export default {
    component: ThankYouContainer,

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
};

