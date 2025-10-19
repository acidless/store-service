import {Outlet} from "react-router";
import ErrorPopup from "./ErrorPopup.tsx";
import {useContext} from "react";
import ErrorContext from "../context.tsx";

function Layout() {
    const {error} = useContext(ErrorContext);

    return <div className="flex flex-col min-h-[100vh]">
        <header>

        </header>
        <main className="container mx-auto flex-1 flex flex-col justify-center">
            <Outlet></Outlet>
        </main>
        <footer>

        </footer>
        <ErrorPopup error={error}/>
    </div>;
}

export default Layout;