import React from 'react';
import Home from '../components/Home';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as boxActionCreators from '../redux/project';
import PropTypes from 'prop-types';

class HomeContainer extends React.Component {

    static propTypes = {
        router: PropTypes.object.isRequired,
        submitProject: PropTypes.func.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentDidMount () {
    }

    render () {
        return (
            <Home
                submitProject={boxActionCreators.submitProject}
            />
        );
    }
}

function mapStateToProps (state) {
    return state;
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(boxActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeContainer);

