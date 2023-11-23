import React, { useEffect, useState } from "react";
import styles from "./catalogPage.module.scss";
import { Link, useLocation } from "react-router-dom";
import { CategoriesComp } from "../../reusable/CategoriesComp/CategoriesComp";
import { DescriptionComp } from "../../reusable/DescriptionComp/DescriptionComp";

async function getData() {
    const responce = await fetch(
        "https://audiophile-5140e-default-rtdb.europe-west1.firebasedatabase.app/dataProducts.json"
    );
    const jsonData = await responce.json();
    return jsonData;
}

export const CatalogPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    });
    const loc = useLocation().pathname.replace(/^\/+/, "");

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const data = await getData();
                const newData = Object.values(data).filter(
                    (item) => item.type === loc
                );
                setData(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchedData();
    }, [loc]);
    console.log(data);

    return (
        <div className={styles.catalogComp}>
            <div className={styles.titleCatalogComp}>
                <h2 className={styles.title2}>{loc}</h2>
            </div>
            {data !== null && (
                <div className={styles.contentCatalog}>
                    <div className={styles.productlistCatalog}>
                        {data.map((item) => (
                            <div
                                className={`${styles.itemCatalog}`}
                                key={item.id}
                            >
                                <div className={styles.imgItem}>
                                    <img src={item.previewPhoto} alt="" />
                                </div>
                                <div className={styles.textItem}>
                                    {item.new && (
                                        <p className={styles.new}>
                                            New product
                                        </p>
                                    )}
                                    <h3 className={styles.titleItem}>
                                        {item.name}
                                    </h3>
                                    <p className={styles.decsItem}>
                                        {item.desc}
                                    </p>
                                    <Link
                                        to={`/productpage/${item.link}`}
                                        className={styles.buttonItem}
                                    >
                                        See product
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CategoriesComp />
                    <DescriptionComp />
                </div>
            )}
        </div>
    );
};
