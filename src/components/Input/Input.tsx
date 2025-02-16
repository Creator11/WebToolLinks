import { useCallback } from "preact/hooks";
import s from "./Input.module.scss";


interface InputProps {
    value: string;
    onChange: (value: string) => void;
}



function debounce(fn: (...args: any[]) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>; // Храним ID таймера, чтобы его можно было сбросить

    return (...args: any[]) => {
        clearTimeout(timeoutId); // Если пользователь вводит новый символ — сбрасываем предыдущий таймер
        timeoutId = setTimeout(() => fn(...args), delay); // Запускаем новый таймер с задержкой
    };
}


const Input = ({ value, onChange }: InputProps) => {
    const debouncedOnChange = useCallback(debounce(onChange, 300), [onChange]);

    return (
        <div className={s.inputContainer}>
            <input
                type="text"
                className={s.input}
                placeholder="Search cards..."
                value={value}
                onInput={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                        debouncedOnChange(e.currentTarget.value);
                    }
                }}
            />
        </div>
    );
};

export default Input;