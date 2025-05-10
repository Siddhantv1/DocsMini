import React from 'react';
import { motion } from 'framer-motion';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="
          bg-sky-900/30 backdrop-blur-lg rounded-2xl shadow-lg
          w-full max-w-xs sm:max-w-sm md:max-w-md
          p-6
          max-h-[80vh] overflow-y-auto
        "
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
      >
        <p className="text-white text-center mb-6">
          Are you sure you wish to delete?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-700/30 border-2 border-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
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
