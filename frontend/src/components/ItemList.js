import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import RemoveIcon from 'material-ui-icons/Remove';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
    container: {
    },
    root: {
        fontFamily: 'Roboto, sans-serif',
        width: '100%',
    },
    orderedList: {
        listStyleType: 'none',
        padding: '0px',
    },
    listItem: {

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '300px'
    },
});

class ItemList extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired,
        onChangeItems: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            newItemText: '',
        };
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.newItemHandleKeyPress = this.newItemHandleKeyPress.bind(this);
        this.generateNewID = this.generateNewID.bind(this);
    }

    add () {
        if (this.state.newItemText.length === 0) {
            return;
        }

        const newItem = {id: this.generateNewID(this.props.items), text: this.state.newItemText};
        const items = [...this.props.items, newItem];
        this.props.onChangeItems(items);
        this.setState({newItemID:'', newItemText:''});
    }

    remove (index) {
        this.props.items.splice(index, 1); // How is props passed? always as a new object? is it okay to work on this object?
        this.props.onChangeItems(this.props.items);
    }

    update (value, index) {
        const items = this.props.items.map( (item, idx) => {
            if (idx === index) {
                item = {id: item.id, text: value};
            }
            return item;
        });
        this.props.onChangeItems(items);
    }

    newItemHandleKeyPress (e) {
        if (e.key === 'Enter') {
            this.add();
        }
    }

    generateNewID(items) {
        for (let i=0; i<100; i++) {
            var newID = Math.random().toString(16).slice(-4);
            // eslint-disable-next-line
            var found = items.find((item) => {return item.id === newID;});
            if (!found) {
                return newID;
            }
        }
        throw Error("a unique ID could not be generated");
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ol className={classes.orderedList}>
                    {this.props.items.map( (item, index) => {
                        return <li key={index} className={classes.listItem}>
                            <TextField
                                id={item.id}
                                label=""
                                className={classes.textField}
                                value={item.text}
                                onChange={(e) => this.update(e.target.value, index)}
                                margin="normal"
                                type="text"
                            />
                            <RemoveIcon onClick={() => this.remove(index)}/>
                        </li>
                    })}
                    <li key={"newItem"}>
                        <TextField
                            id="newItem"
                            label=""
                            className={classes.textField}
                            value={this.state.newItemText}
                            onChange={(e) => this.setState({newItemText: e.target.value})}
                            onKeyPress={this.newItemHandleKeyPress}
                            margin="normal"
                            type="text"
                        />
                        <AddIcon onClick={() => this.add()}/>
                    </li>
                </ol>
            </div>
        );
    }
}

export default withStyles(styles)(ItemList);
