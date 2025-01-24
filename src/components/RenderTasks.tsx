import { PropTypes } from "prop-types";

export default function RenderTasks({ taskData }) {
  const {
    tasks,
    handleChange,
    handleSelectedTask,
    editTaskIndex,
    editValue,
    setEditValue,
    handleSaveChange,
    handleEditToggle,
    marksTaskCompleted,
    selectedTask
  } = taskData;

  return (
    <>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="group flex rounded-sm mb-1 px-4 py-3 justify-between items-center border-b-2 border-b-slate-800 hover:bg-slate-800 hover:cursor-pointer"
        >
          <label className="flex items-center space-x-2 hover:cursor-pointer">
            <input
              className="w-4 h-4"
              type="checkbox"
              checked={task.completed}
              onChange={() => handleChange(index)}
              onClick={() => handleSelectedTask(index)}
              aria-label={`Mark task ${task.name} as ${
                task.completed ? "incomplete" : "complete"
              }`}
            />

            {editTaskIndex === index ? (
              <input
                className="bg-transparent text-gray-300 text-lg outline-none font-semibold border-b-2 border-b-slate-400"
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                aria-label={`Edit task ${task.name}`}
              />
            ) : (
              <span
                className={`text-gray-300 text-lg font-semibold ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.name}
              </span>
            )}
          </label>

          {editTaskIndex === index ? (
            <button
              onClick={() => handleSaveChange(index)}
              className="visible md:invisible mr-5 px-2 rounded-sm py-1 hover:bg-slate-600 md:group-hover:visible"
            >
              <span className="font-semibold text-slate-900">Save</span>
            </button>
          ) : (
            <button
              onClick={() => handleEditToggle(index)}
              className="visible mr-5 px-2 rounded-sm py-1 hover:bg-slate-600 md:group-hover:visible"
            >
              <span className="font-bold text-slate-900">Edit</span>
            </button>
          )}
        </div>
      ))}

      {tasks.length === 0 ? (
        <div className="container p-5 text-gray-400 border border-slate-800 rounded-sm mt-5 drop-shadow-sm">
          No task added...
        </div>
      ) : (
        <button
          onClick={marksTaskCompleted}
          className={`bg-rose-900 w-full mt-4 text-white font-semibold text-xl px-5 py-2 rounded-sm hover:bg-opacity-80 ${
            selectedTask.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectedTask.length === 0}
          aria-label="Mark selected tasks as completed"
        >
          Mark as completed
        </button>
      )}
    </>
  );
}

RenderTasks.propTypes = {
  taskData: PropTypes.shape({
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSelectedTask: PropTypes.func.isRequired,
    editTaskIndex: PropTypes.number,
    editValue: PropTypes.string,
    setEditValue: PropTypes.func.isRequired,
    handleSaveChange: PropTypes.func.isRequired,
    handleEditToggle: PropTypes.func.isRequired,
    marksTaskCompleted: PropTypes.func.isRequired,
    selectedTask: PropTypes.array.isRequired
  }).isRequired,
};
