import React from "react";
import Nav from "./Nav";
const Layout = ({ children }) => {
  return (
    <div className="mx-6 md:max-w-2xl md:max-auto font-poppins">
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
