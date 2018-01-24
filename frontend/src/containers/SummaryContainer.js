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
    orderedList: {
        // listStyleType: 'none',
        // padding: '0px',
    },
    listItem: {

    },
});

class SummaryContainer extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.loadSummary(this.props.projectID)
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={4}>
                    <Typography type="headline" className={classes.headline}>Total Order: Project {this.props.title}</Typography>
                    <Typography type="headline" className={classes.headline}>{this.props.numberOfSubmissions} submissions</Typography>
                    <Typography type="headline" className={classes.headline}>Current total order:</Typography>
                    <ol className={classes.orderedList}>
                        {this.props.items.map( (item, index) => {
                            return <li key={item.id} className={classes.listItem}>{item.text}</li>
                        })}
                    </ol>
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

