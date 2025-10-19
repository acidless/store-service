import {Outlet} from "react-router";

function Layout() {
    return <div className="flex flex-col min-h-[100vh]">
        <header>

        </header>
        <main className="container mx-auto flex-1 flex flex-col justify-center">
            <Outlet></Outlet>
        </main>
        <footer>

        </footer>
    </div>;
}

export default Layout;