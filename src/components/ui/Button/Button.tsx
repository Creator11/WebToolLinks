import s from './Button.module.scss';

interface ButtonProps {
    children: preact.ComponentChildren;
    onClick?: () => void;
    variant?: "default" | "outline";
}
const Button = ({ children, onClick, variant = "default" }: ButtonProps) => {
    return (
        <button className={`${s.button} ${s[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;