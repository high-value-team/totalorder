import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Validator from 'validator';

import OrderItems from './OrderItems'

const styles = theme => ({
    root:{},
    container: {},
    title: {
        margin: theme.spacing.unit,
    },
    paper: {
        padding: '30px',
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3,
    },
});

class OrderItemsPage extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        submitOrder: PropTypes.func.isRequired,
        orderChanged: PropTypes.func.isRequired,
        projectID: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            submitEmail: '',
            submitEmailError: '',
        };
        console.log("items:" + props.items);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        if (!Validator.isEmail(this.state.submitEmail)) {
            this.setState({submitEmailError: 'invalid email'});
            return;
        }

        this.props.submitOrder(this.props.projectID, this.state.submitEmail, this.props.items);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={4}>
                    <Typography type="display2" className={classes.title} gutterBottom={true}>Total Order - Project {this.props.title}</Typography>
                    <div>
                        <TextField
                            id="title"
                            label="Your email"
                            className={classes.textField}
                            value={this.state.submitEmail}
                            onChange={(e) => this.setState({submitEmail: e.target.value})}
                            margin="normal"
                            type="title"
                        />
                        {this.state.submitEmailError ? <div id="submit-email-error">{this.state.submitEmailError}</div> : null}
                    </div>

                    <Typography type="headline" style={{margin: '8px', marginTop: '50px', color: '#0000008a'}}>Bring Items into total order:</Typography>
                    <OrderItems items={this.props.items} onOrder={this.props.orderChanged} />

                    <div>
                        <Button raised={true} color="primary" className={classes.button} onClick={this.onSubmit}>
                            Submit
                        </Button>
                    </div>

                </Paper>
            </div>
        );
    }
}


export default withStyles(styles)(OrderItemsPage);


