import React, { useState, useEffect, createContext } from "react";
import db from "../../db/firebase-config";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { app } from "../fb";

const CartContext = createContext();

function CartProvider({ children }) {
  const [ItemsList, setItems] = useState([]);
  const itemsCollectionRef = collection(db, "ItemList");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const getItems = async () => {
    const querySnapshot = await getDocs(itemsCollectionRef);
    setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  const [cart, setCart] = useState([]);
  const addCart = (id, value) => {
    const posicion = cart.findIndex((item) => item.id === id);
    if (posicion === -1) {
      const items = ItemsList.filter((product) => product.id === id);
      const itemsActualizados = items.map((item) => ({
        ...item,
        cantidad: parseInt(value),
      }));
      setCart([...cart, ...itemsActualizados]);
    } else {
      const newCart = [...cart];
      newCart[posicion].cantidad =
        parseInt(newCart[posicion].cantidad) + parseInt(value);
      setCart(newCart);
    }
  };

  function vaciarCarrito() {
    setCart([]);
  }
  function getSumaCart() {
    return cart.reduce((sum, item) => sum + item.cantidad, 0);
  }
  function eliminaItem(id) {
    let newCart = cart.filter((itemInCart) => itemInCart.id !== id);
    setCart(newCart);
  }
/* 
  const addToFavorites = (id) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id]);
    }
  }; */

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav !== id));
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  const favoritesCollectionRef = collection(db, "favs");

  const addToFavorites = (id) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id]);
      // agregar a la colección FAVS
      const newFavorite = {
        userId: app.auth().currentUser.uid, // obtener el id del usuario actual
        productId: id,
        createdAt: new Date(),
      };
      addDoc(favoritesCollectionRef, newFavorite)
        .then((docRef) => {
          console.log("Favorito agregado con ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error al agregar favorito: ", error);
        });
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  useEffect(() => {
    setCart(initialCart);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        ItemsList,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        vaciarCarrito,
        setItems,
        loading,
        setLoading,
        addCart,
        getSumaCart,
        eliminaItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartProvider, CartContext };
export default CartContext;
