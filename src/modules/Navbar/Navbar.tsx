
import { Github } from "lucide-react";
import styles from "./Navbar.module.scss";
import Button from "../../components/ui/Button/Button.tsx";
import LangButton from "../../components/LangButton/LangButton.tsx";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle.tsx";




const Navbar = () => {





    return (
        <nav className={styles.navbar}>

            <div className={styles.logoContainer}>
                <span className={styles.title}>WebToolLinks</span>
            </div>
            <div className={styles.controls}>
              <ThemeToggle/>
              <LangButton/>

                <Button variant="default">Sign In</Button>
                <a
                    href="https://github.com/Creator11/WebToolLinks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubBadge}
                >
                    <Github size={20} className={styles.githubIcon} /> GitHub
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
