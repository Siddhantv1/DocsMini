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

  // const calculateCardHeight = (lists) => {
  //   if (!lists) return 'min-h-60';
    
  //   const listItems = lists.filter(item => item.type === 'bullet' || item.type === 'numbered');
  //   const baseHeight = 60;
  //   const itemHeight = 40;
    
  //   return `min-h-[${baseHeight + (listItems.length * itemHeight)}px]`;
  // };

  return (
    <div className="card-class">
      <motion.div 
        onClick={() => !isEditing && toggleCardSelection(index)}
        drag 
        dragConstraints={reference} 
        whileDrag={{scale: 1.1}} 
        className={`relative min-w-[300px] max-w-[400px] min-h-60 max-h-[90vh] rounded-[50px] bg-zinc-900/90 text-white px-8 py-8 overflow-auto ${
          isSelected ? 'border-2 border-sky-300' : ''
        }`}
        layout
         transition={{ type: 'inertia', stiffness: 300, damping: 30 }}
         onDragStart={(event, info) => {
          event.preventDefault();
          event.stopPropagation();
        }}
           // Prevents inertia-based unwanted shifts
          dragElastic={0.9}
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
        <div className='font-regular leading-right mt-1'>
        {data.lists?.map((listItem, idx) => {
          switch(listItem.type) {
            case 'bullet':
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span>• {listItem.content}</span>
                </motion.div>
              );
            case 'numbered':
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span>{listItem.number}. {listItem.content}</span>
                </motion.div>
              );
            default:
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span>{listItem.content}<br /></span>
                </motion.div>
              );
          }
        })}
      </div>

      <div className='footer absolute bottom-0 bg-cyan-900 w-full left-0'>
        <div className='flex items-center justify-between py-3 px-8 mb-5'>
          <div className='flex space-x-2'>
            {data.tags.map((tag, idx) =>(
              <span key={idx} className='bg-emerald-800 px-2 py-1 rounded-full text-sm'>{tag}</span>
            ))}
          </div>
          <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className='w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center'>
            <RiEditLine size={'1em'}/>
          </button>
          <button onClick={data.close ? null : handleDownload} className='w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center'>
            {data.close ? <IoClose/> : <MdOutlineFileDownload size={'1em'}/>}
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);
}
Card.propTypes = {
  data: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['text', 'bullet', 'numbered']),
      content: PropTypes.string.isRequired,
      number: PropTypes.number // optional for numbered items
    })),
     tags: PropTypes.arrayOf(PropTypes.string),
    close: PropTypes.bool.isRequired,
  }).isRequired,
  toggleCardSelection: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  reference: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default Card;