import React from "react";
import { useRouter } from "next/router";
import { useTask } from "@/hooks/useTasks";

const Header = () => {
  const { showCompleted, toggleShowCompleted } = useTask();
  const router = useRouter();

  const handleNewTaskClick = () => {
    router.push("/new-task");
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={handleHomeClick} className="text-xl font-bold">
          ToDoList
        </button>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={toggleShowCompleted}
          >
            {showCompleted ? "隱藏已完成任務" : "顯示已完成任務"}
          </button>
          <button
            onClick={handleNewTaskClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            新增
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
