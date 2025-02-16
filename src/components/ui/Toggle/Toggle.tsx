import s from './Toggle.module.scss';
interface ToggleProps {
    onClick: () => void;
    children: preact.ComponentChildren;
}

const Toggle = ({ onClick, children }: ToggleProps) => {
    return (
        <button className={s.toggle} onClick={onClick}>
            {children}
        </button>
    );
};

export default Toggle;