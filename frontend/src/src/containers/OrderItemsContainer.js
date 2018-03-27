import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import OrderItemsPage from '../components/OrderItemsPage';
import * as projectActionCreators from '../Redux';

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
            <div>
                <Typography type="headline" color="inherit" style={{fontWeight:'bold', margin:'15px', marginLeft: '20px', color:'#0000008a'}}>
                    Bring Items Into Total Order
                </Typography>
                <OrderItemsPage {...this.props} />
            </div>
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

