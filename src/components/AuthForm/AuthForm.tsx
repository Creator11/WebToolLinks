import s from './AuthForm.module.scss';

// @ts-ignore
const AuthForm = ({isSignIn}) => {
    return (
        <div className={s.authForm}>
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
        </div>
    );
};

export default AuthForm;