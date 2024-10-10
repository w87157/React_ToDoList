import { useRouter } from "next/router";

const Task = ({
  id,
  title,
  description,
  isCompleted,
  onDelete,
  onToggleComplete,
}) => {
  const router = useRouter();

  const handleEdit = (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    router.push(`/edit-task?id=${id}`);
  };

  return (
    <div
      onClick={onToggleComplete}
      className={`w-[300px] mx-auto shadow-md rounded-lg overflow-hidden cursor-pointer ${
        isCompleted ? "bg-green-200" : "bg-white"
      }`}
    >
      <div className="p-4">
        <h2
          className={`text-xl font-bold mb-2 ${
            isCompleted ? "text-green-700" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-base ${
            isCompleted ? "text-green-600" : "text-gray-700"
          }`}
        >
          {description}
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            編輯
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // 阻止事件冒泡
              onDelete();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
