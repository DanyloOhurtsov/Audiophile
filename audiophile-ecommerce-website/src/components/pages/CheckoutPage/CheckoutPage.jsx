import React, { useContext, useState } from "react";
import style from "./checkoutPage.module.scss";
import { Link } from "react-router-dom";
import { CartContext } from "../../../dataBase/context/cart.context";

export const CheckoutPage = () => {
    const cartContext = useContext(CartContext);
    const { itemsToBuy, totalPrice } = cartContext;
    const [infoPerson, setInfoPerson] = useState({
        name: { value: "", filled: false },
        email: { value: "", filled: false },
        phone: { value: "", filled: false },
        address: { value: "", filled: false },
        city: { value: "", filled: false },
        zip: { value: "", filled: false },
        paymentMethod: { value: "e-Money", filled: true },
    });
    const inputList = {
        billingDetails: [
            {
                id: 0,
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Alexei Ward",
                large: false,
            },
            {
                id: 1,
                name: "email",
                label: "Email Address",
                type: "email",
                placeholder: "alexei@mail.com",
                large: false,
            },
            {
                id: 2,
                name: "phone",
                label: "Phone Number",
                type: "tel",
                placeholder: "+1 202-555-0136",
                large: false,
            },
        ],
        shippingInfo: [
            {
                id: 0,
                name: "address",
                label: "Address",
                type: "text",
                placeholder: "1137 Williams Avenue",
                large: true,
            },
            {
                id: 1,
                name: "zip",
                label: "ZIP Code",
                type: "number",
                placeholder: "01001",
                large: false,
            },
            {
                id: 2,
                name: "city",
                label: "City",
                type: "text",
                placeholder: "New York",
                large: false,
            },
        ],
    };

    const handleCheckout = () => {
        if (
            Object.values(infoPerson).every((field) => field.filled) &&
            infoPerson.paymentMethod
        ) {
            console.log(infoPerson);
        } else {
            console.log("NOT ENOUGH", infoPerson);
        }
    };
    const handleChangeInput = (e) => {
        setInfoPerson({
            ...infoPerson,
            [e.target.id]: { value: e.target.value, filled: !!e.target.value },
        });
    };
    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
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

    return (
        <div className={style.checkoutPage}>
            <div className={style.insideCheckout}>
                <Link to={"/"} className={style.buttonGoBack}>
                    Go back
                </Link>
                <div className={style.contentCheckout}>
                    <div className={style.inputCheckout}>
                        <h2 className={style.title2InputCheckout}>Checkout</h2>
                        <div className={style.inputs}>
                            <div className={style.billingDetails}>
                                <h4 className={style.title4}>
                                    Billing details
                                </h4>
                                <div className={style.contentInputs}>
                                    {inputList.billingDetails.map((item) => (
                                        <div
                                            className={`${
                                                item.large
                                                    ? style.itemInputFull
                                                    : style.itemInputHalf
                                            } ${
                                                !infoPerson[item.name].filled
                                                    ? style.emptyField
                                                    : ""
                                            }`}
                                            key={item.id}
                                        >
                                            <label htmlFor={item.name}>
                                                {item.label}
                                            </label>
                                            <input
                                                onChange={(event) =>
                                                    handleChangeInput(event)
                                                }
                                                type={item.type}
                                                id={item.name}
                                                placeholder={item.placeholder}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={style.shippingInfo}>
                                <h4 className={style.title4}>Shipping info</h4>
                                <div className={style.contentInputs}>
                                    {inputList.shippingInfo.map((item) => (
                                        <div
                                            className={`${
                                                item.large
                                                    ? style.itemInputFull
                                                    : style.itemInputHalf
                                            } ${
                                                !infoPerson[item.name].filled
                                                    ? style.emptyField
                                                    : ""
                                            }`}
                                            key={item.id}
                                        >
                                            <label htmlFor={item.name}>
                                                {item.label}
                                            </label>
                                            <input
                                                onChange={(event) =>
                                                    handleChangeInput(event)
                                                }
                                                type={item.type}
                                                id={item.name}
                                                placeholder={item.placeholder}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={style.paymentsDetails}>
                                <h4 className={style.title4}>
                                    Payment details
                                </h4>
                                <div className={style.inputContent}>
                                    <div className={style.paymentType}>
                                        <p className={style.labelPaymentType}>
                                            Payment Method
                                        </p>
                                        <div
                                            className={
                                                style.selectorPaymentType
                                            }
                                        >
                                            <button
                                                className={
                                                    style.buttonPaymentType
                                                }
                                                onClick={(event) =>
                                                    handleChangeInput(event)
                                                }
                                                value="e-Money"
                                                id="paymentMethod"
                                            >
                                                <div
                                                    className={`${
                                                        style.point
                                                    } ${
                                                        infoPerson.paymentMethod
                                                            .value === "e-Money"
                                                            ? style.activeButtonType
                                                            : ""
                                                    }`}
                                                ></div>
                                                <p>e-Money</p>
                                            </button>
                                            <button
                                                className={
                                                    style.buttonPaymentType
                                                }
                                                value={"cash"}
                                                id="paymentMethod"
                                                onClick={(event) =>
                                                    handleChangeInput(event)
                                                }
                                            >
                                                <div
                                                    className={`${
                                                        style.point
                                                    } ${
                                                        infoPerson.paymentMethod
                                                            .value === "cash"
                                                            ? style.activeButtonType
                                                            : ""
                                                    }`}
                                                ></div>
                                                <p>Cash on Delivery</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.summaryCheckout}>
                        <h3 className={style.title3SummaryCheckout}>Summary</h3>
                        <div className={style.cardProductList}>
                            {resultOfGroupedItems.map((item) => (
                                <div
                                    className={style.cartItem}
                                    key={item.item.id}
                                >
                                    <div className={style.leftCartItem}>
                                        <div className={style.imageCartItem}>
                                            <img
                                                src={item.item.previewPhoto}
                                                alt=""
                                            />
                                        </div>
                                        <div className={style.textCartItem}>
                                            <p className={style.nameItem}>
                                                {item.item.shortName}
                                            </p>
                                            <p className={style.priceItem}>
                                                $ {item.item.price}
                                            </p>
                                        </div>
                                    </div>
                                    <p className={style.itemQuantity}>
                                        x{item.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className={style.totalContent}>
                            <div className={style.mainTotalContent}>
                                <div className={style.itemTotal}>
                                    <p className={style.title}>Total</p>
                                    <p className={style.price}>
                                        ${" "}
                                        {formatNumberWithCommas(
                                            totalPrice.toFixed(0)
                                        )}
                                    </p>
                                </div>
                                <div className={style.itemTotal}>
                                    <p className={style.title}>Shipping</p>
                                    <p className={style.price}>$ 40</p>
                                </div>
                                <div className={style.itemTotal}>
                                    <p className={style.title}>
                                        VAT (included)
                                    </p>
                                    <p className={style.price}>
                                        ${" "}
                                        {formatNumberWithCommas(
                                            ((totalPrice / 100) * 1.9).toFixed(
                                                0
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className={style.itemTotal}>
                                <p className={style.title}>Grand total</p>
                                <p
                                    className={`${style.price} ${style.grandTotal}`}
                                >
                                    ${" "}
                                    {formatNumberWithCommas(
                                        (totalPrice + 40).toFixed(0)
                                    )}
                                </p>
                            </div>
                            <button
                                className={style.checkoutButton}
                                onClick={handleCheckout}
                            >
                                checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
