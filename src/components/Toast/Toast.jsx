import React, { useState, useEffect } from 'react';
import './index.scss';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={() => setVisible(false)}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
