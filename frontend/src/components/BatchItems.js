import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import AddIcon from 'material-ui-icons/Add';


const styles = theme => ({
    container: {
    },
    root: {
        fontFamily: 'Roboto, sans-serif',
        width: '100%',
    },
    row: {
        display: 'flex',
    },
    col: {
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '300px'
    },
    buttonWrap: {
        position: 'relative',
    },
    button: {
        position: 'absolute',
        bottom: '15px',
        left: '0',
    },
});

class BatchItems extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        onNewBatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            batchContent: '',
        };
        this.handleBatch = this.handleBatch.bind(this);
    }

    handleBatch () {
        var items = this.state.batchContent.split('\n').filter(item => item.length > 0);
        items = items.map((item) => ({
                id: this.randomID(),
                text: item,
            }
        ));
        console.log(items.length);
        this.props.onNewBatch(items);
        this.setState({batchContent: ''});
    }

    randomID() {
        return Math.random().toString(16).slice(-4);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.row}>
                <TextField
                    id="multiline-static"
                    multiline
                    rows="10"
                    value={this.state.batchContent}
                    className={[classes.textField, classes.col].join(' ')}
                    margin="normal"
                    fullWidth
                    onChange={(e)=> this.setState({batchContent: e.target.value})}
                />
                <div className={[classes.buttonWrap, classes.col].join(' ')}>
                    <AddIcon className={classes.button} onClick={this.handleBatch}/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(BatchItems);
