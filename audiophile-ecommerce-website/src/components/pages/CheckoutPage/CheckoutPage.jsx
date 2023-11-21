import React, { useState } from "react";
import style from "./checkoutPage.module.scss";
import { Link } from "react-router-dom";

export const CheckoutPage = () => {
    const [infoPerson, setInfoPerson] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        paymentMethod: "e-Money",
        emoneyNumber: "",
        emoneyPin: "",
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
        console.log(infoPerson);
    };
    const handleChangeInput = (e) => {
        setInfoPerson({ ...infoPerson, [e.target.id]: e.target.value });
    };

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
                                        <div className={style.selectorPaymentType}>
                                            <button
                                                className={`${
                                                    infoPerson.paymentMethod ===
                                                    "e-Money"
                                                        ? style.activeButtonType
                                                        : ""
                                                } ${style.buttonPaymentType}`}
                                                onClick={(event) =>
                                                    handleChangeInput(event)
                                                }
                                                value="e-Money"
                                                id="paymentMethod"
                                            >
                                                <div
                                                    className={style.point}
                                                ></div>
                                                <p>e-Money</p>
                                            </button>
                                            <button
                                                className={`${
                                                    infoPerson.paymentMethod ===
                                                    "cash"
                                                        ? style.activeButtonType
                                                        : ""
                                                } ${style.buttonPaymentType}`}
                                                value={"cash"}
                                                id="paymentMethod"
                                                onClick={(event) =>
                                                    handleChangeInput(event)
                                                }
                                            >
                                                <div
                                                    className={style.point}
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
                        <div className={style.totalContent}>
                            <div className={style.itemTotal}>
                                <p>Total</p>
                                <p className={style.price}>$ 0.00</p>
                            </div>
                            <div className={style.itemTotal}>
                                <p>Shipping</p>
                                <p className={style.price}>$ 0.00</p>
                            </div>
                            <div className={style.itemTotal}>
                                <p>VAT (included)</p>
                                <p className={style.price}>$ 0.00</p>
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
