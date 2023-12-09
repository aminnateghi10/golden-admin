import React, { Dispatch, SetStateAction, memo, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface PropsInterface {
  sidebarShow: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ sidebarShow }: PropsInterface) => {
  const sideNavigation = [
    // {href:'/' , icon:'si si-cup',label:'داشبورد'},
    { href: "/", icon: "si si-list", label: "لیست کاربران" },
    { href: "/create-costs", icon: "si si-plus", label: "افزودن کاربر" },
    {
      href: "/create-payments",
      icon: "si si-credit-card",
      label: "ثبت پرداختی",
    },
    { href: "/payments", icon: "si si-book-open", label: "لیست پرداختی" },
    { href: "/users", icon: "si si-users", label: "لیست مدیران" },
    {
      href: "/add-user",
      icon: "si si-user-follow",
      label: "افزودن مدیر",
    },
  ];

  return (
    <nav id="sidebar">
      {/* Sidebar Scroll Container */}
      <div className="slimScrollDiv">
        <div id="sidebar-scroll">
          {/* Sidebar Content */}
          <div className="sidebar-content">
            {/* Side Header */}
            <div className="content-header content-header-fullrow px-15">
              {/* Normal Mode */}
              <div className="content-header-section text-center align-parent sidebar-mini-hidden">
                {/* Close Sidebar, Visible only on mobile screens */}
                {/* Layout API, functionality initialized in Codebase() -> uiApiLayout() */}
                <button
                  onClick={() => sidebarShow(false)}
                  type="button"
                  className="btn btn-circle btn-dual-secondary d-lg-none align-v-l"
                  data-toggle="layout"
                  data-action="sidebar_close"
                >
                  <i className="fa fa-times text-danger" />
                </button>
                {/* END Close Sidebar */}
                {/* Logo */}
                <div className="content-header-item">
                  <Link className="link-effect font-w700" to="/">
                    <span className="text-dual-primary-dark">
                      مدیریت کاربران
                    </span>
                  </Link>
                </div>
                {/* END Logo */}
              </div>
              {/* END Normal Mode */}
            </div>
            {/* END Side Header */}
            {/* Side Navigation */}
            <div className="content-side content-side-full">
              <ul className="nav-main">
                {sideNavigation?.map((item) => (
                  <li key={item.href}>
                    <NavLink to={item.href}>
                      <i className={item.icon} />
                      <span className="sidebar-mini-hide">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* END Side Navigation */}
          </div>
          {/* Sidebar Content */}
        </div>
        <div className="slimScrollBar" />
        <div className="slimScrollRail" />
      </div>
      {/* END Sidebar Scroll Container */}
    </nav>
  );
};

export default memo(Sidebar);
