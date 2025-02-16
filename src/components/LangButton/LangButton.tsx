import s from './LangButton.module.scss';
import Button from "../ui/Button/Button.tsx";
import {useState} from "preact/hooks";

const LangButton = () => {
    const toggleLanguage = () => {
        setLanguage(language === "en" ? "ru" : "en");
    };
    const [language, setLanguage] = useState("en");
    return (
        <div className={s.langButton}>
            <Button onClick={toggleLanguage} variant="outline">
                {language === "en" ? "EN" : "RU"}
            </Button>
        </div>
    );
};

export default LangButton;