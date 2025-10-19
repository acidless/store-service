import {Route, Routes} from "react-router";
import Layout from "./components/Layout.tsx";
import Index from "./pages/Index.tsx";
import {useState} from "react";
import ErrorContext from "./context.tsx";
import Product from "./pages/Product.tsx";

function App() {
    const [error, setError] = useState("");

    return <ErrorContext.Provider value={{error, setError}}>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/products/:id" element={<Product/>}/>
                <Route path="/" element={<Index/>}/>
            </Route>
        </Routes>
    </ErrorContext.Provider>;
}

export default App
