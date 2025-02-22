import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../services/api/cards.ts";
import s from "./bookmarks.module.scss";
import {getUserBookmarks} from "../../services/api/bookmarks.ts";
import {useUser} from "../../hooks/useUser.tsx";
import Cards from "../../components/Cards/Cards.tsx";

const Bookmarks = () => {
    const { user } = useUser();

    const { data: bookmarkedIds = [] } = useQuery({
        queryKey: ["bookmarks", user?.id],
        queryFn: () => user ? getUserBookmarks(user.id) : [],
        enabled: !!user,
    });

    const { data: allCards = [], isLoading, error } = useQuery({
        queryKey: ["cards"],
        queryFn: getCards,
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load cards</p>;

    const bookmarkedCards = allCards.filter((card) => bookmarkedIds.includes(card.id.toString()));

    return (
        <div className={s.bookmarks}>
            <Cards arr={bookmarkedCards} bookmarks={true}   />
        </div>
    );
};

export default Bookmarks;