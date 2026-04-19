// import React from 'react'
// import { Link } from 'react-router-dom'
// import { navItems } from '../../static/data'
// import styles from '../../styles/styles'

// const Navbar = ({active}) => {
//   return (
//     <div className={`block 800px:${styles.noramlFlex}`}>
//          {
//             navItems && navItems.map((i,index) => (
//                 <div className="flex">
//                     <Link to={i.url}
//                     className={`${active === index + 1 ? "text-[#17dd1f]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
//                     >
//                     {i.title}
//                     </Link>
//                 </div>
//             ))
//          }
//     </div>
//   )
// }

// export default Navbar

import React from "react";
import { navItems } from "../../static/data.jsx";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className="flex items-center gap-8">
      {navItems.map((item, index) => (
        <Link to={item.url} key={item.title || index}>
          <span
            className={`text-[15px] font-medium ${
              active === index + 1 ? "text-[#ffd24d]" : "text-white"
            }`}
          >
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;