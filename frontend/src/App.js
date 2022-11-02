import "./App.css";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
                            <Route path="dashboard" element={<Dashboard />}></Route>
                            <Route path="*" element={<h1>404</h1>}></Route>
                        </Routes>
                    </div>
                </BrowserRouter>
            </MantineProvider>
        </QueryClientProvider>
    );
}

export default App;
