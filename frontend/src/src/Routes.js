import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import MainContainer from './containers/MainContainer';
import CreateProjectContainer from './containers/CreateProjectContainer';
import OrderItemsContainer from './containers/OrderItemsContainer';
import InvitationContainer from "./containers/InvitationContainer";
import SummaryContainer from "./containers/SummaryContainer";
import ThankYouContainer from "./containers/ThankYouContainer";
import ImprintContainer from "./containers/ImprintContainer";

export default function getRoutes (history) {
    return (
        <Router history={history}>
            <Route path="/" component={MainContainer}>
                <Route path="/:projectID/invitation" component={InvitationContainer} />
                <Route path="/:projectID/summary" component={SummaryContainer} />
                <Route path="/:projectID/items" component={OrderItemsContainer} />
                <Route path="/:projectID/thank-you" component={ThankYouContainer} />
                <Route path="/imprint" component={ImprintContainer} />

                <IndexRoute component={CreateProjectContainer}/>
            </Route>
        </Router>
    );
}
