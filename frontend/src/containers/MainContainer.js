import React  from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

import { withStyles } from 'material-ui/styles';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import * as boxActionCreators from "../redux/project";

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
});

class MainContainer extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        loadVersion: PropTypes.func.isRequired,
        version: PropTypes.string.isRequired,
        children: PropTypes.node,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.loadVersion();
    }

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Navigation title={'Totalorder'}/>
                <div className={classes.innerContainer}>
                    {this.props.children}
                    <p className="App-intro">{this.props.version}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {version: state.project.version};
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(boxActionCreators, dispatch);
}

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainContainer));



