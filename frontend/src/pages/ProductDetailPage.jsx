import React, { useEffect, useState } from "react";
import { Header } from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

import { ProductDetails } from "../components/Products/ProductDetails.jsx";
import { useParams } from "react-router-dom";
import { productData } from "../static/data.jsx";
import SuggestedProduct from '../components/Products/SuggestedProduct.jsx'

export const ProductDetailPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const createSlug = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  console.log(name)

 useEffect(() => {
  const foundProduct = productData.find(
    (i) => createSlug(i.name) === name.toLowerCase()
  );
  setData(foundProduct);
}, [name]);


  return (
    <div>
      <Header />
      <ProductDetails data={data}/>

       {data && <SuggestedProduct data={data} />}

      <Footer />
    </div>
  );
};
