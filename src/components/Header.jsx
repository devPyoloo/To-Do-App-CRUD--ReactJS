import { IoMdAddCircle } from "react-icons/io" 
import { PropTypes } from 'prop-types'
export default function Header({ dateToday, setIsToggle }) {
  return (
    <header className="flex justify-center items-center mt-16">
          <legend className="text-gray-300 font-bold text-xl mb-3 w-full">
            {dateToday}
          </legend>
          <span className="w-full text-4xl flex justify-end">
            <IoMdAddCircle
              onClick={() => setIsToggle(true)}
              className="fill-slate-400 hover:cursor-pointer hover:fill-slate-500"
              aria-label="Add Task"
            />
          </span>
        </header>
  )
}

Header.propTypes = {
  dateToday: PropTypes.string.isRequired,
  setIsToggle: PropTypes.func.isRequired,
};