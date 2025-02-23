import { Link } from 'wouter';
import s from './Navbar.module.scss';
import Logo from "../../components/ui/Logo/Logo.tsx";
import { useUser } from "../../hooks/useUser.tsx";
import UserMenu from "./UserMenu/UserMenu.tsx";


const Navbar = () => {
    const { user } = useUser();

    return (
        <nav className={s.navbar}>
            <Logo />
            <div className={s.rightSection}>
                {user?.email ? <UserMenu email={user.email} /> : <Link className={s.authLink} to="/auth">Sign In</Link>}
            </div>
        </nav>
    );
};

export default Navbar;