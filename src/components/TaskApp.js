import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './taskApp.css';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://taskapp-0zaf.onrender.com/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    try {
      const response = await axios.post('https://taskapp-0zaf.onrender.com/tasks', {
        title,
        description,
        dueDate,
      });
      console.log('Task created successfully:', response.data);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (id) => {
    try {
      const response = await axios.put(`https://taskapp-0zaf.onrender.com/tasks/${id}`, {
        title,
        description,
        dueDate,
      });
      console.log('Task updated successfully:', response.data);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`https://taskapp-0zaf.onrender.com/tasks/${id}`);
      console.log('Task deleted successfully:', response.data);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-app"> 
      <h1>DataTask</h1>
      <h2>Create a Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTask();
        }}
      >
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <button type="submit">Create</button>
      </form>

      <h2>My Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>
              <button className="update-button" onClick={() => updateTask(task.id)}>Update</button>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskApp;