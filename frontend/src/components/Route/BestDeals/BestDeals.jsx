import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { ProductCard } from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product.action.js";

export const BestDeals = () => {
  const dispatch = useDispatch();

  const { allProducts = [] } = useSelector((state) => state.product);

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts.length > 0) {
      setData(allProducts.slice(0, 5));
    }
  }, [allProducts]);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((item) => (
            <ProductCard key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};