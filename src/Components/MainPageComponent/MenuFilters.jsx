import { Stack, Dropdown, Form, Button } from "react-bootstrap";
import { useState } from "react";

function MenuFilters({ filters = {}, setFilters = () => {}, onApply }) {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleCategorySelect = (eventKey) => {
    setTempFilters((prev) => ({ ...prev, category: eventKey }));
  };

  const handleSortSelect = (eventKey) => {
    setTempFilters((prev) => ({ ...prev, sort: eventKey }));
  };

  const handleVegetarianSwitcher = (e) => {
    setTempFilters((prev) => ({ ...prev, isVegetarian: e.target.checked }));
  };

  const handleApplyFilter = () => {
    setFilters(tempFilters);
    if (onApply) onApply();
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <div className="p-2">
        <Dropdown onSelect={handleCategorySelect}>
          <Dropdown.Toggle variant="success" id="dropdown-category">
            {tempFilters.category || "Categories"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="WOK">WOK</Dropdown.Item>
            <Dropdown.Item eventKey="PIZZA">PIZZA</Dropdown.Item>
            <Dropdown.Item eventKey="Soup">Soup</Dropdown.Item>
            <Dropdown.Item eventKey="Dessert">Dessert</Dropdown.Item>
            <Dropdown.Item eventKey="Drink">Drink</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="p-2">
        <Dropdown onSelect={handleSortSelect}>
          <Dropdown.Toggle variant="success" id="dropdown-sort">
            {tempFilters.sort || "Sort"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="NameAsc">A-Z</Dropdown.Item>
            <Dropdown.Item eventKey="NameDesc">Z-A</Dropdown.Item>
            <Dropdown.Item eventKey="PriceAsc">Price low-high</Dropdown.Item>
            <Dropdown.Item eventKey="PriceDesc">Price high-low</Dropdown.Item>
            <Dropdown.Item eventKey="RatingAsc">Low rate</Dropdown.Item>
            <Dropdown.Item eventKey="RatingDesc">High rate</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="p-2">
        <Form>
          <Form.Check
            type="switch"
            id="vegetarian-switch"
            label="Vegetarian"
            checked={tempFilters.isVegetarian ?? false}
            onChange={handleVegetarianSwitcher}
          />
        </Form>
      </div>
      <Button variant="primary" onClick={handleApplyFilter}>
        Apply Filter
      </Button>
    </Stack>
  );
}

export default MenuFilters;
