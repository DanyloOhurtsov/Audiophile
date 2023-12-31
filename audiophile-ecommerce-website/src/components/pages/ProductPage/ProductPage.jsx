import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./productPage.module.scss";
import { CartContext } from "../../../dataBase/context/cart.context";
import { DescriptionComp } from "../../reusable/DescriptionComp/DescriptionComp";
import { CategoriesComp } from "../../reusable/CategoriesComp/CategoriesComp";

async function getData() {
    const responce = await fetch(
        "https://audiophile-5140e-default-rtdb.europe-west1.firebasedatabase.app/dataProducts.json"
    );
    const jsonData = await responce.json();
    return jsonData;
}

export const ProductPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const history = useNavigate();
    const handleBack = () => {
        history(-1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                setProduct(data[productId]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [productId]);

    const { itemsToBuy, setCartData } = useContext(CartContext);

    const [disabledButton, setDisabledButton] = useState({
        minusButton: true,
        plusButton: false,
    });
    const { plusButton, minusButton } = disabledButton;

    const [quantity, setQuantity] = useState(1);
    const handleChangeQuantity = (event) => {
        let number = quantity;
        if (event.target.id === "minus") {
            if (number <= 2) {
                number = 1;
                setDisabledButton({
                    plusButton: false,
                    minusButton: true,
                });
            } else {
                number--;
                setDisabledButton({
                    minusButton: false,
                    plusButton: false,
                });
            }
        } else {
            if (number >= 98) {
                number = 99;
                setDisabledButton({
                    plusButton: true,
                    minusButton: false,
                });
            } else {
                number++;
                setDisabledButton({
                    minusButton: false,
                    plusButton: false,
                });
            }
        }
        setQuantity(number);
    };
    const addToCart = () => {
        const newItems = [];
        for (let i = 0; i < quantity; i++) {
            newItems.push(product);
        }
        const updatedItems = [...itemsToBuy, ...newItems];
        setCartData({
            itemsToBuy: updatedItems,
            totalPrice: updatedItems.reduce(
                (acc, item) => (acc += item.price),
                0
            ),
        });
    };

    return (
        <div className={styles.productPage}>
            {product !== null && (
                <div className={styles.contentProductPage}>
                    <button
                        onClick={handleBack}
                        className={styles.buttonGoBack}
                    >
                        Go back
                    </button>
                    <div className={styles.productInfo}>
                        <div className={styles.mainInfo}>
                            <div className={styles.leftBlockMainInfo}>
                                <img
                                    src={product.previewPhoto}
                                    alt="NothingHere"
                                />
                            </div>
                            <div className={styles.rightBlockMainInfo}>
                                {product.new && (
                                    <p className={styles.new}>New product</p>
                                )}
                                <h2 className={styles.productTitleName}>
                                    {product.name}
                                </h2>
                                <p className={styles.descProduct}>
                                    {product.desc}
                                </p>
                                <p className={styles.priceProduct}>
                                    $ {product.price}
                                </p>
                                <div className={styles.buttonsProductPage}>
                                    <div className={styles.quantityProduct}>
                                        <button
                                            disabled={minusButton}
                                            id="minus"
                                            onClick={(event) =>
                                                handleChangeQuantity(event)
                                            }
                                        >
                                            <i
                                                className="fa-solid fa-minus"
                                                style={{
                                                    pointerEvents: "none",
                                                }}
                                            ></i>
                                        </button>
                                        <p>{quantity}</p>
                                        <button
                                            disabled={plusButton}
                                            id="plus"
                                            onClick={(event) =>
                                                handleChangeQuantity(event)
                                            }
                                        >
                                            <i
                                                className="fa-solid fa-plus"
                                                style={{
                                                    pointerEvents: "none",
                                                }}
                                            ></i>
                                        </button>
                                    </div>
                                    <button
                                        className={styles.addToCartButton}
                                        onClick={addToCart}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CategoriesComp />
                    <DescriptionComp />
                </div>
            )}
        </div>
    );
};
