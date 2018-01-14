import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
     width: '100%',
    },
    flex: {
        flex: '1',
    },
    menuButton: {
        marginLeft: '-12',
        marginRight: '20',
    },
});

function Navigation ({title, classes}) {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

Navigation.propTypes = {
    title: PropTypes.string,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);

