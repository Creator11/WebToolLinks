import { FC, useState } from "preact/compat";
import s from "./Card.module.scss";
import { Bookmark, BookmarkMinus } from "lucide-react";
import { toggleBookmark } from "../../services/bookmarks/bookmarks.ts";
import {useUser} from "../../hooks/useCards.tsx";

interface CardProps {
    id: number; // Добавляем ID карточки
    image: string;
    tags: string[];
    title: string;
    description: string;
    link: string;
    isBookmarked: boolean;
}

const Card: FC<CardProps> = ({ id, image, tags, title, description, isBookmarked, link = "#" }) => {
    const { user } = useUser();
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    const handleBookmark = async () => {
        if (user) {
            // @ts-ignore
            await toggleBookmark(user.id, id, bookmarked);
            setBookmarked(!bookmarked);
        } else {
            alert("Please log in to save bookmarks.");
        }
    };

    return (
        <div className={s.card}>
            <a href={link} className={s.cardLink}>
                <div className={s.image} style={{ backgroundImage: `url(${image})` }}></div>
                <div className={s.info}>
                    <div className={s.titleContainer}>
                        <h3 className={s.title}>{title}</h3>
                        <div
                            onClick={handleBookmark}
                            className={s.favoriteButton}
                            aria-label="Добавить в избранное"
                        >
                            {!bookmarked ? <Bookmark size={24} /> : <BookmarkMinus size={24} />}
                        </div>
                    </div>
                    <div className={s.tags}>
                        {tags.map((tag) => (
                            <span key={tag} className={s.tag}>{tag}</span>
                        ))}
                    </div>
                    <p className={s.description}>{description}</p>
                </div>
            </a>
        </div>
    );
};

export default Card;