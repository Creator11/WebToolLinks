import { useState } from 'preact/hooks';
import s from './Filter.module.scss';

const options = [
    { value: 'alphabet', label: 'По алфавиту' },
    { value: 'popular', label: 'Сначала популярные' },
    { value: 'new', label: 'Сначала новые' }
];

const Filter = () => {
    const [selected, setSelected] = useState<string>(options[0].value);

    const handleChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        setSelected(target.value);
    };

    return (
        <div className={s.filterContainer}>
            <select
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