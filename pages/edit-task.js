import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTask } from "@/hooks/useTasks";

export default function EditTask() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");
  const { tasks, updateTask } = useTask(); // 獲取任務列表和更新方法
  const router = useRouter();
  const { id } = router.query; // 從查詢參數中取得任務 id

  // 當頁面加載時，從任務列表中找到對應 id 的任務，並自動填入資料
  useEffect(() => {
    if (id && tasks.length > 0) {
      const task = tasks.find((task) => task.id === parseInt(id, 10));
      if (task) {
        setTaskName(task.name);
        setTaskDescription(task.description);
      }
    }
  }, [id, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName) {
      setError("任務名稱是必填欄位。");
      return;
    }

    const updatedTask = {
      name: taskName,
      description: taskDescription,
    };

    try {
      await updateTask(id, updatedTask); // 更新任務

      setTaskName("");
      setTaskDescription("");
      setError("");

      router.push("/"); // 編輯成功後返回首頁
    } catch (err) {
      setError("編輯時出現錯誤，請稍後再試。");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">編輯任務</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="block text-sm font-medium text-gray-700"
              >
                任務名稱
              </label>
              <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="請輸入任務名稱"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="taskDescription"
                className="block text-sm font-medium text-gray-700"
              >
                任務內容
              </label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="請輸入任務內容"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              確定編輯
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
