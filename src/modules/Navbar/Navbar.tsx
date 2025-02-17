import { useState } from 'preact/hooks';
import { Github } from "lucide-react";
import s from "./Navbar.module.scss";
import LangButton from "../../components/LangButton/LangButton.tsx";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle.tsx";
import { Link } from "wouter";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <nav className={s.navbar}>
            <div className={s.logoContainer}>
                <Link to="/" className={s.title}>WebToolLinks</Link>
            </div>
 
            <button className={s.menuButton} onClick={toggleMenu}>
                &#9776;
            </button>

            <div className={`${s.controls} ${isMenuOpen ? s.showMenu : ''}`}>
                <div className={s.desktopControls}>
                    <ThemeToggle />
                    <LangButton />
                    <Link className={s.authLink} to="/auth">Sign&nbsp;In</Link>
                    <div className={s.githubContainer}>
                        <a
                            href="https://github.com/Creator11/WebToolLinks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={s.githubBadge}
                        >
                            <Github size={20} className={s.githubIcon} /> GitHub
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;