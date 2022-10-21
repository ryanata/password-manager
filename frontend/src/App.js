import "./App.css";
import Landing from "./pages/Landing";
import About from "./pages/About";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="dashboard" element={<Dashboard />}></Route>
                        <Route path="*" element={<h1>404</h1>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
