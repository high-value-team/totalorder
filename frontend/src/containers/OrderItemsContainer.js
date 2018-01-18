import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import OrderItemsPage from '../components/OrderItemsPage';
import * as projectActionCreators from '../redux/project';

class OrderItemsContainer extends React.Component {

    static propTypes = {
        router: PropTypes.object.isRequired,
        submitOrder: PropTypes.func.isRequired,
        orderChanged: PropTypes.func.isRequired,
        projectID: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.submitOrderWrapper = this.submitOrderWrapper.bind(this);
    }

    componentDidMount() {
        this.props.loadItems(this.props.projectID)
    }

    submitOrderWrapper(projectID, stakeholderemail, items) {
        // // TODO react-router-redux.push() method, instead of dependency injection
        const changeRoute = (url) => {this.props.router.replace(url)};
        this.props.submitOrder(projectID, stakeholderemail, items, changeRoute);
    }

    render () {
        // const project = this.props.project;
        // const project = JSON.parse(JSON.stringify(this.props.project)); // TODO workaround
        // console.log(`props:${JSON.stringify(project, null, 2)}`);
        return (
            <OrderItemsPage
                projectID={this.props.projectID}
                title={this.props.title}
                email={this.props.email}
                items={this.props.items}
                submitOrder={this.submitOrderWrapper}
                orderChanged={this.props.orderChanged}
            />
        );
    }
}

function mapStateToProps ({project}, props) {
    const {title, email, items} = project;
    return {
        projectID: props.router.params.projectID,
        title,
        email,
        items,
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(projectActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderItemsContainer);

