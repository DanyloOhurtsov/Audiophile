import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FooterComp } from "./reusable/FooterComp/FooterComp";
import { HeaderComp } from "./reusable/HeaderComp/HeaderComp";
import { HomePage } from "./pages/HomePage/HomePage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";

export const MainComp = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
    const [isOrderComplete, setIsOrderComplete] = useState(false);

    return (
        <CartPage value={{ isCartOpen, setIsCartOpen }}>
            <HeaderComp
                value={{
                    isCartOpen,
                    setIsCartOpen,
                    isOpenMobileMenu,
                    setIsOpenMobileMenu,
                    isOrderComplete,
                    setIsOrderComplete,
                }}
            />
            <Routes>
                {/* Main page */}
                <Route path="/" element={<HomePage />} />
                {/* Catalogs page */}
                <Route path="/headphones" element={<CatalogPage />} />
                <Route path="/speakers" element={<CatalogPage />} />
                <Route path="/earphones" element={<CatalogPage />} />
                {/* Product Page */}
                <Route
                    exact
                    path="/productpage/:productId"
                    element={<ProductPage />}
                />
                {/* Cart Page */}
                <Route
                    exact
                    path="/checkout"
                    element={
                        <CheckoutPage
                            value={{ isOrderComplete, setIsOrderComplete }}
                        />
                    }
                />
            </Routes>
            <FooterComp />
        </CartPage>
    );
};
