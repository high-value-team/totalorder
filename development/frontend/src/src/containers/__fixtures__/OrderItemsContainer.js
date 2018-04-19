// import React  from 'react';
import OrderItemsContainer from "../OrderItemsContainer";

export default {
    component: OrderItemsContainer,

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
        submitOrder: (...args) => {
            let str = JSON.stringify(args, null, 2);
            console.log(`submitOrder:\n${str}`);
        },
    },

    // to avoid the following error: Could not find "store" in either the context or props of "Connect
    reduxState: {
    },

    fetch: [
        {
            matcher: '/api/v1/projects/ID/items',
            response: {title: "my-title", items: [
                {id: "ID-1", text: "text-1"},
                {id: "ID-2", text: "text-2"},
                {id: "ID-3", text: "text-3"},
            ]},
        }
    ]
};

