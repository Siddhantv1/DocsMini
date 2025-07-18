import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegFileAlt, FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
// Removed unused import
import { motion } from "framer-motion";
import { RiEditLine} from "react-icons/ri";
function Card({ data, toggleCardSelection, index, isSelected, reference, onEdit }) {
  // const [isDragging, setIsDragging] = useState(false);
  const [isEditing] = useState(false);

  // const handleBlur = () => {
  //   setIsEditing(false);
  //   // Update card data with new description
  //   toggleCardSelection(index);
  // };

  //different tag colors
  const stringToColor = (str) => {
    //base case
    if (str == "later"){
      return {backgroundColor: "green"};
    }
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    const saturation = 80;
    const lightness = 60;

    const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    //we would OBVIOUSLY need to convert text to balck incase the bg is too bright, hence
    // we'll use something called perceived luminance to calculate brightness

    // so for that first we convert the given HSL to RGB


    const l = lightness / 100;
    const s = saturation / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    if (hue < 60) [r, g, b] = [c, x, 0];
    else if (hue < 120) [r, g, b] = [x, c, 0];
    else if (hue < 180) [r, g, b] = [0, c, x];
    else if (hue < 240) [r, g, b] = [0, x, c];
    else if (hue < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    const [R, G, B] = [r + m, g + m, b + m].map(v => Math.round(v * 255));

    //calculate using formlua
    const luminance = (0.299 * R + 0.587 * G + 0.114 * B);
    const textColor = luminance > 150 ? '#000' : '#fff';

    return {
      backgroundColor: hsl,
      color: textColor
    };
  };


  
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
        drag 
        dragConstraints={reference} 
        whileDrag={{scale: 1.05}}
        whileTap={{scale: 1.02}}
        className={`relative min-w-[300px] max-w-[400px] min-h-60 max-h-[90vh] rounded-[50px] bg-zinc-900/90 text-white px-6 py-6 overflow-auto ${
          isSelected ? 'border-2 border-sky-300' : ''
        }`}
        layout
         transition={{ type: 'inertia', stiffness: 400, damping: 30 }}
         onDragStart={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
           // Prevents inertia-based unwanted shifts
          dragElastic={0.2}
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

        <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              !isEditing && toggleCardSelection(index);
            }} 
            className={`w-5 h-5 ${isSelected ? 'bg-sky-500' : 'bg-transparent border-2 border-sky-500'} rounded-full flex items-center justify-center transition-colors`}
          >
            {isSelected ? <FaRegCheckCircle size={'1em'}/> : null}
          </button>
        <div 
          className='font-regular leading-right mt-1 card-content-scroll'
          style={{
            maxHeight: '120px', // Limit content height
            overflowY: 'hidden',
            transition: 'overflow 0.5s',
          }}
          onMouseEnter={e => e.currentTarget.style.overflowY = 'auto'}
          onMouseLeave={e => e.currentTarget.style.overflowY = 'hidden'}
        >
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
            case 'checkbox':
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span 
                    className="cursor-pointer select-none" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const newLists = [...data.lists];
                      newLists[idx] = { ...listItem, checked: !listItem.checked };
                      // Update the lists without toggling card selection
                      toggleCardSelection(index, data.desc, newLists, true);
                    }}
                  >
                    {listItem.checked ? "✅" : "🔳"}{' '}
                    <span className={listItem.checked ? 'line-through opacity-50' : ''}>
                      {listItem.content}
                    </span>
                  </span>
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
              <span key={idx} className='px-2 py-1 rounded-full text-sm'
              style={ stringToColor(tag)}>{tag}</span>
            ))}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(); }} 
            className='w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center'
          >
            <RiEditLine size={'1em'}/>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleDownload(e); }} 
            className='w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center'
          >
            <MdOutlineFileDownload size={'1em'}/>
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
      type: PropTypes.oneOf(['text', 'bullet', 'numbered', 'checkbox']),
      content: PropTypes.string.isRequired,
      number: PropTypes.number, // optional for numbered items
      checked: PropTypes.bool   // optional for checkbox items
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