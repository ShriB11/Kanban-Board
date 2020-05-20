import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

//Use react-beautiful-dnd library to use the drag and drop components
//uuid is used to assign a string based id to the columns on the board
//The following is an array of all tasks present in the queue. Its a dummy database

const itemsFromBackend = [
  { id: uuid(), content: "Task 1" },
  { id: uuid(), content: "Task 2" },
  { id: uuid(), content: "Task 3" },
  { id: uuid(), content: "Task 4" },
  { id: uuid(), content: "Task 5" }
];

//Below is the dummy columns to access on the frontend and the four stages of it are present

const columnsFromBackend = {
  [uuid()]: {
    name: "Tasks in Queue",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "Doing",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

//The function onDragEnd() is used to set the behaviour of cards while dragging and dropping
//If no destination column is presnt, the card falls back to the source column
//If a destination column is present, the card is dropped there by first assign the contents and id to source and dest respectively
//Then the card is deleted from source column and assigned in the dest column at the required space

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

//The following is the actual react render component where we are gonna declare nested <div> to break up the workspace
//Assign necessary inline CSS and call the DragDropContext tag from the library to work with the Drag and Drop components
//The first column in the div is the task queue which holds all the pending tasks
//The size of all the columns are dynamic which makes the page look prettier
//Create a nested div and in it, define the Droppable component with all details and inline css including snapshots.
//Create a child component Draggable inside Droppable and again assign the required details and make it look snappy and responsive using snapshot properties
//The Props in the page are accessed using the provided keyword
//All these need to be in a Placeholder for it to render
//When a card is hovered over a column it should highlight it and this is defined in the onDragEnd function


function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightgrey"
                            : "pink",
                          padding: 4,
                          width: 250,
                          minHeight: 300
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#456C86"
                                        : "purple",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
