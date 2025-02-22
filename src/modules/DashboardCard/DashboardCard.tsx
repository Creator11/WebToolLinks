import { useState } from "preact/hooks";
import s from "./DashboardCard.module.scss";
import Input from "../../components/ui/Input/Input.tsx";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../services/api/cards.ts";
import Cards from "../../components/Cards/Cards.tsx";

interface ICard {
    id: number;
    image: string;
    tags: string[];
    title: string;
    description: string;
    created_at: string;
    isBookmarked?: boolean;
}


const DashboardCard = () => {
    const [searchQuery, setSearchQuery] = useState("");


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

    return (
        <div className={s.dashboardCard}>
            <div className={s.search}>
                <Input value={searchQuery} onChange={setSearchQuery} />
            </div>
            <Cards arr={filteredCards}  />
        </div>
    );
};

export default DashboardCard;