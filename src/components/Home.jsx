import { useEffect, useState, useMemo } from "react";

import toast, { Toaster } from "react-hot-toast";
import Header from "./Header";
import RenderTasks from "./RenderTasks";
import AddTask from "./AddTask";

export default function Home() {
  const tasksInitialValue = () => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  };

  const [isToggle, setIsToggle] = useState(false);
  const [tasks, setTasks] = useState(tasksInitialValue);
  const [newTask, setNewTask] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedTask, setSelectedTask] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formattedDate = useMemo(() => formatDate(new Date()), []);


  const notifyStyles = {
    background: "#020617",
    color: "#4ade80",
  };

  const notify = (message) => toast(message, { style: notifyStyles });

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  const handleAddTask = () => {

    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { name: newTask, completed: false },
      ]);
      notify("Task Added");
    }
    setNewTask("");
    setIsToggle(false);
  };

  const handleEditToggle = (index) => {
    setEditTaskIndex(index);
    setEditValue(tasks[index].name);
  };

  const handleSaveChange = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = { ...updatedTasks[index], name: editValue };
      return updatedTasks;
    });
    setEditTaskIndex(null);
    notify("Saved Changes");
  };

  const handleChange = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSelectedTask = (index) => {
    setSelectedTask((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((taskIndex) => taskIndex !== index)
        : [...prevSelected, index]
    );
  };

  const marksTaskCompleted = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, taskIndex) => !selectedTask.includes(taskIndex))
    );
    setSelectedTask([]);
    notify("Completed");
  };

  const taskData = {
    tasks,
    handleChange,
    handleAddTask,
    handleSelectedTask,
    editTaskIndex,
    editValue,
    setEditValue,
    handleSaveChange,
    handleEditToggle,
    marksTaskCompleted,
    selectedTask,
  };

  const addTaskData = {
    isToggle,
    newTask,
    setNewTask,
    setIsToggle,
    handleAddTask
  }

  return (
    <div className="container relative md:mx-auto flex items-center justify-center h-screen">
      <Toaster />
      <div className="w-11/12 list-container drop-shadow-xl rounded-md md:w-1/2 p-5 bg-slate-900 shadow border border-slate-500">
        <h1 className="text-center text-2xl md:text-4xl font-bold py-3 mb-6 rounded-md shadow-lg bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-gray-300 tracking-wider">
          ToDoes
        </h1>
        <Header dateToday={formattedDate} setIsToggle={setIsToggle} />
        <RenderTasks taskData={taskData} />
      </div>
      <AddTask addTaskData={addTaskData} />
    </div>
  );
}
