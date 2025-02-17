import s from './DashboardCard.module.scss';
import Card from "../../components/Card/Card.tsx";
import Input from "../../components/Input/Input.tsx";
import Filter from "../../components/ui/Filter/Filter.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useState } from "preact/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../services/cards/cards.ts";

interface ICard {
    id: number;
    image: string;
    tags: string[];
    title: string;
    description: string;
    isBookmarked?: boolean;
}

const ITEMS_PER_PAGE = 6;

const DashboardCard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);


    const { data: cards = [], isLoading, error } = useQuery({
        queryKey: ["cards"],
        queryFn: getCards,
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load cards</p>;

    const filteredCards = cards.filter((card: ICard) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCards = filteredCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={s.dashboardCard}>
            <div className={s.search}>
                <Input value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className={s.filters}>
                <Filter /> <Filter />
            </div>
            <div className={s.cardsWrapper}>
                {paginatedCards.length > 0 ? (
                    <div className={s.cards}>
                        {paginatedCards.map((card) => (
                            <Card {...card} key={card.id} />
                        ))}
                    </div>
                ) : (
                    <div className={s.empty}>
                        <h2>🧐 No cards found</h2>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
            <Pagination
                totalItems={filteredCards.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default DashboardCard;