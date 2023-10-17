import React from "react";
import { allImages } from "../../../dataBase/media/allMedia";
import styles from './heroComp.module.scss'
import { Link } from "react-router-dom";

export const HeroComp = () => {
  return (
    <div className={styles.heroHomeComp}>
      <div className={styles.contentHeroHome}>
        <div className={styles.textInfoHeroHome}>
          <p className={styles.subTitleHeroHome}>NEW PRODUCT</p>
          <h1 className={styles.titleHeroHome}>
            XX99 Mark II Headphones
          </h1>
          <p className={styles.decriptionHeroHome}>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link to={'/productpage/XZ_99_MarkII'} className={styles.buttonHeroHome}>
            See Product
          </Link>
        </div>
        <div className={styles.imgHeroHome}>
          <img src={allImages.background.headphonesFull} alt="" />
        </div>
      </div>
    </div>
  );
};
