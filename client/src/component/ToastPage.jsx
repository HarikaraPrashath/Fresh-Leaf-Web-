import React from 'react';
import { useToasts } from 'react-toast-notifications';

const ToastPage = ({ message, appearance, dismissTime = 3000 }) => {
  const { addToast } = useToasts();

  React.useEffect(() => {
    const toastId = addToast(message, {
      appearance,
      autoDismiss: true,
      autoDismissTimeout: dismissTime,
    });

    // Clean up the toast when the component unmounts
    return () => {
      addToast.dismiss(toastId);
    };
  }, [addToast, appearance, message, dismissTime]);

  // This component doesn't render anything since it's just for displaying a toast
  return null;
};

export default ToastPage;
