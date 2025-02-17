import { useState } from "preact/hooks";
import s from "./DashboardCard.module.scss";
import Card from "../../components/Card/Card.tsx";
import Input from "../../components/Input/Input.tsx";
import Filter from "../../components/ui/Filter/Filter.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../services/cards/cards.ts";

interface ICard {
    id: number;
    image: string;
    tags: string[];
    title: string;
    description: string;
    created_at: string;  // Используем created_at вместо date
    isBookmarked?: boolean;
}

const ITEMS_PER_PAGE = 6;

const DashboardCard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("new"); // Стандартное значение — сортировка по новым

    const { data: cards = [], isLoading, error } = useQuery({
        queryKey: ["cards"],
        queryFn: getCards,
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load cards</p>;

    const cleanString = (str: string) => {
        return str
            .replace(/[^\w\sа-яА-ЯёЁ]/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .normalize("NFD")
            .toLowerCase();
    };

    const filteredCards = cards.filter((card: ICard) =>
        cleanString(card.title).includes(cleanString(searchQuery)) ||
        cleanString(card.description).includes(cleanString(searchQuery))
    );

    const sortedCards = filteredCards.sort((a, b) => {
        const dateA = new Date(a.created_at);  // Используем created_at
        const dateB = new Date(b.created_at);  // Используем created_at
        if (sortOrder === "new") {
            return dateB.getTime() - dateA.getTime(); // Сначала новые
        } else {
            return dateA.getTime() - dateB.getTime(); // Сначала старые
        }
    });

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCards = sortedCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={s.dashboardCard}>
            <div className={s.search}>
                <Input value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className={s.filters}>
                <Filter onChange={setSortOrder} /> {/* Передаем onChange для изменения фильтра */}
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