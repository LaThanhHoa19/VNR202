import React from 'react';
import { motion } from 'framer-motion';
import AudioController from '../services/AudioController';

const ChoiceButton = ({ choice, onClick, disabled, isSelected, index }) => {
  const handleClick = () => {
    if (disabled) return;
    AudioController.playSfx('click');
    onClick(choice);
  };

  return (
    <motion.button
      layout
      whileHover={!disabled ? { scale: 1.02, x: 10 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative group w-full text-left px-8 py-5 rounded-2xl border transition-all duration-500
        ${isSelected 
          ? 'bg-primary-600/20 border-primary-500 shadow-[0_0_25px_rgba(212,131,29,0.3)]' 
          : 'bg-dark-800/40 border-white/5 hover:border-white/20 shadow-xl'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-center gap-6 relative z-10">
        <span className={`
          flex items-center justify-center w-10 h-10 rounded-xl font-bold transition-all duration-500
          ${isSelected 
            ? 'bg-primary-500 text-white shadow-[0_0_15px_rgba(212,131,29,0.6)]' 
            : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}
        `}>
          {String.fromCharCode(65 + index)}
        </span>
        <span className="flex-1 font-medium tracking-wide text-lg">
          {choice.text}
        </span>
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 rounded-2xl bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {isSelected && (
        <motion.div
          layoutId="choice-active-glow"
          className="absolute inset-0 rounded-2xl border-2 border-primary-500 shadow-[0_0_20px_rgba(212,131,29,0.4)] pointer-events-none"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

export default ChoiceButton;
