import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as boxActionCreators from '../redux/project';
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
        paddingTop: '10px',
        paddingLeft: '30px',
        paddingBottom: '30px',
    },
});

class InvitationContainer extends React.Component {

    static propTypes = {
        router: PropTypes.object.isRequired,
        submitProject: PropTypes.func.isRequired,
        fetchAndHandleSummary: PropTypes.func.isRequired,
        projectID: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        itemCount: PropTypes.number.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        const baseUrl = window.location.protocol + "//" + window.location.host;
        this.state = {
            invitationLink: `${baseUrl}/${props.projectID}/items`,
            adminLink: `${baseUrl}/${props.projectID}/summary`,
        };
    }

    componentDidMount() {
        this.props.fetchAndHandleSummary(this.props.projectID)
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography type="headline" color="inherit" style={{fontWeight:'bold', margin:'15px', marginLeft: '20px', color:'#0000008a'}}>
                    Project Created
                </Typography>
                <Paper className={classes.paper} elevation={4}>
                    <Typography type="title" style={{color: '#0000008a', marginTop: '30px', marginRight: '10px'}}>
                        Invitation Link: <a href={this.state.invitationLink}>{this.state.invitationLink}</a>
                    </Typography>
                    <Typography type="title" style={{color: '#0000008a', marginTop: '10px', marginBottom: '20px', marginRight: '10px'}}>
                        Admin Link: <a href={this.state.adminLink}>{this.state.adminLink}</a>
                    </Typography>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps (state, props) {
    return {
        projectID: props.router.params.projectID,
        title: state.project.title,
        itemCount: state.project.items.length,

    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(boxActionCreators, dispatch);
}

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps,
)(InvitationContainer));


