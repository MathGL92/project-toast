import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        setToasts([]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
