import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { Header } from "../components/Layout/Header";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import Footer from "../components/Layout/Footer";
import { ProductCard } from "../components/Route/ProductCard/ProductCard";

export const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />

      <div className={`${styles.section} mt-10`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 mb-12">
          {data.map((item, index) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
