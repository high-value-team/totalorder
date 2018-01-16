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
            newItem: '',
        };
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.newItemHandleKeyPress = this.newItemHandleKeyPress.bind(this);
    }

    add () {
        if (this.state.newItem.length == 0) {
            return;
        }
        const items = [...this.props.items, this.state.newItem];
        this.props.onChangeItems(items);
        this.setState({newItem:''});
    }

    remove (index) {
        this.props.items.splice(index, 1); // How is props passed? always as a new object? is it okay to work on this object?
        this.props.onChangeItems(this.props.items);
    }

    update (value, index) {
        const items = this.props.items.map( (item, idx) => {
           return idx === index ? value : item;
        });
        this.props.onChangeItems(items);
    }

    newItemHandleKeyPress (e) {
        if (e.key === 'Enter') {
            this.add();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ol className={classes.orderedList}>
                    {this.props.items.map( (item, index) => {
                        return <li key={index} className={classes.listItem}>
                            <TextField
                                id="newItem"
                                label=""
                                className={classes.textField}
                                value={item}
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
                            value={this.state.newItem}
                            onChange={(e) => this.setState({newItem: e.target.value})}
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
