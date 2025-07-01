import AuthProvider from "./providers/AuthProvider";
import Routes from "./Routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
};
