import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Validator from 'validator';

import ItemList from './ItemList';

const styles = theme => ({
    root: {
        // fontFamily: 'Roboto, sans-serif',
        // width: '100%',
    },
    paper: {
        paddingTop: '10px',
        paddingLeft: '30px',
        paddingBottom: '30px',
    },
    container: {
    },
    title: {
        // margin: theme.spacing.unit,
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        width: '250px'
    },
    textFieldBig: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        // width: '90%',
    },
    button: {
        marginTop: '50px',
        // marginLeft: theme.spacing.unit,
        // marginTop: theme.spacing.unit * 3,
    },
    headline: {
        // margin: '8px',
        // marginTop: '50px',
        // color: '#0000008a',
    },
});

class CreateProjectPage extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        submitProject: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleError: null,
            email: '',
            emailError: null,
            items: [],
            itemsError: null,
            newItemElement: '',
            itemBlockElement: '',
        };
        this.setItems = this.setItems.bind(this);
        this.appendItems = this.appendItems.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
    }

    onSubmit () {
        if (this.validate()) {
            const baseUrl = window.location.protocol + "//" + window.location.host;
            const rearrangePageUrlSchema = `${baseUrl}/{projectID}/items`;
            const summaryPageUrlSchema = `${baseUrl}/{projectID}/summary`;
            this.props.submitProject({
                title: this.state.title,
                email: this.state.email,
                items: this.state.items,
                rearrangePageUrlSchema: rearrangePageUrlSchema,
                summaryPageUrlSchema: summaryPageUrlSchema,
            });
        }
    }

    validate () {
        let isValid = true;

        // title
        if (this.state.title.length === 0 ) {
            this.setState({titleError : 'invalid title'});
            isValid = false;
        } else {
            this.setState({titleError : null});
        }

        // email
        if (!Validator.isEmail(this.state.email)) {
            this.setState({emailError : 'invalid email'});
            isValid = false;
        } else {
            this.setState({emailError : null});
        }

        // items
        if (this.state.items.length === 0 ) {
            this.setState({itemsError : 'invalid items'});
            isValid = false;
        } else {
            this.setState({itemsError : null});
        }

        return isValid;
    }

    onTextFieldChange (event) {
        // console.log(event.target.id);
        switch (event.target.id) {
            case 'title':
                this.setState({title : event.target.value});
                break;
            case 'email':
                this.setState({email : event.target.value});
                break;
            default:
                break;
        }
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
                    {/*<Typography className={classes.title} type="display2" gutterBottom={true}>Create Project</Typography>*/}
                    <div>
                        <FormControl error aria-describedby="title-error-text">
                            <TextField
                                error={this.state.titleError ? true : false}
                                id="title"
                                label="Project Title"
                                className={classes.textField}
                                value={state.title}
                                onChange={this.onTextFieldChange}
                                margin="normal"
                                type="title"
                            />
                            {this.state.titleError ? <FormHelperText id="title-error-text" style={{marginTop:'0px'}}>{this.state.titleError}</FormHelperText> : null }
                        </FormControl>
                    </div>

                    <div>
                        <FormControl error aria-describedby="email-error-text">
                            <TextField
                                id="email"
                                label="Your Email"
                                className={classes.textField}
                                value={state.email}
                                onChange={this.onTextFieldChange}
                                margin="normal"
                                type="email"
                            />
                            {this.state.emailError ? <FormHelperText id="email-error-text" style={{marginTop:'0px'}}>{this.state.emailError}</FormHelperText> : null }
                        </FormControl>
                    </div>

                    <Typography type="title" color="inherit" style={{fontWeight: 'bold', marginTop:'40px', color:'#0000008a'}}>
                        items to order
                    </Typography>

                    <FormControl error aria-describedby="items-error-text">
                        <ItemList items={state.items} onChangeItems={(items) => this.setItems(items)}/>
                        {this.state.itemsError ? <FormHelperText id="items-error-text" style={{marginTop:'0px'}}>{this.state.itemsError}</FormHelperText> : null }
                    </FormControl>

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

export default withStyles(styles)(CreateProjectPage);
