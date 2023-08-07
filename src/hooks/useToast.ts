import { toast, TypeOptions, ToastPosition, Theme } from "react-toastify";

const useToast = () => {
  const showToast = (
    message: string,
    type: TypeOptions,
    position: ToastPosition,
    theme: Theme
  ) => {
    toast(message, {
      autoClose: 2000,
      type: type,
      position: position,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: true,
      theme: theme,
    });
  };
  return showToast;
};

export default useToast;
