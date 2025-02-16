
import './assets/style/app.css'
import Navbar from "./modules/Navbar/Navbar.tsx";
import {Router} from "wouter";
import Routes from "./router/router.tsx";

export function App() {
    return (
    <>
        <Navbar/>
        {/*<Sidebar/>*/}
        <Router>
            <Routes />
        </Router>
    </>
  )
}
