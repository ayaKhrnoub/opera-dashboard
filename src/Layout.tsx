import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import { Sidebar } from "./containers";
const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.toLowerCase() === "/" ||
      pathname.toLowerCase() === "/login" ? null : (
        <Sidebar />
      )}
      <main
        className={`${
          pathname.toLowerCase() === "/" || pathname.toLowerCase() === "/login"
            ? ""
            : "ml-0 md:ml-[250px]"
        } min-h-screen z-5 relative
`}
      >
        <Outlet />
      </main>
      <ToastContainer />
    </>
  );
};

export default Layout;
