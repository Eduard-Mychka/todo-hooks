import React, { useState, useEffect, useReducer, useCallback } from 'react'
import TodoList from '../components/TodoList'
import { Context } from '../context'   
import reducer from '../reducer'

export default function App() {
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')));
  const [todoTitle, setTodoTitle] = useState('');
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state))
  }, [state])

  const handelOnDragEnd = useCallback((result) => {
    if (!result.destination) return;
    console.log('handelOnDragEnd')
    const items = [...state];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(items);
  }, [state]);

  const addTodo = event => {
    if (event.key === 'Enter') {
      console.log('State',state)
      dispatch({
        type: 'add',
        payload: todoTitle
      })
      setTodoTitle('')
    }
  }

  return (
    <Context.Provider value={{ dispatch }}>

      <div className="container">
        <h1>Todo App</h1>

          <div className="input-field">
            <input 
              type="text" 
              onChange={e => setTodoTitle(e.target.value)} 
              value={todoTitle} 
              onKeyPress={addTodo}
            />
            <label>Todo name</label>
          </div>
        <TodoList todos={state} handelOnDragEnd={handelOnDragEnd} />
      </div>
    </Context.Provider>
  );
}