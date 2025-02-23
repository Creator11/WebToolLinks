import { useState } from 'preact/hooks';
import s from './auth.module.scss';
import Button from "../../components/ui/Button/Button.tsx";
import {supabase} from "../../services/supabase/supabase.ts";
import AuthForm from "../../components/AuthForm/AuthForm.tsx";
import Logo from "../../components/ui/Logo/Logo.tsx";

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const toggleForm = () => setIsSignIn(!isSignIn);
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: window.location.origin,
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
                    <Logo/>
                </div>
                <div className={s.socialAuth}>
                    <Button onClick={handleLogin}>github</Button>
                </div>
                <AuthForm isSignIn={isSignIn} />
                <div className={s.toggleLink}>
                    <span>{isSignIn ? "Don't have an account?" : "Already have an account?"}</span>
                    <button onClick={toggleForm} className={s.toggleButton}>
                        {isSignIn ? 'Register' : 'Sign In'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Auth;