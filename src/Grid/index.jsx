import { Link } from "react-router-dom";
import Form from "../Form";
import Item from "../Item";
import { useContext } from "react";
import {CartContext} from '../Context/index';

const Grid = () => {
  const { cart, addCart, ItemList } = useContext(CartContext);

  return (
    <>
      {/* <Form setItems={setItems} /> */}
      {ItemList.map((item) => {
        return (
          // <Link to={`${item.id}`} key={item.id}>
          <Item item={item} key={item.id} />
          // </Link>
        );
      })}
    </>
  );
};

export default Grid;
