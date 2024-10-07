import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { v4 } from "uuid";
import './todo.css'

function ToDoList({ selectedDate }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTime, setNewTime] = useState(''); // 新增時間欄位

  // 當選擇日期改變時，從後端獲取待辦事項
  useEffect(() => {
    const fetchTodos = async () => {
      const dateStr = selectedDate.toISOString().split('T')[0]; // 格式化日期
      const response = await fetch(`http://localhost:5000/api/todos?date=${dateStr}`);
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, [selectedDate]);

  // 添加新的待辦事項
  const handleAddTodo = async () => {
    if (newTodo.trim() && newTime.trim()) {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: v4(), // UUID 產生
          date: selectedDate.toISOString().split('T')[0], // 選擇的日期
          time: newTime, // 用戶輸入的時間
          text: newTodo // 事項名稱
        }),
      });
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setNewTodo(''); // 清空事項輸入框
      setNewTime(''); // 清空時間輸入框
    }
  };

  // 刪除待辦事項
  const handleDeleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className='todo'>
      <h3>代辦清單 ({selectedDate.toDateString()})</h3>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="輸入事項名稱"
        className='input_todo'
      />
      <input
        type="time"
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)}
        placeholder="輸入時間"
        className='input_time'
      />
      <button onClick={handleAddTodo} className='todo_add'><FontAwesomeIcon icon={faPlus} /></button>

      <ul className='to_ul'>
        {todos.map(todo => (
          <li key={todo.id} className='to_li'>
            {todo.time} - {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)} className='delete'><FontAwesomeIcon icon={faTrashCan} /></button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default ToDoList;
