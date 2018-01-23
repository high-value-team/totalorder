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
    container: {
        width: '100%',
    },
    innerContainer: {
        maxWidth: '900px',
        margin: '0px auto',
    },
    paper: {
        padding: '30px',
    },
    headline: {
        margin: '8px',
        marginTop: '50px',
        color: '#0000008a',
    },
});

class InvitationContainer extends React.Component {

    static propTypes = {
        router: PropTypes.object.isRequired,
        submitProject: PropTypes.func.isRequired,
        loadSummary: PropTypes.func.isRequired,
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
                <Paper className={classes.paper} elevation={4}>
                    <Typography type="headline" className={classes.headline}>Total Order: Project {this.props.title}</Typography>
                    <Typography type="headline" className={classes.headline}>{this.props.itemCount} Items</Typography>
                    <Typography type="headline" className={classes.headline}>Invitation Link: <a href={this.state.invitationLink}>{this.state.invitationLink}</a></Typography>
                    <Typography type="headline" className={classes.headline}>Admin Link: <a href={this.state.adminLink}>{this.state.adminLink}</a></Typography>
                </Paper>
            </div>
        );
    }
}

function mapStateToProps (state, props) {
    // console.log(`state.project.items.length:${state.project.items.length}`);
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


