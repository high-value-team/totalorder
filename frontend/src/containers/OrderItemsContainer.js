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

    componentDidMount() {
        this.props.loadItems(this.props.projectID)
    }

    render () {
        return (
            <OrderItemsPage {...this.props} />
        );
    }
}

function mapStateToProps ({project}, props) {
    return {
        projectID: props.router.params.projectID,
        title: project.title,
        email: project.email,
        items: project.items ? project.items : [],
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(projectActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderItemsContainer);

