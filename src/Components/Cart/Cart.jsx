import { ListGroup } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";
import Item from "./Item";
import { TiShoppingCart } from "react-icons/ti";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart?.dishInCarts?.length > 0 ? (
        cart?.dishInCarts?.map((item, index) => (
          <ListGroup key={item.id}>
            <ListGroup.Item>
              {index + 1}
              <Item item={item} />
            </ListGroup.Item>
          </ListGroup>
        ))
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <p className="text-muted fs-4">
            {" "}
            <TiShoppingCart className="fs-1" /> Cart is empty.
          </p>
        </div>
      )}
    </>
  );
}

export default Cart;
