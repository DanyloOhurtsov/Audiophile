import React from "react";
import styles from "./productsComp.module.scss";
import { allImages } from "../../../dataBase/media/allMedia";
import { Link } from "react-router-dom";

export const ProductsComp = () => {
  return (
    <div className={styles.productsHomeComp}>
      <div className={styles.productsHomeInside}>
        <div className={styles.zx9Item}>
          <div className={styles.textBlockZx9}>
            <div className={styles.text}>
              <h3 className={styles.titleTextBlockZx9}>ZX9 SPEAKER</h3>
              <p className={styles.descTextBlockZx9}>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
            </div>
            <Link to={"/productpage/ZX_9"} className={styles.buttonProducts}>
              see product
            </Link>
          </div>
        </div>
        <div className={styles.zx7Item}>
          <h3 className={styles.title}>ZX7 SPEAKER</h3>
          <Link to={"/productpage/ZX_7"} className={styles.buttonProducts}>
            See Product
          </Link>
        </div>
        <div className={styles.yx1Item}>
          <div className={styles.leftItemYx1}>
            <img src={allImages.background.earphones} alt="earphones" />
          </div>
          <div className={styles.rightItemYx1}>
            <h3 className={styles.title}>YX1 EARPHONES</h3>
            <Link to={"/productpage/YX_1"} className={styles.buttonProducts}>
              See Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
