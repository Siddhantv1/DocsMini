// BottomNavBar.jsx
import PropTypes from 'prop-types';
import { RiDeleteBin5Fill } from "react-icons/ri";

function BottomNavBar({ onAddClick, onDeleteClick, onCancelClick, showCancel }) {
  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-20 bg-sky-700/30 backdrop-blur rounded-3xl flex justify-around items-center">
      {showCancel && (
        <button onClick={onCancelClick} className="px-4 py-2 bg-slate-700 text-white rounded-full">
          Cancel
        </button>
      )}
      <button onClick={onAddClick} className="text-3xl rounded-full w-12 h-12 bg-blue-500 text-white flex items-center justify-center">
        +
      </button>
      <button onClick={onDeleteClick} className={`text-xl rounded-full w-12 h-12 ${showCancel ? 'bg-red-800' : 'bg-gray-600'} text-white flex items-center justify-center cursor-pointer`}>
        <RiDeleteBin5Fill />
      </button>
    </div>
  );
}
BottomNavBar.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func,
  showCancel: PropTypes.bool
};

export default BottomNavBar;
