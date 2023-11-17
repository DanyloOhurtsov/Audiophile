import React from "react";
import styles from "./cartPage.module.scss";
import { CartContext } from "../../../dataBase/context/cart.context";
import { useLocalStorageData } from "../../../dataBase/hooks/useLocalStorageData";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export function CartPage(props) {
  const { children, value } = props;
  const [cartData, setCartData] = useLocalStorageData("cartdata", {
    itemsToBuy: [],
    totalPrice: 0,
  });
  const { itemsToBuy, totalPrice } = cartData;
  const { isCartOpen, setIsCartOpen } = value;
  

  const generateCartItems = (items) => {
    const mappedItems = items.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = {
          item,
          quantity: 1,
        };
      } else {
        acc[item.id].quantity++;
      }

      return acc;
    }, {});

    const sortedItems = Object.values(mappedItems).sort((a, b) => {
      const totalPriceA = a.item.price * a.quantity;
      const totalPriceB = b.item.price * b.quantity;

      return totalPriceB - totalPriceA;
    });

    return sortedItems;
  };
  const resultOfGroupedItems = generateCartItems(itemsToBuy);

  const handleRemovewAll = () => {
    setCartData({
      itemsToBuy: [],
      totalPrice: 0,
    });
  };
  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  }

  const changeItemQuantityAndPrice = (itemToChange, quantity, button) => {
    const clearedItems = itemsToBuy.filter(
      (itemsToRemove) => itemsToRemove.id !== itemToChange.item.id
    );

    if (button === "minus") {
      quantity--;
    } else if (button === "plus") {
      quantity++;
    }
    for (let i = 0; i < quantity; i++) {
      let itemToPush = itemToChange.item;
      clearedItems.push(itemToPush);
    }
    const updateTotalPrice = clearedItems.reduce(
      (acc, item) => (acc += item.price),
      0
    );
    setCartData({
      itemsToBuy: clearedItems,
      totalPrice: updateTotalPrice,
    });
  };

  return (
    <CartContext.Provider
      value={{
        itemsToBuy,
        totalPrice,
        setCartData,
      }}
    >
      <Modal
        className={styles.cart}
        appElement={document.querySelector(".App")}
        isOpen={isCartOpen}
      >
        <div className={styles.insideCart}>
          <div className={styles.topLineCart}>
            <p className={styles.titleCart}>Cart ({itemsToBuy.length})</p>
            <button
              className={styles.removeAllButton}
              onClick={handleRemovewAll}
            >
              Remove all
            </button>
          </div>
          <div className={styles.cartItems}>
            {!resultOfGroupedItems.length && (
              <p className={styles.emptyCart}>Cart is empty</p>
            )}
            {resultOfGroupedItems.map((item) => (
              <div className={styles.cartItem} key={item.item.id}>
                <div className={styles.leftCartItem}>
                  <div className={styles.imageCartItem}>
                    <img src={item.item.previewPhoto} alt="" />
                  </div>
                  <div className={styles.textCartItem}>
                    <p className={styles.nameItem}>{item.item.shortName}</p>
                    <p className={styles.priceItem}>$ {item.item.price}</p>
                  </div>
                </div>
                <div className={styles.quantityCartItem}>
                  <button
                    onClick={() =>
                      changeItemQuantityAndPrice(item, item.quantity, "minus")
                    }
                  >
                    <i
                      className="fa-solid fa-minus"
                      style={{ pointerEvents: "none" }}
                    ></i>
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() =>
                      changeItemQuantityAndPrice(item, item.quantity, "plus")
                    }
                  >
                    <i
                      className="fa-solid fa-plus"
                      style={{ pointerEvents: "none" }}
                    ></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {resultOfGroupedItems.length ? (
            <div className={styles.totalCartBlock}>
              <div className={styles.textBlockTotal}>
                <p className={styles.text}>Total</p>
                <p className={styles.totalPriceText}>
                  {totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <Link to={'/checkout'} onClick={handleCartOpen} className={styles.checkoutButtonCart}>Checkout</Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
      {children}
    </CartContext.Provider>
  );
}