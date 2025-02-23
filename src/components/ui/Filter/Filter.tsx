import { useState } from 'preact/hooks';
import s from './Filter.module.scss';

const options = [
    { value: 'new', label: 'Сначала новые' },
    { value: 'old', label: 'Сначала старые' },
];

const Filter = ({ onChange }: { onChange: (value: string) => void }) => {
    const [selected, setSelected] = useState<string>(options[0].value);

    const handleChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        const value = target.value;
        setSelected(value);
        onChange(value);
    };

    return (
        <div className={s.filterContainer}>
            <label  htmlFor="selectSort">Сортировка:</label>
            <select
                id="selectSort"
                className={s.select}
                value={selected}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;