import { ListGroup } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { CartContext } from "../../CartContext";
import Item from "./Item";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart?.dishInCarts?.map((item, index) => (
        <ListGroup>
          <ListGroup.Item key={item.id}>
            {index + 1}
            <Item item={item} />
          </ListGroup.Item>
        </ListGroup>
      ))}
    </>
  );
}

export default Cart;
