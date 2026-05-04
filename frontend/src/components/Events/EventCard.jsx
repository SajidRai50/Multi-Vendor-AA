import React from "react";
import styles from "../../styles/styles";
import {CountDown} from "./CountDown.jsx"

export const EventCard = () => {
  return (
    <div className={`w-full block bg-white rounded-lg lg:flex p-2`}>
      <div className="w-full lg:-w[50%] m-auto">
        <img
          src="https://images.unsplash.com/photo-1773332611522-06b86b48cbf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
          alt=""
        />
      </div>

      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>product name</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          quia sint quaerat, laudantium sapiente quod amet autem explicabo?
          Consectetur aut cumque doloremque reiciendis, dolorem expedita hic
          harum maiores repudiandae adipisci? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Voluptatibus quia sint quaerat,
          laudantium sapiente quod amet autem explicabo? Consectetur aut cumque
          doloremque reiciendis, dolorem expedita hic harum maiores repudiandae
          adipisci?
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              10099
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              999
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>

        <CountDown/>
      </div>
    </div>
  );
};
