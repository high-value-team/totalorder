import React from 'react';
import CreateProjectPage from '../components/CreateProjectPage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as boxActionCreators from '../redux/project';
import PropTypes from 'prop-types';

class CreateProjectContainer extends React.Component {

    static propTypes = {
        router: PropTypes.object.isRequired,
        submitProject: PropTypes.func.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.submitProjectWrapper = this.submitProjectWrapper.bind(this);
    }

    submitProjectWrapper(project) {
        // // TODO react-router-redux.push() method, instead of dependency injection
        const changeRoute = (url) => {this.props.router.replace(url)};
        this.props.submitProject(project, changeRoute);
    }

    render () {
        return (
            <div>
                <CreateProjectPage submitProject={this.submitProjectWrapper} />
            </div>
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
)(CreateProjectContainer);

