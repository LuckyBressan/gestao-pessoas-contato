import { AlertProvider } from "./providers/AlertProvider";
import AuthProvider from "./providers/AuthProvider";
import Routes from "./Routes";

export default function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </AlertProvider>
  )
};
