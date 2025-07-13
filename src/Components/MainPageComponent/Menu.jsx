import { useEffect, useState } from "react";
import Dish from "./Dish";
import Page from "./Pagination";

function Menu({ filters, setFilters }) {
  const [menu, setMenu] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 1,
  });

  useEffect(() => {
    const url = constructURL(filters);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          const errorMessage = response.text();
          throw new Error(`${errorMessage}`);
        }

        return response.json();
      })
      .then((menu) => {
        setMenu(menu.dishes);
        setPagination(menu.pagination);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filters]);

  const handlePageChange = (newPageNum) => {
    setFilters((prev) => ({
      ...prev,
      pageNum: newPageNum,
    }));
  };

  function constructURL(filters) {
    const url = new URL("/api/Dish/getDishesByFilters", window.location.origin);

    if (filters.category) {
      url.searchParams.append("category", filters.category);
    }
    if (filters.isVegetarian !== null && filters.isVegetarian !== undefined) {
      url.searchParams.append("isVegetarian", filters.isVegetarian);
    }
    if (filters.pageNum) {
      url.searchParams.append("pageNum", filters.pageNum);
    }
    if (filters.sort) {
      url.searchParams.append("sort", filters.sort);
    }
    return url.toString();
  }

  return (
    <>
      {menu?.map((dish) => (
        <Dish key={dish.id} dish={dish} />
      ))}
      <Page
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Menu;
