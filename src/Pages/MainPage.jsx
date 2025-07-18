import { useState } from "react";
import MenuFilters from "../Components/MainPageComponent/MenuFilters";
import Menu from "../Components/MainPageComponent/Menu";
import { Container } from "react-bootstrap";

function MainPage() {
  const [filters, setFilters] = useState({
    category: null,
    isVegetarian: null,
    pageNum: 1,
    sort: null,
  });

  return (
    <Container className="mt-4 main-page">
      {" "}
      <MenuFilters
        filters={filters}
        setFilters={setFilters}
        onApply={() => {
          setFilters((prev) => ({ ...prev, pageNum: 1 }));
        }}
      />{" "}
      <Menu filters={filters} setFilters={setFilters} />
    </Container>
  );
}

export default MainPage;
