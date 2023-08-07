import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import links from "../constants";

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <aside
      className={`fixed z-50 top-0 left-0 transition-all duration-300 h-screen w-[250px]
                bg-black md:translate-x-0 ${
                  openSideBar ? "translate-x-0" : "-translate-x-[250px]"
                }`}
    >
      <div
        onClick={() => setOpenSideBar((prev) => !prev)}
        className="fixed md:hidden bg-orange w-[50px] h-[50px] flex justify-center items-center rounded-full left-[260px] top-2 cursor-pointer"
      >
        {openSideBar ? (
          <GrClose className="text-2xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </div>
      <Link to="/dashboard" className="w-full group duration-200 block text-center pt-4">
        <h1 className="text-5xl group-active:scale-95 duration-200 text-white">opera</h1>
      </Link>
      <ul className="text-lg h-[90%] scrollbar-hide overflow-y-auto font-semibold capitalize text-white">
        {links.map((link) => (
          <li
            key={link.id}
            className="select-none hover:bg-primary/50 active:scale-95 mt-5 mb-2 mx-9 rounded-lg transition-all duration-300 flex justify-between items-center"
          >
            <NavLink
              className={({ isActive }) =>
                `w-full ${
                  isActive ? "bg-primary" : "bg-transparent"
                } rounded-lg p-2 flex justify-between items-center`
              }
              to={link.path}
            >
              <link.Icon className="text-2xl" />
              {link.name}
              <span></span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
