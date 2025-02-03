import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { RiEditLine } from "react-icons/ri";

function Card({ data, toggleCardSelection, index, isSelected, reference, onEdit }) {
  // const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // const handleBlur = () => {
  //   setIsEditing(false);
  //   // Update card data with new description
  //   toggleCardSelection(index);
  // };

  
  // Function to handle download
  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const element = document.createElement("a");
    const file = new Blob([data.desc], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${data.desc.substring(0, 20)}.txt`; // Limit filename length for simplicity
    element.click();
  };

  return (
    <div onClick={() => !isEditing && toggleCardSelection(index)} className="card-class">
      <motion.div 
        drag 
        dragConstraints={reference} 
        whileDrag={{scale: 1.1}} 
        // onDragStart={() => setIsDragging(true)}
        // onDragEnd={() => setIsDragging(false)}
        className={`relative w-72 h-60 rounded-[50px] bg-zinc-900/90 text-white px-8 py-8 overflow-hidden ${
          isSelected ? 'border-2 border-sky-300' : ''
        }`}
      >
      {/* Cancel Button
      {isSelected && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleCardSelection(index);
            }} 
            className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
          >
            Cancel
          </button>
        )} */}

        <FaRegFileAlt/>
        <p className='font-semibold leading-right mt-5'>{data.desc}</p>
        <div className='footer absolute bottom-0 bg-cyan-900 w-full left-0'>
          <div className='flex items-center justify-between py-3 px-8 mb-5'>
            <div className='flex space-x-2'>
              {data.tags.map((tag, idx) =>(
                <span key={idx} className='bg-emerald-800 px-2 py-1 rounded-full text-sm'>{tag}</span>
              ))}

            </div>
            <button onClick={onEdit} className='w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center'>
              <RiEditLine size={'1em'}/>
            </button>
            <button onClick={data.close ? null : handleDownload} className='w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center'>
              {data.close ? <IoClose/> : <MdOutlineFileDownload size={'1em'}/>}
            </button>
          </div>
        </div>
      </motion.div>
      {/* <button
        onClick={() => toggleCardSelection(index)}
        className={`absolute top-2 left-2 bg-${isSelected ? 'blue' : 'gray'}-500 text-white px-2 py-1 rounded-full text-xs`}>
        {isSelected ? 'Unselect' : 'Select'}
      </button> */}
    </div>
  );
}
Card.propTypes = {
  data: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    close: PropTypes.bool.isRequired,
  }).isRequired,
  toggleCardSelection: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  reference: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default Card;
