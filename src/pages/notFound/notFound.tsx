import s from './notFound.module.scss';

const NotFound = () => {
    return (
        <div className={s.notFound}>

            <div className={s.notFound__text}>
                <p>Упс, кажется вы потерялись</p>
                <p>Страница, которую вы запрашиваете, не существует.</p>
            </div>
        </div>
    );
};

export default NotFound;