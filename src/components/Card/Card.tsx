import { FC } from "preact/compat";
import s from "./Card.module.scss";

interface CardProps {
    image: string;
    tags: string[];
    title: string;
    description: string;
    link: string;
}

const Card: FC<CardProps> = ({ image, tags, title, description, link = "#" }) => {
    return (
        <div className={s.card}>
            <a href={link} target="_blank"  className={s.cardLink}>
                <div className={s.image} style={{ backgroundImage: `url(${image})` }}></div>
                <div className={s.info}>
                    <h3 className={s.title}>{title}</h3>
                    <div className={s.tags}>
                        {tags.map((tag) => (
                            <span key={tag} className={s.tag}>
            {tag}
          </span>
                        ))}
                    </div>
                    <p className={s.description}>{description}</p>
                </div>

            </a>
        </div>
    );
};

export default Card;