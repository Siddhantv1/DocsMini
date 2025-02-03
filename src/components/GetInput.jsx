import React from 'react';
import { motion } from 'framer-motion';
import {FaTimesCircle } from "react-icons/fa";
// import Background from './Background';

const GetInput = ({ onClose, onSubmit, initialText, initialTag }) => {
  const [desc, setDesc] = React.useState(initialText || '');
  const [tag, setTag] = React.useState(initialTag || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(desc, tag);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-sky-900/30 backdrop-blur-lg rounded-2xl shadow-lg p-6"
      >
        <FaTimesCircle color='cyan'
          size={24}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-xl text-cyan-100 font-bold mb-4">{initialText ? 'Edit Card' : 'Add New Card'}</h2>
        <form onSubmit={handleSubmit}>
        <p className="text-sm text-gray-400 py-0">
                {desc.length}/90 characters
            </p>
          <textarea
            rows={5}
            placeholder='Write something...'
            className="w-full border bg-stone-800 text-white border-gray-900 rounded-xl p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            maxLength={"90"}
          />
          <input
            type="text"
            placeholder="Tag (optional)"
            className="w-full border bg-stone-800 text-white border-gray-900 rounded-xl p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-cyan-600  hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            Done
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default GetInput;
