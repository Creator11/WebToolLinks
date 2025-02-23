import s from './Logo.module.scss';
import {Link} from "wouter";

const Logo = () => {
    return (
            <div className={s.logoContainer}>
                <Link to="/" className={s.title}>WebToolLinks</Link>
            </div>
    );
};

export default Logo;