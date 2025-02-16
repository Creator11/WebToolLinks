import s from './ThemeToggle.module.scss';
import {Moon, Sun} from "lucide-react";
import styles from "../../modules/Navbar/Navbar.module.scss";
import Toggle from "../ui/Toggle/Toggle.tsx";
import {useState} from "preact/hooks";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("light");


    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };
    return (
        <div className={s.themeToggle}>
            <Toggle onClick={toggleTheme}>
                {theme === "light" ? <Sun size={20} className={styles.icon} /> : <Moon size={20} className={styles.icon} />}

            </Toggle>
        </div>
    );
};

export default ThemeToggle;