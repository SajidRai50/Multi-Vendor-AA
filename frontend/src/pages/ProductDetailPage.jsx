import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Header } from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { ProductDetails } from "../components/Products/ProductDetails.jsx";
import { SuggestedProduct } from "../components/Products/SuggestedProduct.jsx";
import { server } from "../server";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { allProducts } = useSelector((state) => state.product);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (allProducts?.length > 0) {
      const product = allProducts.find((item) => item._id === id);
      setData(product || null);
    }
  }, [allProducts, id]);
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
