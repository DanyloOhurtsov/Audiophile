import React from "react";
import styles from "./headerComp.module.scss";
import { allImages } from "../../../dataBase/media/allMedia";
import { Link, useLocation } from "react-router-dom";
import { linksToPages } from "../../../dataBase/dataBase";
import { useLocalStorageData } from "../../../dataBase/hooks/useLocalStorageData";

export const HeaderComp = ({ value }) => {
    const loc = useLocation().pathname;
    const [cartData, setCartData] = useLocalStorageData("cartdata", {
        itemsToBuy: [],
        totalPrice: 0,
    });
    const { itemsToBuy, totalPrice } = cartData;

    const {
        isCartOpen,
        setIsCartOpen,
        isOpenMobileMenu,
        setIsOpenMobileMenu,
        isOrderComplete,
        setIsOrderComplete,
    } = value;

    const hadleCartOpen = () => {
        setIsCartOpen(!isCartOpen);
        document.querySelector("body").classList.toggle("openNavBar");
    };

    const handleNavBarOpen = () => {
        setIsOpenMobileMenu(!isOpenMobileMenu);
        document.querySelector("body").classList.toggle("openNavBar");
    };

    const handleCardSummary = () => {
        document.querySelector("body").classList.remove("openNavBar");
        setIsOrderComplete(false);
        setCartData({
            itemsToBuy: [],
            totalPrice: 0,
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

    //   MOBILE NAV BAR
    const images = [
        {
            id: 0,
            name: "headphones",
            image: allImages.items.XZ_99_MarkII.XZ_99_MarkII_Img1,
        },
        {
            id: 1,
            name: "speakers",
            image: allImages.items.XZ_9.ZX_9_Img1,
        },
        {
            id: 2,
            name: "earphones",
            image: allImages.items.YX_1.YX_1_Img1,
        },
    ];

    const arrow = allImages.icons.arrow_right_orange;
    const copletedOrder = allImages.icons.completedOrder;

    return (
        <div className={styles.headerComp}>
            <div className={styles.contentHeaderComp}>
                {isOrderComplete && (
                    <div className={styles.checkoutPageSummary}>
                        <div className={styles.insidePageSummary}>
                            <img src={copletedOrder} alt="" />
                            <div className={styles.textSection}>
                                <h4>
                                    THANK YOU
                                    <br />
                                    FOR YOUR ORDER
                                </h4>
                                <p>
                                    You will receive an email confirmation
                                    shortly.
                                </p>
                            </div>
                            <div className={styles.productList}>
                                <div className={styles.leftList}>
                                    {resultOfGroupedItems
                                        .slice(0, 1)
                                        .map((item) => (
                                            <div
                                                className={
                                                    styles.summaryOrderItem
                                                }
                                                key={item.item.id}
                                            >
                                                <div
                                                    className={
                                                        styles.leftSummaryOrder
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.imageSummaryOrder
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                item.item
                                                                    .previewPhoto
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.textSummaryOrder
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                styles.nameItemSummaryOrder
                                                            }
                                                        >
                                                            {
                                                                item.item
                                                                    .shortName
                                                            }
                                                        </p>
                                                        <p
                                                            className={
                                                                styles.priceItemSummaryOrder
                                                            }
                                                        >
                                                            $ {item.item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p
                                                    className={
                                                        styles.itemQuantitySummaryOrder
                                                    }
                                                >
                                                    x{item.quantity}
                                                </p>
                                            </div>
                                        ))}
                                    {resultOfGroupedItems.length - 1 > 0 && (
                                        <div className={styles.moreItems}>
                                            <div className={styles.line}></div>
                                            <p>
                                                and{" "}
                                                {resultOfGroupedItems.length -
                                                    1}{" "}
                                                other item(s)
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.rightGrandTotal}>
                                    <h4>Grand Total</h4>
                                    <p>
                                        $ {formatNumberWithCommas(totalPrice)}
                                    </p>
                                </div>
                            </div>
                            <Link to="/" onClick={handleCardSummary}>
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}
                <div className={styles.logoBtn}>
                    {isOpenMobileMenu ? (
                        <button
                            className={`${styles.mobileHeaderCompOpenBtn}`}
                            onClick={handleNavBarOpen}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    ) : (
                        <button
                            className={`${styles.mobileHeaderCompOpenBtn}`}
                            onClick={handleNavBarOpen}
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    )}

                    <Link to={"/"} className={styles.logoLinkHeader}>
                        <img src={allImages.logo} alt="" />
                    </Link>
                </div>
                <div className={styles.buttonsHeaderComp}>
                    {linksToPages.map((link) => (
                        <Link
                            key={link.id}
                            to={link.path}
                            className={`${styles.btnHeaderComp} ${
                                loc === link.path && styles.activeButton
                            }`}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <button
                    className={styles.cardHeaderComp}
                    onClick={hadleCartOpen}
                >
                    <i className="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
            <div
                className={`${styles.mobileNavBar}  ${
                    isOpenMobileMenu === true && styles.openNavBar
                }`}
            >
                <div className={styles.contentMobileNavbar}>
                    {images.map((item) => (
                        <Link
                            to={`/${item.name}`}
                            onClick={handleNavBarOpen}
                            className={styles.itemMobileNavbar}
                            key={item.id}
                        >
                            <img
                                className={styles.imageItemMobileNavbar}
                                src={item.image}
                                alt=""
                                name={item.name}
                            />
                            <h4
                                className={styles.titleItemNavbar}
                                name={item.name}
                            >
                                {item.name}
                            </h4>
                            <button
                                className={styles.buttonShopMobileNavbar}
                                name={item.name}
                            >
                                shop <img src={arrow} alt="" name={item.name} />
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
