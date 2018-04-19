import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

// using some little inline style helpers to make the app look okay
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 1,
    margin: `0 0 ${grid}px 0`,
    borderStyle: `solid`,
    borderWidth: `1px`,
    borderColor: `grey`,

    // change background colour if dragging
    background: isDragging ? 'lightgrey' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : 'white',
    padding: `0px`,
    marginTop: `20px`,
    // width: 250,
    width: '100%',
});

const styles = theme => ({
    container: {},
});

// const toSortItems = items => items.map((item, index) => ({id: `item-${item.id}`, content: item.text}));
// const toItems = sortItems => sortItems.map((i) => (i.content));

class OrderItems extends React.Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        onOrder: PropTypes.func.isRequired,
        items: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        // console.log(`items:${JSON.stringify(this.state.items, null, 2)}`);
        // console.log(`sortItems:${JSON.stringify(this.state.sortItems, null, 2)}`);
        // console.log(`items:${JSON.stringify(props.items, null, 2)}`);

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.props.items,
            result.source.index,
            result.destination.index
        );
        // console.log(`items:${JSON.stringify(items, null, 2)}`);
        this.props.onOrder(items);
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.items.map((item, index) => (

                                <Draggable key={`item-${item.id}`} draggableId={`item-${item.id}`} index={index}>
                                    {(provided, snapshot) => (
                                        <div>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style,
                                                )}
                                            >
                                                {item.text}
                                            </div>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}


export default withStyles(styles)(OrderItems);