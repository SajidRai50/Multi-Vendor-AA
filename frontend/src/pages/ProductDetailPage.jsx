import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Header } from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { ProductDetails } from "../components/Products/ProductDetails.jsx";
import {SuggestedProduct} from "../components/Products/SuggestedProduct.jsx";

export const ProductDetailPage = () => {
  const { allProducts } = useSelector((state) => state.product);

  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!allProducts?.length) return;

    const product = allProducts.find(
      (item) => item.name.replace(/\s+/g, "-") === name
    );

    setData(product || null);
  }, [name, allProducts]);

  return (
    <div>
      <Header />

      {data ? (
        <>
          <ProductDetails data={data} />
          <SuggestedProduct data={data} />
        </>
      ) : (
        <div className="text-center py-10">
          <h2>Product not found</h2>
        </div>
      )}

      <Footer />
    </div>
  );
};