import React  from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

import { withStyles } from 'material-ui/styles';

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
        children: PropTypes.node,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    componentDidMount () {
    }

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                {/*<Navigation title={'Totalorder'}/>*/}
                <div className={classes.innerContainer}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(MainContainer);



