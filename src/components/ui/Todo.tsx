import React, { useEffect, useState } from "react";
import Input from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import axios from "axios";
const url = import.meta.env.VITE_MIRLAN_URL;

interface Todo {
  _id: number;
  title: string;
}

export const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(url);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post<Todo>(url, { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${url}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async () => {
    if (!editTodo || !editTodo.title.trim()) return;
    try {
      const response = await axios.patch<Todo>(`${url}/${editTodo._id}`, { title: editTodo.title });
      const updatedTodos = todos.map(todo => (todo._id === response.data._id ? response.data : todo));
      setTodos(updatedTodos);
      setEditTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Input   type="text" value={newTodo} setData={setNewTodo} />
      <Button onClick={addTodo}>Add</Button>
      <div>
        {todos.map(todo => (
          <div key={todo._id}>
            {editTodo && editTodo._id === todo._id ? (
              <>
                <Input type="text" value={editTodo.title} setData={title => setEditTodo({ ...editTodo, title })} />
                <Button onClick={updateTodo}>Update</Button>
              </>
            ) : (
              <>
                <p>{todo.title}</p>
                <Button onClick={() => setEditTodo(todo)}>Edit</Button>
                <Button onClick={() => deleteTodo(todo._id)}>Delete</Button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
