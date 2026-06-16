

// import React, { useEffect } from "react";
// import styles from "../../../styles/styles";
// import { ProductCard } from "../ProductCard/ProductCard.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllProductsShop } from "../../../redux/actions/product.action.js";


// // Simple Skeleton Card
// const SkeletonCard = () => {
//   return (
//     <div className="w-full h-[250px] bg-gray-200 animate-pulse rounded-md"></div>
//   );
// };

// export const BestDeals = () => {
//   const dispatch = useDispatch();

//   const { products, isLoading, error } = useSelector(
//     (state) => state.products
//   );

//   useEffect(() => {
//     // fetch only if not already loaded
//     if (!products || products.length === 0) {
//       dispatch(getAllProductsShop());
//     }
//   }, [dispatch]);

//   const bestDeals = products?.slice(0, 2) || [];

//   return (
//     <div className={styles.section}>
//       <div className={styles.heading}>
//         <h1>Best Deals</h1>
//       </div>

//       {/* 🔄 Loading State (Skeleton) */}
//       {isLoading && (
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </div>
//       )}

//       {/* ❌ Error State */}
//       {!isLoading && error && (
//         <div className="text-red-500 text-center py-10">
//           Failed to load products. Please try again.
//         </div>
//       )}

//       {/* 📭 Empty State */}
//       {!isLoading && !error && bestDeals.length === 0 && (
//         <div className="text-gray-500 text-center py-10">
//           No deals available right now.
//         </div>
//       )}

//       {/* ✅ Data State */}
//       {!isLoading && !error && bestDeals.length > 0 && (
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
//           {bestDeals.map((item) => (
//             <ProductCard data={item} key={item._id} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// // import React, { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import styles from "../../../styles/styles";
// // import {ProductCard} from "../ProductCard/ProductCard";

// // export const BestDeals = () => {
// //   const [data, setData] = useState([]);
// //   const { allProducts } = useSelector((state) => state.products);
// //   useEffect(() => {
// //     const allProductsData = allProducts ? [...allProducts] : [];
// //     const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out);
// //     const firstFive = sortedData && sortedData.slice(0, 5);
// //     setData(firstFive);
// //   }, [allProducts]);


// //   return (
// //     <div>
// //       <div className={`${styles.section}`}>
// //         <div className={`${styles.heading}`}>
// //           <h1>Best Deals</h1>
// //         </div>
// //         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
// //            {
// //             data && data.length !== 0 &&(
// //               <>
// //                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
// //               </>
// //             )
// //            }
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

import React, { useEffect } from "react";
import styles from "../../../styles/styles";
import { ProductCard } from "../ProductCard/ProductCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsShop } from "../../../redux/actions/product.action.js";

// Simple Skeleton Card
const SkeletonCard = () => {
  return (
    <div className="w-full h-[250px] bg-gray-200 animate-pulse rounded-md"></div>
  );
};

export const BestDeals = () => {
  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector(
    (state) => state.products
  );

  // 🔍 Log Redux state on every render
  console.log("🔄 Redux State → products:", products);
  console.log("⏳ isLoading:", isLoading);
  console.log("❌ error:", error);

  useEffect(() => {
    console.log("📦 useEffect triggered");

    if (!products || products.length === 0) {
      console.log("🚀 Dispatching getAllProductsShop()");
      dispatch(getAllProductsShop());
    } else {
      console.log("✅ Products already موجود, skipping API call");
    }
  }, [dispatch]);

  // 🔍 Log before slicing
  console.log("📊 Products before slicing:", products);

  const bestDeals = products?.slice(0, 2) || [];

  // 🔍 Log sliced data
  console.log("🔥 Best Deals (after slice):", bestDeals);

  return (
    <div className={styles.section}>
      <div className={styles.heading}>
        <h1>Best Deals</h1>
      </div>

      {/* 🔄 Loading State */}
      {isLoading && (
        <>
          {console.log("⏳ Rendering Skeleton Loader")}
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      )}

      {/* ❌ Error State */}
      {!isLoading && error && (
        <>
          {console.log("❌ Rendering Error State")}
          <div className="text-red-500 text-center py-10">
            Failed to load products. Please try again.
          </div>
        </>
      )}

      {/* 📭 Empty State */}
      {!isLoading && !error && bestDeals.length === 0 && (
        <>
          {console.log("📭 No products available")}
          <div className="text-gray-500 text-center py-10">
            No deals available right now.
          </div>
        </>
      )}

      {/* ✅ Data State */}
      {!isLoading && !error && bestDeals.length > 0 && (
        <>
          {console.log("✅ Rendering Best Deals:", bestDeals)}
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {bestDeals.map((item, index) => {
              console.log(`🧩 Rendering ProductCard #${index}`, item);
              return <ProductCard data={item} key={item._id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};