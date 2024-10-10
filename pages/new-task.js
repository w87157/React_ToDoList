import React, { useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTask } from "@/hooks/useTasks";

export default function NewTask() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState("");
  const { createTask } = useTask();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 檢查必填欄位是否為空
    if (!taskName) {
      setError("任務名稱是必填欄位。");
      return;
    }

    // 創建新任務物件
    const newTask = {
      name: taskName,
      description: taskDescription,
    };

    try {
      // 調用 createTask 並傳遞新任務物件
      await createTask(newTask);

      // 清空輸入框
      setTaskName("");
      setTaskDescription("");
      setError("");

      // 新增任務成功後返回首頁
      router.push("/");
    } catch (err) {
      setError("新增任務時出現錯誤，請稍後再試。");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow flex items-center justify-center">
        <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">新增任務</h3>
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
              新增任務
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
