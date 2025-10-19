import {Route, Routes} from "react-router";
import Layout from "./components/Layout.tsx";
import Index from "./pages/Index.tsx";
import {useState} from "react";
import ErrorContext from "./components/context.tsx";

function App() {
    const [error, setError] = useState("");

    return <ErrorContext.Provider value={{error, setError}}>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<Index/>}/>
            </Route>
        </Routes>
    </ErrorContext.Provider>;
}

export default App
