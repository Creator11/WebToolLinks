
import './assets/style/app.css'
import Main from "./pages/main/Main.tsx";
import Navbar from "./modules/Navbar/Navbar.tsx";
import {Sidebar} from "lucide-react";

export function App() {
    return (
    <>
        <Navbar/>
        <Sidebar/>
      <Main/>
    </>
  )
}
