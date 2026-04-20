import React from "react";
import styles from "../../styles/styles.js";
import { brandingData, categoriesData } from "../../static/data.jsx";
import { useNavigate } from "react-router-dom";
export const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData.map((item) => (
            <div className="flex items-start" key={item.id}>
              {item.icon}
              <div className="px-3">
                <h3 className="font-bold text-sm md:text-base">{item.title}</h3>
                <p className="text-xs md:text-sm">{item.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* .........category........... */}

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData.map((i) => {
            const handleSubmit = (item) => {
              navigate(`/products?category=${item.title}`);
            };

            return (
              <div
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 p-4 cursor-pointer"
                key={i.id}
                onClick={() => handleSubmit(i)}
              >
                <div className="w-full h-[160px] overflow-hidden rounded-md">
                  <img
                    src={i.image_Url}
                    alt={i.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback.png";
                    }}
                  />
                </div>

                <h5 className="text-[18px] leading-[1.3] mt-3 font-semibold text-gray-700 group-hover:text-blue-600 transition duration-300">
                  {i.title}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
