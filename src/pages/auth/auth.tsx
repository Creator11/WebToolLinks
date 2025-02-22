import { useState } from 'preact/hooks';
import s from './auth.module.scss';
import {Link} from "wouter";
import Button from "../../components/ui/Button/Button.tsx";
import {supabase} from "../../services/supabase/supabase.ts";

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);  // Стейт для переключения между входом и регистрацией
    const toggleForm = () => setIsSignIn(!isSignIn);  // Переключение формы
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: window.location.origin, // Перенаправление после входа
            },
        });

        if (error) {
            console.error("Ошибка входа:", error.message);
        }
    };
    return (
        <div className={s.auth}>
            <div className={s.formWrapper}>
                <div className={s.formHeader}>
                    <div className={s.homeLink}>
                        <Link href="/" className={s.toggleButton}>Back to Home</Link>
                    </div>
                    <h2>{isSignIn ? 'Sign In' : 'Register'}</h2>
                    <p>{isSignIn ? 'Please enter your credentials' : 'Create a new account'}</p>
                </div>
                <form className={s.form}>
                    <div className={s.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={s.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    {!isSignIn && (
                        <div className={s.inputGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required />
                        </div>
                    )}
                    <button type="submit" className={s.submitButton}>{isSignIn ? 'Sign In' : 'Register'}</button>
                </form>
                <div className={s.toggleLink}>
                    <span>{isSignIn ? "Don't have an account?" : "Already have an account?"}</span>
                    <button onClick={toggleForm} className={s.toggleButton}>
                        {isSignIn ? 'Register' : 'Sign In'}
                    </button>


                </div>
                <Button onClick={handleLogin}>github</Button>
            </div>
        </div>
    );
};

export default Auth;