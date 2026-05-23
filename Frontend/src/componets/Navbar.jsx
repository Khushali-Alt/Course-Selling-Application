import React from "react";

const Navbar = () => {
  return (
    <section className="flex gap-120 py-6 px-8">
      <div className="logo">
        <img className="w-12 h-12" src="../src/assets/logo.svg" alt="" />
        <p className="text-secondary text-md ">RoseAcademy</p>
      </div>
      <div className="w-90 ">
        <ul className="list-none flex bg-secondary text-accent font-medium text-md px-4 justify-between py-2 border-border rounded-md ">
          <li>My course</li>
          <li>My Account</li>
          <li>Get Started</li>
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
