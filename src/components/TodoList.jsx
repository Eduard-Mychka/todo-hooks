import React  from 'react'
import TodoItem from './TodoItem'
import { Draggable,  DragDropContext, Droppable } from "react-beautiful-dnd";

export default function TodoList({ todos, handelOnDragEnd }) {

  return (
    <DragDropContext onDragEnd={handelOnDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
          {todos.length 
            ? todos.map((item, index) => (
              <Draggable 
                key={item.id} 
                draggableId={index.toString()} 
                index={index}
              >
                {(provided, snapshot) => (
                  <TodoItem {...item} provided={provided} />
                )}
                
              </Draggable>)) 
            : 'No tasks yet'
          } 
        </ul>
        )}
      </Droppable>
    </DragDropContext>
    
  )
}