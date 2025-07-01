import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { AlertProvider } from "./providers/AlertProvider";

export default function LayoutMain() {
  return (
    <AlertProvider>
      <Navbar />
      <main className="grid grid-cols-1 grid-rows-[max-content_max-content_1fr] row-start-2 gap-6">
        <Outlet />
      </main>
    </AlertProvider>
  );
}
