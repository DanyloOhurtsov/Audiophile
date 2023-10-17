import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FooterComp } from "./reusable/FooterComp/FooterComp";
import { HeaderComp } from "./reusable/HeaderComp/HeaderComp";
import { HomePage } from "./pages/HomePage/HomePage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";

export const MainComp = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  return (
    <CartPage value={{ isCartOpen }}>
      <HeaderComp
        value={{
          isCartOpen,
          setIsCartOpen,
          isOpenMobileMenu,
          setIsOpenMobileMenu,
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
        <Route exact path="/productpage/:productId" element={<ProductPage />} />
      </Routes>
      <FooterComp />
    </CartPage>
  );
};
