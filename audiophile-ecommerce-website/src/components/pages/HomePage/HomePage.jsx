import React, { useEffect, Fragment } from "react";
import { HeroComp } from "../../reusable/HeroComp/HeroComp";
import { CategoriesComp } from "../../reusable/CategoriesComp/CategoriesComp";
import { DescriptionComp } from "../../reusable/DescriptionComp/DescriptionComp";
import { ProductsComp } from "../../reusable/ProductsComp/ProductsComp";

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  });

  return (
    <Fragment>
      <HeroComp />
      <CategoriesComp />
      <ProductsComp />
      <DescriptionComp />
    </Fragment>
  );
};
