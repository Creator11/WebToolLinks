import s from "./Cards.module.scss";
import Card from "./Card/Card.tsx";
import Pagination from "../ui/Pagination/Pagination.tsx";
import { useState } from "preact/hooks";
import Filter from "../ui/Filter/Filter.tsx";
import {CardsProps} from "../../types/card.ts";

const ITEMS_PER_PAGE = 6;

const Cards = ({ arr, bookmarks = false }: CardsProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

    const sortedCards = [...arr].sort((a, b) => {
        return sortOrder === "new"
            ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCards = sortedCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={`${s.cardsPage} ${bookmarks && s.cardsBookmarks }`}>
            <div className={s.filters}>
                <Filter onChange={(value: string) => setSortOrder(value as "new" | "old")} />
            </div>
            <div className={s.cardsWrapper}>
                {paginatedCards.length > 0 ? (
                    <div className={s.cards}>
                        {paginatedCards.map((card) => (
                            <Card {...card} key={card.id} id={Number(card.id)} />
                        ))}
                    </div>
                ) : (
                    <div className={s.empty}>
                        <h2>{bookmarks ? "⭐ No bookmarks yet" : "🧐 No cards found"}</h2>
                        <p>{bookmarks ? "Save your favorite cards to see them here." : "Try adjusting your search or filters."}</p>
                    </div>
                )}
            </div>
            <Pagination
                totalItems={arr.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Cards;
