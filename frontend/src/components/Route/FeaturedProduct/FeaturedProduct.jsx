// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import styles from "../../../styles/styles";
// import { ProductCard } from "../ProductCard/ProductCard";
// import { productData } from "../../../static/data.jsx";


// const FeaturedProduct = () => {
// //   const {allProducts} = useSelector((state) => state.products);
// const { allProducts } = useSelector((state) => state.product);


//   return (
//     <div>
//       <div className={`${styles.section}`}>
//         <div className={`${styles.heading}`}>
//           <h1>Featured Products</h1>
//         </div>
//        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
//           {allProducts && productData.map((item) => (
//             <ProductCard data={item} key={item.id} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProduct;

import React from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import { ProductCard } from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.product);

  // FEATURED = discounted products
  const featuredProducts = allProducts.slice(0.10)
  


  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>Featured Products</div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featuredProducts?.length > 0 ? (
          featuredProducts.map((item) => (
            <ProductCard key={item._id} data={item} />
          ))
        ) : (
          <p>No Featured Products Found</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;