import React, { useEffect } from "react";
import Task from "@/components/Task";
import { useTask } from "@/hooks/useTasks";

const Body = () => {
  const { tasks, fetchTasks, updateTaskStatus, deleteTask, showCompleted } =
    useTask();

  // 過濾Task
  const filteredTasks = tasks.filter(
    (task) => showCompleted || !task.is_completed
  );

  // 刪除Task
  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  // Task切換完成狀態
  const handleToggleComplete = (taskId, isCompleted) => {
    updateTaskStatus(taskId, { is_completed: !isCompleted });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          title={task.name}
          description={task.description}
          isCompleted={task.is_completed}
          onEdit={() => handleEdit(task.id)}
          onDelete={() => handleDelete(task.id)}
          onToggleComplete={() =>
            handleToggleComplete(task.id, task.is_completed)
          }
        />
      ))}
    </div>
  );
};

export default Body;
