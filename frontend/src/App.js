import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import Landing from "./pages/Landing";
import Solutions from "./pages/Solutions";

// Create a client
const queryClient = new QueryClient();

function App() {
    const [colorScheme, setColorScheme] = useState("light");
    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    return (
        <QueryClientProvider client={queryClient}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: colorScheme,
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
                                <Route path="features" element={<Features />} />
                                <Route path="solutions" element={<Solutions />} />
                                <Route path="about-us" element={<AboutUs />} />
                                <Route path="dashboard/*" element={<Dashboard />}></Route>
                                <Route path="*" element={<h1>404</h1>}></Route>
                            </Routes>
                        </div>
                    </BrowserRouter>
                </MantineProvider>
            </ColorSchemeProvider>
        </QueryClientProvider>
    );
}

export default App;
