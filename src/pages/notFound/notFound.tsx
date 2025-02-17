
import s from './notFound.module.scss';
import {Link} from "wouter";

const NotFound = () => {
    return (
        <div className={s.notFound}>
            <div className={s.notFound__content}>
                <div className={s.notFound__text}>
                    <h1>404</h1>
                    <p>Упс, кажется вы потерялись.</p>
                    <p>Страница, которую вы запрашиваете, не существует.</p>
                </div>

                {/* Кнопка для возвращения на главную */}
                <Link to="/" className={s.backButton}>Вернуться на главную</Link>
            </div>
        </div>
    );
};

export default NotFound;