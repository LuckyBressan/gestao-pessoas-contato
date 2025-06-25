import { Outlet } from "react-router";
import Header from "./components/Header";

export default function LayoutMain() {
    return (
        <>
            <Header />
            <main className="px-12 grid">
                <Outlet/>
            </main>
        </>
    )
};
