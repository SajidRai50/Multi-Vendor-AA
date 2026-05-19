// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { server } from "../server";

// export const SellerActivationPage = () => {
//   const { activation_token } = useParams();
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (activation_token) {
//       const sendRequest = async () => {
//         await axios
//           .post(`${server}/shop/activation`, {
//             activation_token,
//           })
//           .then((res) => {
//             console.log(res);
//           })
//           .catch((err) => {
//             setError(true);
//           });
//       };
//       sendRequest();
//     }
//   }, []);

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {error ? (
//         <p>Your token is expired!</p>
//       ) : (
//         <p>Your account has been created suceessfully!</p>
//       )}
//     </div>
//   );
// };

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

export const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  // 🔥 prevents duplicate API calls (VERY IMPORTANT)
  const calledRef = useRef(false);

  useEffect(() => {
    if (!activation_token) return;

    // prevent double execution (React StrictMode fix)
    if (calledRef.current) return;
    calledRef.current = true;

    const sendRequest = async () => {
      try {
        const res = await axios.post(`${server}/shop/activation`, {
          activation_token,
        });

        console.log("Activation success:", res.data);
        setError(false);
      } catch (err) {
        console.log("Activation error:", err.response?.data || err.message);
        setError(true);
      }
    };

    sendRequest();
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired or invalid!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};