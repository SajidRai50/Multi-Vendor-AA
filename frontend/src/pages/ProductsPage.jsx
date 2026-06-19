import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Header } from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { ProductCard } from "../components/Route/ProductCard/ProductCard";

import styles from "../styles/styles";
import { getAllProducts } from "../redux/actions/product.action";

export const ProductsPage = () => {
  const dispatch = useDispatch();

  const { allProducts, isLoading } = useSelector(
    (state) => state.product
  );

  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products =
    categoryData === null
      ? allProducts || []
      : allProducts.filter(
          (item) =>
            item.category?.toLowerCase() ===
            categoryData.toLowerCase()
        );

  return (
    <div>
      <Header activeHeading={3} />

      <div className={`${styles.section} mt-10`}>
        <div className={styles.heading}>
          {categoryData
            ? `${categoryData} Products`
            : "All Products"}
        </div>

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
          {isLoading ? (
            [...Array(10)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white rounded-lg shadow p-4"
              >
                <div className="h-[180px] bg-gray-300 rounded"></div>

                <div className="mt-4 h-4 bg-gray-300 rounded"></div>

                <div className="mt-2 h-4 w-2/3 bg-gray-300 rounded"></div>

                <div className="mt-4 h-6 w-1/3 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((item) => (
              <ProductCard
                key={item._id}
                data={item}
              />
            ))
          ) : (
            <h1 className="col-span-full text-center text-red-500 text-[20px]">
              No Products Found!
            </h1>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;