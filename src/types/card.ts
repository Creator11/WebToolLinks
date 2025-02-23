export interface CardProps {
    id: string;
    created_at: string;
    image: string;
    tags: string[];
    title: string;
    description: string;
    url: string;
    link: string;
    isBookmarked: boolean;
}
 export interface CardsProps {
    arr: CardProps[];
    bookmarks?: boolean;
}