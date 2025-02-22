import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../services/cards/cards.ts"; // Запрос всех карточек
import s from "./bookmarks.module.scss";
import Card from "../../components/Card/Card.tsx";
import {getUserBookmarks} from "../../services/bookmarks/bookmarks.ts";
import {useUser} from "../../hooks/useCards.tsx";

const Bookmarks = () => {
    const { user } = useUser(); // Получаем текущего пользователя

    const { data: bookmarkedIds = [] } = useQuery({
        queryKey: ["bookmarks", user?.id],
        queryFn: () => user ? getUserBookmarks(user.id) : [],
        enabled: !!user, // Запрос выполняется, только если пользователь авторизован
    });

    const { data: allCards = [], isLoading, error } = useQuery({
        queryKey: ["cards"],
        queryFn: getCards,
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load cards</p>;

    console.log("allCards",allCards);
    const bookmarkedCards = allCards.filter((card) => bookmarkedIds.includes(card.id.toString()));

    return (
        <div className={s.bookmarks}>
            {bookmarkedCards.length > 0 ? (
                <div className={s.cards}>
                    {bookmarkedCards.map((card) => (
                        <Card {...card} key={card.id} />
                    ))}
                </div>
            ) : (
                <div className={s.empty}>
                    <h2>⭐ No bookmarks yet</h2>
                    <p>Save your favorite cards to see them here.</p>
                </div>
            )}
        </div>
    );
};

export default Bookmarks;