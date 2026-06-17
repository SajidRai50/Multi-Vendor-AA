// // import React, { useEffect, useState } from "react";
// // import { productData } from "../../../static/data";
// // import styles from "../../../styles/styles";
// // import { ProductCard } from "../ProductCard/ProductCard";
// // import { useSelector } from "react-redux";

// // export const BestDeals = () => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     const allProductsData = productData ? [...productData] : [];

// //     const sortedData = allProductsData.sort(
// //       (a, b) => b.total_sell - a.total_sell
// //     );

// //     const firstFive = sortedData.slice(0, 5);

// //     setData(firstFive);
// //   }, []);

// //   return (
// //     <div className={styles.section}>
// //       <div className={styles.heading}>
// //         <h1>Best Deals</h1>
// //       </div>

// //       <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
// //         {data && data.length !== 0 && (
// //           <>
// //             {data.map((i, index) => (
// //               <ProductCard data={i} key={index} />
// //             ))}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// import React, { useEffect, useState } from "react";
// import styles from "../../../styles/styles";
// import { ProductCard } from "../ProductCard/ProductCard";

// import { useDispatch, useSelector } from "react-redux";
// import { getAllProducts } from "../../../redux/actions/product.action.js";

// export const BestDeals = () => {
//   const dispatch = useDispatch();

//   // const { products } = useSelector((state) => state.product);

//   // const [data, setData] = useState([]);

//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   // useEffect(() => {
//   //   if (products && products.length > 0) {
//   //     const sortedData = [...products].sort(
//   //       (a, b) => b.total_sell - a.total_sell
//   //     );

//   //     const firstFive = sortedData.slice(0, 5);

//   //     setData(firstFive);
//   //   }
//   // }, [products]);
//   const { products = [] } = useSelector((state) => state.product);

// const data = products.slice(0, 5);
//   return (
//     <div>
//       <div className={`${styles.section}`}>
//         <div className={`${styles.heading}`}>
//           <h1>Best Deals</h1>
//         </div>

//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
//           {data &&
//             data.map((item) => <ProductCard key={item._id} data={item} />)}
//         </div>
//       </div>
//     </div>
//   );
// };
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