import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as boxActionCreators from '../Redux';
import PropTypes from 'prop-types';

import {withStyles} from "material-ui/styles/index";
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        fontFamily: 'Roboto, sans-serif',
        width: '100%',
    },
    paper: {
        padding: '30px',
        opacity: '0.9',
    },
    headline: {
        margin: '8px',
        marginTop: '30px',
        color: '#0000008a',
    },
});

class ThankYouContainer extends React.Component {

    static propTypes = {
        router: PropTypes.object.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        }
    }
    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography type="headline" color="inherit" style={{fontWeight:'bold', margin:'15px', marginLeft: '20px', color:'#0000008a'}}>
                    Thank You
                </Typography>
                <Paper className={classes.paper} elevation={4}>
                    <Typography type="title" className={classes.headline}>Thank you for submitting your total item order!</Typography>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps (state, props) {
    return {
        projectID: props.router.params.projectID,
        title: state.project.title,
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(boxActionCreators, dispatch);
}

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps,
)(ThankYouContainer));


