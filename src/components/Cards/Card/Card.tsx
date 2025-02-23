import { FC, useState } from "preact/compat";
import s from "./Card.module.scss";
import { toggleBookmark } from "../../../services/api/bookmarks.ts";
import {useUser} from "../../../hooks/useUser.tsx";

interface CardProps {
    id: number;
    image: string;
    tags: string[];
    title: string;
    description: string;
    link?: string;
    isBookmarked?: boolean;
}

const Card: FC<CardProps> = ({ id, image, tags, title, description, isBookmarked = false, link = "#" }) => {
    const { user } = useUser();
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    const handleBookmark = async (e:Event) => {
        e.preventDefault();
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
                <div className={s.imageWrapper} >
                    <img
                        src={image}
                        alt={title}
                        width="387"
                        height="180"
                        className={s.image}
                    />
                </div>

                <div className={s.info}>
                    <div className={s.titleContainer}>
                        <h3 className={s.title}>{title}</h3>
                        <div
                            onClick={handleBookmark}
                            className={s.favoriteButton}
                        >
                            {!bookmarked ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="lucide lucide-bookmark-plus">
                                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                    <line x1="12" x2="12" y1="7" y2="13"/>
                                    <line x1="15" x2="9" y1="10" y2="10"/>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="lucide lucide-bookmark-minus">
                                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                                    <line x1="15" x2="9" y1="10" y2="10"/>
                                </svg>}
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