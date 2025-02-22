import s from './Pagination.module.scss';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalItems <= itemsPerPage) return null;

    return (
        <div className={s.pagination}>
            <button
                className={s.button}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ◀
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    className={`${s.button} ${currentPage === index + 1 ? s.active : ''}`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            <button
                className={s.button}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                ▶
            </button>
        </div>
    );
};

export default Pagination;