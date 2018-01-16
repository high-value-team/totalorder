import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import ItemList from './ItemList';
import BatchItems from './BatchItems';

const styles = theme => ({
    root: {
        fontFamily: 'Roboto, sans-serif',
        width: '100%',
    },
    paper: {
        padding: '30px',
    },
    container: {
    },
    title: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '300px'
    },
    textFieldBig: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '90%',
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 3,
    },
    headline: {
        margin: '8px',
        marginTop: '50px',
        color: '#0000008a',
    },
});

class Home extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        submitProject: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            email: '',
            items: [],
            newItemElement: '',
            itemBlockElement: '',
        };
        this.createProject = this.createProject.bind(this);
        this.setItems = this.setItems.bind(this);
        this.appendItems = this.appendItems.bind(this);
    }

    createProject () {
        this.props.submitProject(this.state.title, this.state.email, this.state.items);
    }

    setItems (items) {
        this.setState({items:items});
    }

    appendItems (items) {
        const newItems = [...this.state.items, ...items];
        console.log("newItems:" + newItems);
        this.setState({items:newItems});
    }

    render() {

        const { classes } = this.props;
        const state = this.state;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={4}>
                    <Typography className={classes.title} type="display2" gutterBottom={true}>Create Project</Typography>
                    <div>
                        <TextField
                            id="title"
                            label="Project Title"
                            className={classes.textField}
                            value={state.title}
                            onChange={(e) => this.setState({title: e.target.value})}
                            margin="normal"
                            type="title"
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="Your Email"
                            className={classes.textField}
                            value={state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            margin="normal"
                            type="email"
                        />
                    </div>

                    <Typography type="headline" className={classes.headline}>Items to order:</Typography>
                    <ItemList items={state.items} onChangeItems={(items) => this.setItems(items)}/>

                    <Typography type="headline" className={classes.headline}>Add batch of Items:</Typography>
                    <BatchItems onNewBatch={(items) => this.appendItems(items)}/>

                    <div>
                        <Button raised={true} color="primary" className={classes.button} onClick={this.createProject}>
                            Create Project
                        </Button>
                    </div>

                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
