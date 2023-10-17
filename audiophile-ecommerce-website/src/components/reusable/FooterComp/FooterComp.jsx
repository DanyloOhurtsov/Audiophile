import React from "react";
import styles from "./footerComp.module.scss";
import { allImages } from "../../../dataBase/media/allMedia";
import { useLocation, Link } from "react-router-dom";
import { linksToPages } from "../../../dataBase/dataBase";

export const FooterComp = () => {
  const loc = useLocation().pathname;
  const logoFooter = allImages.logo;

  return (
    <div className={styles.footerComp}>
      <div className={styles.insideFooter}>
        <div className={styles.topFooter}>
          <div className={styles.firstrowTopFooter}>
            <a href="index.html" className={styles.logoFooter}>
              <img src={logoFooter} alt="logoFooter" />
            </a>
            <div className={styles.buttonsFirstrowTopFooter}>
              {linksToPages.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`${styles.btnTopFooter} ${
                    loc === link.path && styles.activeButton
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <p className={styles.textDescFooter}>
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
        </div>
        <div className={styles.bottomFooter}>
          <p className={styles.copyrightTextBottomFooter}>
            Copyright 2021. All Rights Reserved
          </p>
          <div className={styles.socioBottomFooter}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-facebook" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
