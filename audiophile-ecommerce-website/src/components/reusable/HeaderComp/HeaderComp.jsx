import React from "react";
import styles from "./headerComp.module.scss";
import { allImages } from "../../../dataBase/media/allMedia";
import { Link, useLocation } from "react-router-dom";
import { linksToPages } from "../../../dataBase/dataBase";

export const HeaderComp = ({ value }) => {
  const loc = useLocation().pathname;
  const {
    isCartOpen,
    setIsCartOpen,
    isOpenMobileMenu,
    setIsOpenMobileMenu,
  } = value;
  const hadleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  const handleNavBarOpen = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
    document.querySelector("body").classList.toggle("openNavBar");
  };
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

  return (
    <div className={styles.headerComp}>
      <div className={styles.contentHeaderComp}>
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
        <button className={styles.cardHeaderComp} onClick={hadleCartOpen}>
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
              <h4 className={styles.titleItemNavbar} name={item.name}>
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
