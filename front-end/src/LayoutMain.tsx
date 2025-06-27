import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

export default function LayoutMain() {
    return (
        <>
            {/* <Header /> */}
            <Navbar />
            <main className="grid grid-cols-1 grid-rows-[max-content_max-content_1fr] row-start-2 gap-6">
                <Outlet/>
            </main>
        </>
    )
};
