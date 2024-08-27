import { PropTypes } from 'prop-types'

export default function AddTask({ addTaskData }) {
  const { isToggle, newTask, setNewTask, setIsToggle, handleAddTask } = addTaskData;

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      handleAddTask();
    }
  }
  return (
    <>
    {isToggle && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-4/5 md:w-96 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Create your new task</h2>
           <input
            className="border-2 border-gray-300 p-2 rounded w-full outline-none focus:border-slate-800 mb-4"
            type="text"
            name="addtask"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="New task input"
            placeholder='Add task...'
          />

          
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsToggle(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              aria-label="Cancel adding new task"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
              aria-label="Add new task"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

AddTask.propTypes = {
  addTaskData: PropTypes.shape({
    isToggle: PropTypes.bool.isRequired,
    newTask: PropTypes.string.isRequired,
    setNewTask: PropTypes.func.isRequired,
    setIsToggle: PropTypes.func.isRequired,
    handleAddTask: PropTypes.func.isRequired
  }).isRequired
}