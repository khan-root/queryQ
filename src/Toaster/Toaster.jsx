import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

const Toaster = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      // hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

const showToast = (message, type = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warnning':
      toast.warn(message);
      break;
    default:
      toast.info(message);
  }
};

export { Toaster, showToast };