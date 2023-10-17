import React, { useEffect } from "react";
import styles from "./catalogPage.module.scss";
import { Link, useLocation } from "react-router-dom";
import { dataProducts } from "../../../dataBase/dataBase";
import { CategoriesComp } from "../../reusable/CategoriesComp/CategoriesComp";
import { DescriptionComp } from "../../reusable/DescriptionComp/DescriptionComp";

export const CatalogPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  });
  const loc = useLocation().pathname.replace(/^\/+/, "");
  const data = Object.values(dataProducts).filter((item) => item.type === loc);

  return (
    <div className={styles.catalogComp}>
      <div className={styles.titleCatalogComp}>
        <h2 className={styles.title2}>{loc}</h2>
      </div>
      <div className={styles.contentCatalog}>
        <div className={styles.productlistCatalog}>
          {data.map((item) => (
            <div className={`${styles.itemCatalog}`} key={item.id}>
              <div className={styles.imgItem}>
                <img src={item.previewPhoto} alt="" />
              </div>
              <div className={styles.textItem}>
                {item.new && <p className={styles.new}>New product</p>}
                <h3 className={styles.titleItem}>{item.name}</h3>
                <p className={styles.decsItem}>{item.desc}</p>
                <Link to={`/productpage/${item.link}`} className={styles.buttonItem}>See product</Link>
              </div>
            </div>
          ))}
        </div>
        <CategoriesComp />
        <DescriptionComp />
      </div>
    </div>
  );
};
