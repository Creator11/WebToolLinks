import { FC } from "preact/compat";
import s from "./Card.module.scss";

interface CardProps {
    image: string;
    tags: string[];
    title: string;
    description: string;
    onBookmarkClick?: () => void;
    isBookmarked?: boolean;
}

const Card: FC<CardProps> = ({ image, tags, title, description, onBookmarkClick, isBookmarked }) => {
    return (
        <div className={s.card}>
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

            <button className={s.bookmark} onClick={onBookmarkClick}>
                {isBookmarked ? "★" : "☆"}
            </button>
        </div>
    );
};

export default Card;