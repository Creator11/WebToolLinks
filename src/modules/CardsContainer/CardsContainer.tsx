import Card from "@/components/Card/Card";
import s from "./CardsContainer.module.scss";
import { useState } from "react";
import { CARD_INFO } from "@/STATIC_DATA/CARD_INFO";
import { Button, Pagination } from "@mui/material";
function CardsContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(CARD_INFO.length / itemsPerPage);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedData = CARD_INFO.slice(startIndex, startIndex + itemsPerPage);
  return (
    <div className={s.cardContainer}>
      <div className={s.cardContainer__sort}>sort</div>
      <div className={s.cardContainer__container}>
        {displayedData.map((obj) => {
          return <Card title={obj.title} desc={obj.desc} />;
        })}
      </div>
      <Pagination
        className={s.cardContainer__pagination}
        color="primary"
        onChange={handlePageChange}
        count={totalPages}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
          },
        }}
      />
    </div>
  );
}

export default CardsContainer;
