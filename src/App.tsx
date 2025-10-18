import './App.css'
import {Route, Routes} from "react-router";
import Layout from "./components/Layout.tsx";
import Index from "./pages/Index.tsx";

function App() {
    return <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Index/>}/>
        </Route>
    </Routes>;
}

export default App
