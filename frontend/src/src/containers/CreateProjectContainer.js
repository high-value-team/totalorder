import React from 'react';
import CreateProjectPage from '../components/CreateProjectPage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as boxActionCreators from '../Redux';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

class CreateProjectContainer extends React.Component {

    static propTypes = {
        submitProject: PropTypes.func.isRequired,
    };

    render () {
        return (
            <div>
                <Typography type="headline" color="inherit" style={{fontWeight:'bold', margin:'15px', marginLeft: '20px', color:'#0000008a'}}>
                    Create Project
                </Typography>
                <CreateProjectPage submitProject={this.props.submitProject} />
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

