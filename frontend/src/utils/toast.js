import { toast } from "react-toastify";

const success = (id, message) => {
  toast.update(id, {
    render: message,
    type: "success",
    autoClose: 3000,
    isLoading: false,
  });
};

const error = (id, message) => {
  toast.update(id, {
    render: message,
    type: "error",
    autoClose: 3000,
    isLoading: false,
  });
};

const loading = (message) => {
  const id = toast.loading(message);
  return id;
};

export const showToast = { success, error, loading };
