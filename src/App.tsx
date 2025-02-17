import './assets/style/app.css';
import Navbar from "./modules/Navbar/Navbar.tsx";
import { Router } from "wouter";
import Routes from "./router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <ReactQueryDevtools initialIsOpen={false} />
            <Router base="/WebToolLinks/">
                <Routes />
            </Router>
        </QueryClientProvider>
    );
}