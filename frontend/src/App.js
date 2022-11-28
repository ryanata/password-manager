import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

// Create a client
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    colorScheme: "light",
                    colors: {
                        "steel-blue": { 6: "#4681D0" },
                        "gray-web": { 6: "#7E7E7E" },
                    },
                    fontFamily: "'Public Sans', sans-serif",
                    headings: {
                        fontFamily: "'Nunito', sans-serif",
                    },
                }}
            >
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="dashboard/*" element={<Dashboard />}></Route>
                            <Route path="*" element={<h1>404</h1>}></Route>
                        </Routes>
                    </div>
                </BrowserRouter>
            </MantineProvider>
        </QueryClientProvider>
    );
}

export default App;
