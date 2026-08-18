import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../src/context/PortfolioContext';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  multiline?: boolean;
  className?: string;
  element?: keyof JSX.IntrinsicElements;
  placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  multiline = false,
  className = '',
  element = 'span',
  placeholder = 'Empty text...'
}) => {
  const { isEditing } = usePortfolio();
  const [localValue, setLocalValue] = useState(value);
  const Element = element as any;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync with external value changes when not editing locally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (multiline && isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [localValue, isEditing, multiline]);

  if (!isEditing) {
    return <Element className={className}>{value || placeholder}</Element>;
  }

  const baseInputClass = `bg-slate-800/80 border border-cyan-500/50 rounded px-2 py-1 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 w-full transition-colors text-slate-100 ${className}`;

  if (multiline) {
    return (
      <textarea
        ref={textareaRef}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${baseInputClass} resize-none overflow-hidden`}
        rows={1}
      />
    );
  }

  return (
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={baseInputClass}
    />
  );
};
