import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import RemoveIcon from 'material-ui-icons/Remove';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
    container: {
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
        width: '250px'
    },

    row: {
        display: 'flex',
    },
    col: {
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

class ItemList extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired,
        onChangeItems: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            batchContent: '',
            lastKeyPressEnter: false,
        };
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.newItemHandleKeyPress = this.newItemHandleKeyPress.bind(this);
        this.generateNewID = this.generateNewID.bind(this);
    }

    randomID() {
        return Math.random().toString(16).slice(-4);
    }

    add () {
        if (this.state.batchContent.length === 0) {
            return;
        }

        var newItems = this.state.batchContent.split('\n').filter(item => item.length > 0);
        newItems = newItems.map((item) => ({
                id: this.randomID(),
                text: item,
            }
        ));

        const items = [...this.props.items, ...newItems];
        this.props.onChangeItems(items);
        this.setState({batchContent:''});
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
        console.log(`lastKeyPressEnter:${this.state.lastKeyPressEnter}`);
        if (this.state.lastKeyPressEnter && e.key === 'Enter') {
            this.add();
        }
        if (e.key === 'Enter') {
            this.setState({lastKeyPressEnter: true});
        } else {
            this.setState({lastKeyPressEnter: false});
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
                    <div className={classes.row}>
                        <TextField
                            id="multiline-static"
                            multiline
                            value={this.state.batchContent}
                            className={[classes.textField, classes.col].join(' ')}
                            margin="normal"
                            fullWidth
                            // maxRows="99"
                            onChange={(e)=> this.setState({batchContent: e.target.value})}
                            onKeyPress={this.newItemHandleKeyPress}
                        />
                        <div className={[classes.buttonWrap, classes.col].join(' ')}>
                            <AddIcon className={classes.button} onClick={this.add}/>
                        </div>
                    </div>
                </li>
            </ol>
        );
    }
}

export default withStyles(styles)(ItemList);
