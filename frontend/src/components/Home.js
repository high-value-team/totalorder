import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        fontFamily: 'Roboto, sans-serif',
        width: '100%',
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
    }

    createProject () {
        this.props.submitProject(this.state.title, this.state.email, this.state.items);
    }

    render() {

        const { classes } = this.props;
        const state = this.state;

        return (
            <div className={classes.root}>
                <form className={classes.container} noValidate={true} autoComplete="off">
                    <Typography className={classes.title} type="display1" gutterBottom={true}>Create Project</Typography>
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
                    <div>
                        <Button raised={true} color="primary" className={classes.button} onClick={this.createProject}>
                            Create Project
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
