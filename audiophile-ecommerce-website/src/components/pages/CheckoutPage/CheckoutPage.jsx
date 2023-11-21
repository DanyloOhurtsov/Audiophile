import React from "react";
import style from "./checkoutPage.module.scss";
import { Link } from "react-router-dom";

export const CheckoutPage = () => {
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
                                    <div className={style.itemInputHalf}>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Alexei Ward"
                                        />
                                    </div>
                                    <div className={style.itemInputHalf}>
                                        <label htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="alexei@mail.com"
                                        />
                                    </div>
                                    <div className={style.itemInputHalf}>
                                        <label htmlFor="phone">
                                            Phone number
                                        </label>
                                        <input
                                            type="tel"
                                            id="name"
                                            placeholder="+1 202-555-0136"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={style.shippingInfo}>
                                <h4 className={style.title4}>Shipping info</h4>
                                <div className={style.contentInputs}>
                                    <div className={style.itemInputFull}>
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="1137 Williams Avenue"
                                        />
                                    </div>
                                    <div className={style.itemInputHalf}>
                                        <label htmlFor="zip">ZIP Code</label>
                                        <input
                                            type="number"
                                            id="zip"
                                            placeholder="01001"
                                        />
                                    </div>
                                    <div className={style.itemInputHalf}>
                                        <label htmlFor="City">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            placeholder="01001"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={style.paymentsDetails}>
                                <h4 className={style.title4}>
                                    Payment details
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className={style.summaryCheckout}>
                        <h3 className={style.title3SummaryCheckout}>Summary</h3>
                        <button className={style.checkoutButton}>chekout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
