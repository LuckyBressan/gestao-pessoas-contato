import { createContext, useContext, useState, type ReactNode } from "react";
import Alert, { type AlertProps } from "./Alert";

type AlertContextType = {
  showAlert: (alert: AlertProps) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert foi usado fora do contexto AlertProvider");
  }
  return context;
}

interface AlertProvideProps {
  children: ReactNode
}

export function AlertProvider({ children } : AlertProvideProps) {
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState<AlertProps>({ title: '' })

  const showAlert = (alert: AlertProps) => {
    setAlert(alert)
    setVisible(true);
    setTimeout(() => setVisible(false), 3000); // fecha após 3s
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {visible && (
        <Alert {...alert}/>
      )}
    </AlertContext.Provider>
  );
}
