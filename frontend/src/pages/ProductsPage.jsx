import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { Header } from "../components/Layout/Header";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import Footer from "../components/Layout/Footer";
import { ProductCard } from "../components/Route/ProductCard/ProductCard";

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!categoryData) {
      // Show all products sorted by sales
      const sorted = [...productData].sort(
        (a, b) => b.total_sell - a.total_sell
      );
      setData(sorted);
    } else {
      // Filter products by category (case-insensitive)
      const filtered = productData.filter(
        (item) =>
          item.category.toLowerCase() === categoryData.toLowerCase()
      );
      setData(filtered);
    }
  }, [categoryData]);

  return (
    <div>
      <Header activeHeading={3} />

      <div className={`${styles.section} mt-10`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 mb-12">
          {data.map((item, index) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>

        {data.length === 0 && (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        )}
      </div>

      <Footer />
    </div>
  );
};