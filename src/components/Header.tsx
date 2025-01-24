import { IoMdAddCircle } from "react-icons/io";
import { PropTypes } from "prop-types";
export default function Header({ dateToday, setIsToggle }) {
  return (
    <header className="flex justify-center items-center mt-16">
      <div className="flex justify-between items-center text-gray-300 font-bold text-xl mb-5 md:mb-3 w-full">
        <h1>{dateToday}</h1> <span className="text-4xl">
        <IoMdAddCircle
          onClick={() => setIsToggle(true)}
          className="fill-slate-400 hover:cursor-pointer hover:fill-slate-500"
          aria-label="Add Task"
        />
      </span>
      </div>
      
    </header>
  );
}

Header.propTypes = {
  dateToday: PropTypes.string.isRequired,
  setIsToggle: PropTypes.func.isRequired,
};
