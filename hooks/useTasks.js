import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const TaskContext = createContext();

export function TaskContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCompleted, setshowCompleted] = useState(true);

  // 查詢任務清單
  const fetchTasks = async (page = 1, type = "all") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://wayi.league-funny.com/api/task?page=${page}&type=${type}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching tasks: ${response.statusText}`);
      }
      const result = await response.json();

      if (result.status) {
        setTasks(result.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 新增任務
  const createTask = async (newTask) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://wayi.league-funny.com/api/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error(`Error creating task: ${response.statusText}`);
      }
      const result = await response.json();
      setTasks((prevTasks) => [...prevTasks, result.data]);

      toast.success(`${result.data.name} 新增成功`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 編輯任務
  const updateTask = async (id, updatedTask) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://wayi.league-funny.com/api/task/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!response.ok) {
        throw new Error(`Error updating task: ${response.statusText}`);
      }
      const result = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? result.data : task))
      );

      toast.success(`${result.data.name} 編輯成功`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 更新任務完成狀態
  const updateTaskStatus = async (id, is_completed) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://wayi.league-funny.com/api/task/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_completed }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error updating task status: ${response.statusText}`);
      }
      const result = await response.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? result.data : task))
      );

      const statusText = result.data.is_completed ? "已完成" : "未完成";
      toast.success(`${result.data.name} ${statusText}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 刪除任務
  const deleteTask = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://wayi.league-funny.com/api/task/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error deleting task: ${response.statusText}`);
      }

      const deletedTask = tasks.find((task) => task.id === id);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      toast.success(`${deletedTask.name} 刪除成功`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowCompleted = () => {
    setshowCompleted((prev) => !prev);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        showCompleted,
        fetchTasks,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        toggleShowCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => useContext(TaskContext);

export default TaskContext;
