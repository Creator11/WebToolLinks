import { useState, useEffect, useRef } from 'preact/hooks';
import { Link } from 'wouter';
import { supabase } from '../../services/supabase/supabase.ts';
import { User } from '@supabase/supabase-js';
import {Bookmark, ChevronDown, LogOut, Settings} from 'lucide-react';
import s from './Navbar.module.scss';
import LangButton from '../../components/ui/LangButton/LangButton.tsx';
import ThemeToggle from '../../components/ui/ThemeToggle/ThemeToggle.tsx';

const Navbar = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setIsMenuOpen(false);
    };

    // Закрытие подменю при клике вне него
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav className={s.navbar}>
            <div className={s.logoContainer}>
                <Link to="/" className={s.title}>WebToolLinks</Link>
            </div>
            <div className={s.rightSection}>
                {user ? (
                    <div className={s.userMenu} ref={menuRef}>
                        <Link to="/bookmarks" className={s.menuItem}><Bookmark  size={16} /> Избранное</Link>
                        <button className={s.userButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {user.email} <ChevronDown size={16} />
                        </button>
                        {isMenuOpen && (
                            <div className={s.dropdownMenu}>
                                <Link to="/settings" className={s.menuItem}><Settings size={16} /> Настройки</Link>
                                <button className={s.menuItem} onClick={handleLogout}><LogOut size={16} /> Выйти</button>
                                <div className={s.divider} />
                                <div className={s.menuFooter}>
                                    <ThemeToggle />
                                    <LangButton />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link className={s.authLink} to="/auth">Sign In</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;