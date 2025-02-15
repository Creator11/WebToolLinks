import s from './Input.module.scss';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const Input = ({ value, onChange }: InputProps) => {
    return (
        <div className={s.inputContainer}>
            <input
                type="text"
                className={s.input}
                placeholder="Search cards..."
                value={value}
                onInput={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                        onChange(e.currentTarget.value);
                    }
                }}
            />
        </div>
    );
};

export default Input;