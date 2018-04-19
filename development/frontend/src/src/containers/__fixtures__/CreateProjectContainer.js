import CreateProjectContainer from "../CreateProjectContainer";

export default {
    component: CreateProjectContainer,

    reduxState: {},

    props: {
        submitProject: (obj) => {
            let str = JSON.stringify(obj, null, 2);
            console.log(`submitProject:\n${str}`);
        }
    },
};
