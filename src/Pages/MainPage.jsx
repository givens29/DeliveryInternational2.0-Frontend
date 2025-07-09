import { useState } from "react";
import MenuFilters from "../Components/MainPageComponent/MenuFilters";
import Menu from "../Components/MainPageComponent/Menu";

function MainPage() {
  const [filters, setFilters] = useState({
    category: null,
    isVegetarian: null,
    pageNum: 1,
    sort: null,
  });

  return (
    <>
      <MenuFilters
        filters={filters}
        setFilters={setFilters}
        onApply={() => {
          setFilters((prev) => ({ ...prev, pageNum: 1 }));
        }}
      />
      <Menu filters={filters} setFilters={setFilters} />
    </>
  );
}

export default MainPage;
