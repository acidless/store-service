import {Outlet} from "react-router";

function Layout() {
    return <div>
        <header>

        </header>
        <main className="container mx-auto">
            <Outlet></Outlet>
        </main>
        <footer>

        </footer>
    </div>;
}

export default Layout;