import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

export default function Home() {
  const tasksInitialValue = () => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  };

  const [isToggle, setIsToggle] = useState(false);
  const [tasks, setTasks] = useState(tasksInitialValue.map(task => ({
    name: task, completed: false
  })));

  const [newTask, setNewTask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedTask, setSelectedTask] = useState([]);
  const date = new Date().toLocaleDateString();



  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },[tasks])


  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updatedTask = [...tasks, { name: newTask, completed: false }]
      setTasks(updatedTask);

    }
    setNewTask("");
    setIsToggle(false);
  };

  const handleEditToggle = (index) => {
    setEditTaskIndex(index);
    setEditValue(tasks[index]);
  };

  const handleSaveChange = (index) => {
    const updatedTaskValue = [...tasks];
    updatedTaskValue[index] = editValue;
    setTasks(updatedTaskValue);
    setEditTaskIndex(null);
  };

  const handleChange = (index) => {
      const updatedTasks = tasks.map((task, i) => i === index ? {...task, completed: !task.completed } : task )

      setTasks(updatedTasks)
  };

  const handleSelectedTask = (index) => {
    setSelectedTask(prevSelected => {

      if(prevSelected.includes(index)) {
        return prevSelected.filter(taskIndex => taskIndex !== index)
      }
      return [...prevSelected, index]
    })
  }

  const marksTaskCompleted = () => {
    const updatedTask = tasks.filter(
      (_, taskIndex) => !selectedTask.includes(taskIndex)
    );
    setSelectedTask([]);

    setTasks(updatedTask);
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
  };

  return (
    <div className="container relative mx-auto flex items-center justify-center h-screen">
      <div className="list-container drop-shadow-xl rounded-md w-1/2 p-5 bg-slate-900 shadow border border-slate-500">
        <h1 className="text-center text-gray-200 text-3xl font-semibold pb-5 rounded-md bg-slate-950 drop-shadow-2xl"></h1>
        <header className="flex justify-center items-center mt-16">
          <legend className="text-gray-300 font-bold text-xl mb-3">
            {date}
          </legend>
          <span className="w-full text-4xl flex justify-end">
            <IoMdAddCircle
              onClick={() => setIsToggle(true)}
              className="fill-slate-400 hover:cursor-pointer hover:fill-slate-500"
            />
          </span>
        </header>

        {/* Render the tasks... */}
        {tasks?.map((task, index) => (
          <div
            key={index}
            className="group flex rounded-sm mb-1 px-4 py-3 justify-between items-center border-b-2 border-b-slate-800 hover:bg-slate-800 hover:cursor-pointer"
          >
            <label className="flex space-x-2 hover:cursor-pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleChange(index)}
                onClick={() => handleSelectedTask(index)}
              />

              {/* Re-render the displayed task to editable */}
              {editTaskIndex === index ? (
                <input
                  className="bg-transparent text-gray-300 text-lg outline-none font-semibold border-b-2 border-b-slate-400"
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              ) : (
                <span
                  className={`text-gray-300 text-lg font-semibold ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task}
                </span>
              )}
            </label>
            {editTaskIndex === index ? (
              <button
                onClick={() => handleSaveChange(index)}
                className="invisible mr-5 px-2 rounded-sm py-1 hover:bg-slate-600 group-hover:visible"
              >
                <span className="font-semibold text-slate-900">Save</span>
              </button>
            ) : (
              <button
                onClick={() => handleEditToggle(index)}
                className="invisible mr-5 px-2 rounded-sm py-1 hover:bg-slate-600 group-hover:visible"
              >
                <span className="font-bold text-slate-900">Edit</span>
              </button>
            )}
          </div>
        ))} 
       {tasks.length === 0 ? (
          <div className="container p-5 text-gray-400 border border-slate-800 rounded-sm mt-5 drop-shadow-sm">No task added...</div>
        ) : (
          <button
            onClick={marksTaskCompleted}
            className={`bg-rose-900 w-full mt-4 text-white font-semibold md:text-xl px-5 py-2 rounded-sm hover:bg-opacity-80 ${selectedTask.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={selectedTask.length === 0}
          >
            Mark as completed
          </button>
        )}
      </div>
      {isToggle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <label htmlFor="addtask" className="block text-gray-700 mb-2">
              Task:
            </label>
            <input
              className="border-2 border-gray-300 p-2 rounded w-full outline-none focus:border-blue-500 mb-4"
              type="text"
              name="addtask"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsToggle(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
