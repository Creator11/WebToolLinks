import s from './DashboardCard.module.scss';
import Card from "../../components/Card/Card.tsx";
import { CARDS } from "../../STATIC_DATA/static.ts";
import Input from "../../components/Input/Input.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import { useState} from "preact/hooks";
import Pagination from "../../components/Pagination/Pagination.tsx";

interface ICard {
    image: string;
    tags: string[];
    title: string;
    description: string;
    isBookmarked?: boolean;
    id: number;
}

const ITEMS_PER_PAGE = 6;

const DashboardCard = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Добавляем состояние для поиска
    const [currentPage, setCurrentPage] = useState(1);



    const filteredCards = CARDS.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;



    const paginatedCards = (filteredCards.slice(startIndex, startIndex + ITEMS_PER_PAGE))


    return (
        <div className={s.dashboardCard}>
            <h1>{searchQuery}</h1>
            <div className={s.search}>
                <Input value={searchQuery} onChange={setSearchQuery} />

            </div>
            <div className={s.filters}>
                <Filter /> <Filter /> <Filter />
            </div>
            <div className={s.cards}>
                {
                    paginatedCards.map((card: ICard) => (
                        <Card {...card} key={card.id} />
                    ))
                }
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