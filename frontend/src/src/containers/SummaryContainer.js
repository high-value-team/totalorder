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
    container: {
        width: '100%',
    },
    innerContainer: {
        maxWidth: '900px',
        margin: '0px auto',
    },
    paper: {
        paddingTop: '30px',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingBottom: '30px',
        opacity: '0.9',
    },
    headline: {
        margin: '0px',
        // marginTop: '30px',
        color: '#0000008a',
    },
    orderedList: {
        // listStyleType: 'none',
        // padding: '10px',
        color: '#0000008a',
        listStylePosition: 'inside',
        marginLeft: '0px',
        paddingLeft: '0px',
        // padding: '0px'
    },
    listItem: {
        paddingTop: '15px',
    },
});

class SummaryContainer extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        projectID: PropTypes.string.isRequired,
        numberOfSubmissions: PropTypes.number.isRequired,
        items: PropTypes.array.isRequired,
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
        this.props.fetchAndHandleSummary(this.props.projectID);
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography type="headline" color="inherit" style={{fontWeight:'bold', margin:'15px', marginLeft: '20px', color:'#0000008a'}}>
                    Current Total Order
                </Typography>
                <Paper className={classes.paper} elevation={4}>
                    <Typography type="title" className={classes.headline}>Total order of {this.props.numberOfSubmissions} submissions:</Typography>
                    <ol className={classes.orderedList}>
                        {this.props.items.map( (item, index) => {
                            return <li key={item.id} className={classes.listItem}>{item.text}</li>
                        })}
                    </ol>
                    <Typography type="body1" style={{color: '#0000008a', marginTop: '50px', marginRight: '10px'}}>
                        Invitation Link: <a href={this.state.invitationLink}>{this.state.invitationLink}</a>
                    </Typography>
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
        numberOfSubmissions: state.project.numberOfSubmissions,
        items: state.project.items,
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(boxActionCreators, dispatch);
}

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps,
)(SummaryContainer));


