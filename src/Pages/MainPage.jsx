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
    <Container
      className="mt-4"
      style={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
      }}
    >
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
