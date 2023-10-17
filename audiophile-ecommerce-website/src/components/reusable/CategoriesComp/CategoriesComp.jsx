import React from "react";
import styles from "./categoriesComp.module.scss";
import { allImages } from "../../../dataBase/media/allMedia";
import { Link } from "react-router-dom";

export const CategoriesComp = () => {
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
    <div className={styles.categoriesHome_Comp}>
      <div className={styles.contentCategoriesHome}>
        {images.map((item) => (
          <Link
            to={`/${item.name}`}
            className={styles.itemCategoryHome}
            key={item.id}
          >
            <img
              className={styles.imageItemCategoryHome}
              src={item.image}
              alt=""
              name={item.name}
            />
            <h4 className={styles.titleItemCategoryHome} name={item.name}>
              {item.name}
            </h4>
            <button className={styles.buttonItemCategoryHome} name={item.name}>
              shop <img src={arrow} alt="" />
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};
