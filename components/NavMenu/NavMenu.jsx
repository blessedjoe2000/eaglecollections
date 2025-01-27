"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuButton } from "../Navbar/styles";

export const NavMenu = ({ closeMenuCallback }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  useEffect(() => {
    if (!submenuOpen) {
      setSubmenuOpen(true);
    }
  }, [closeMenuCallback]);

  const menuLink = [
    {
      name: "Shop",
      submenu: true,
      sublinks: [
        {
          name: "Georges",
          link: "/george",
        },
        {
          name: "Laces",
          link: "/lace",
        },
        {
          name: "Wax / Ankara",
          link: "/ankara",
        },
        {
          name: "Accessories",
          link: "/accessories",
        },

        {
          name: "Bags",
          link: "/bag",
        },

        {
          name: "Gown Dress",
          link: "/dress",
        },
        {
          name: "Slippers",
          link: "/slippers",
        },
        {
          name: "Shoes",
          link: "/shoe",
        },
        {
          name: "Jewelries",
          link: "/jewelry",
        },
        {
          name: "Mens Shop",
          link: "/men",
        },
        {
          name: "Clutches",
          link: "/clutch",
        },

        {
          name: "Headtie Gele",
          link: "/headtie",
        },
      ],
    },
  ];
  return (
    <div className="">
      {menuLink.map((menu, index) => (
        <div key={index}>
          {menu.sublinks && (
            <div
              className={`transition-all duration-300 ease-in-out ${
                submenuOpen
                  ? "grid grid-cols-3 gap-5 p-5 items-center justify-center text-center bg-dark-blue opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-20px] pointer-events-none"
              }`}
              onMouseLeave={closeMenuCallback}
            >
              {menu.sublinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.link}
                    className="menuitems"
                    onClick={() => {
                      toggleSubmenu();
                    }}
                  >
                    <MenuButton>{link.name}</MenuButton>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
