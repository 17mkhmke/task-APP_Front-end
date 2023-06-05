import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './taskApp.css';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      closeModal();
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
      closeModal();
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

  const openModal = (taskId) => {
    setEditTaskId(taskId);
    setShowModal(true);
    const selectedTask = getTaskById(taskId);
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDueDate(selectedTask.dueDate);
    }
  };

  const closeModal = () => {
    setEditTaskId(null);
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    if (editTaskId) {
      updateTask(editTaskId);
    } else {
      createTask();
    }
  };

  const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const selectedTask = editTaskId ? getTaskById(editTaskId) : null;

  return (
    <div className="task-app">
      <h1>DataTask</h1>
      <h2>Create a Task</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleModalSubmit();
        }}
      >
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">{editTaskId ? 'Update' : 'Create'}</button>
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
                <button className="update-button" onClick={() => openModal(task.id)}>
                  Update
                </button>
                <button className="delete-button" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
  <div className="modal">
    <div className="modal-content">
      <h3>{editTaskId ? 'Edit Task' : 'Create Task'}</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleModalSubmit();
        }}
      >
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <div className="modal-buttons">
          <button type="submit">{editTaskId ? 'Update' : 'Create'}</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default TaskApp;