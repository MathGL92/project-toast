import React from "react";

import useKey from "../../hooks/useKey";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const dismissallToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKey("Escape", dismissallToasts);

  const createToast = React.useCallback(
    ({ variant, message }) => {
      const newToasts = [
        ...toasts,
        { id: crypto.randomUUID(), variant, message },
      ];

      setToasts(newToasts);
    },
    [toasts]
  );

  const dismissToast = React.useCallback(
    (id) => {
      const newToasts = toasts.filter((toast) => toast.id !== id);

      setToasts(newToasts);
    },
    [toasts]
  );

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
