
// import React from "react";
// import styles from "../../styles/styles";
// import { CountDown } from "./CountDown";
// import { backend_url } from "../../server";

// export const EventCard = ({ active, data }) => {
//   if (!data) return null;

//   return (
//     <div
//       className={`w-full bg-white rounded-lg p-5 shadow-sm ${
//         active ? "" : "mb-12"
//       }`}
//     >
//       <img
//         src={`${backend_url}/${data.images?.[0]}`}
//         alt={data.name}
//         className="w-full h-[350px] object-contain rounded-lg"
//       />

//       <div className="pt-5">
//         <h2 className={styles.productTitle}>
//           {data.name}
//         </h2>

//         <p className="py-3">
//           {data.description}
//         </p>

//         <div className="flex py-2 justify-between">
//           <div className="flex">
//             <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
//               ${data.originalPrice}
//             </h5>

//             <h5 className="font-bold text-[20px] text-[#333]">
//               ${data.discountPrice}
//             </h5>
//           </div>

//           <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
//             {data.sold_out || 0} sold
//           </span>
//         </div>

//         <CountDown data={data?.Finish_Date} />
//       </div>
//     </div>
//   );
// };

import React from "react";
import styles from "../../styles/styles";
import { CountDown } from "./CountDown";
import { backend_url } from "../../server";

export const EventCard = ({ active, data }) => {
  if (!data) return null;

  return (
    <div
      className={`w-full bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition ${
        active ? "" : "mb-12"
      }`}
    >
      <img
        src={
          data?.images?.length
            ? `${backend_url}/${data.images[0]}`
            : "/no-image.png"
        }
        alt={data.name}
        className="w-full h-[350px] object-contain rounded-lg bg-gray-50"
      />

      <div className="pt-5">
        <h2 className={styles.productTitle}>{data.name}</h2>

        <p className="py-3 text-gray-600">
          {data.description}
        </p>

        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
            <h5 className="text-[18px] text-red-500 line-through">
              ${data.originalPrice}
            </h5>

            <h5 className="font-bold text-[22px] text-[#333]">
              ${data.discountPrice}
            </h5>
          </div>

          <span className="text-green-600 font-medium">
            {data.sold_out || 0} sold
          </span>
        </div>

        <CountDown data={data?.end_Date} />
      </div>
    </div>
  );
};