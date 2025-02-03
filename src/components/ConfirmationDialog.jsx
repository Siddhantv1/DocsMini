import React from 'react';
import { motion } from 'framer-motion';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 bg-transparent z-40"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="fixed bottom-32 left-1/2 transform -translate-x-1/2 bg-sky-900/30 backdrop-blur-lg rounded-2xl shadow-lg p-6 w-80 z-50"
      >
        <p className="text-white text-center mb-6">Are you sure you wish to delete?</p>
        
        <div className="flex justify-end gap-28">
        <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-700/30 border-2 border-solid border-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-white rounded-full hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationDialog;