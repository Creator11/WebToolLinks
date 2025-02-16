import s from './DashboardCard.module.scss';
import Card from "../../components/Card/Card.tsx";
import Input from "../../components/Input/Input.tsx";
import Filter from "../../components/ui/Filter/Filter.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useState, useEffect } from "preact/hooks";
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
    const [cards, setCards] = useState<ICard[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const fetchedCards = await getCards();
                console.log("Fetched cards:", fetchedCards);
                setCards(fetchedCards);
            } catch (err) {
                console.error("Error fetching cards:", err);
                setError("Failed to load cards");
            } finally {
                setLoading(false);
            }
        };
        fetchCards();
    }, []);

    const filteredCards = cards.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCards = filteredCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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