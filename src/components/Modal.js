import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="relative bg-white w-full max-w-lg p-4 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
