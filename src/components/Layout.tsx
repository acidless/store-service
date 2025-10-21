import {NavLink, Outlet} from "react-router";
import ErrorPopup from "./ErrorPopup.tsx";
import {useContext} from "react";
import ErrorContext from "../context.tsx";

function Layout() {
    const {error} = useContext(ErrorContext);

    return <div className="flex flex-col min-h-[100vh]">
        <header className="border-b-1 border-neutral-300">
            <div className="container py-4 px-4 md:px-6 mx-auto">
                <nav className="list-none">
                    <li>
                        <NavLink className={({ isActive }) =>
                            "text-lg hover:text-blue-600 transition-colors duration-300 " + (isActive ? "text-blue-600" : "")
                        } to="/" >
                            Home
                        </NavLink>
                    </li>
                </nav>
            </div>
        </header>
        <main className="container py-4 px-4 md:px-6 mx-auto flex-1 flex flex-col justify-center">
            <Outlet></Outlet>
        </main>
        <footer>

        </footer>
        <ErrorPopup error={error}/>
    </div>;
}

export default Layout;