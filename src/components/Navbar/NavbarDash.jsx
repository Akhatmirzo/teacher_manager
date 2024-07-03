/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { Sidebar } from "flowbite-react";
import Avatar from "../Avatars/Avatar";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";
import { uid } from "uid";

export default function NavbarDash() {
  const location = useLocation();
  const [open, setOpen] = useState(false)
  const me = useSelector((state) => state.teachers.me);

  const sidebarItems = [
    {
      icon: HiChartPie,
      label: "Dashboard",
      href: "",
      pending: false,
      active: true,
    },
    {
      icon: HiViewBoards,
      label: "Students",
      href: "students",
      pending: false,
      active: false,
    },
    {
      icon: HiTable,
      label: "Classes",
      href: "classes",
      pending: false,
      active: false,
    },
    {
      icon: HiUser,
      label: "Profile",
      href: "profile",
      pending: true,
      active: false,
    },
    {
      icon: HiInbox,
      label: "Messages",
      href: "messages",
      pending: true,
      active: false,
    },
    {
      icon: HiArrowSmRight,
      label: "Logout",
      pending: false,
      clickFn: () => auth.signOut(),
    },
  ];

  const path = useMemo(() => {
    const path = "/teacher";
    sidebarItems.map((sidebarItem) => {
      if (location.pathname === path + "/" + sidebarItem.href) {
        sidebarItem.active = true;
        return sidebarItem;
      } else if (location.pathname === path && sidebarItem.href === "") {
        sidebarItem.active = true;
        return sidebarItem;
      } else {
        sidebarItem.active = false;
        return sidebarItem;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div>
      <div className="w-[60px] h-screen hidden mylg:block">
        <Button key={uid()} onClick={()=> setOpen(!open)} className=" m-1">
          <HiOutlineArrowRight  />
        </Button>
      </div>
      <Sidebar
        key={uid()}
        aria-label="Default sidebar example"
        className={`min-w-[250px] h-screen transition-all duration-300 mylg:absolute top-0 left-[${open ? '0' : '-100%'}] mylg:z-[1000]`}
      >
        <Button key={uid()} onClick={()=> setOpen(!open)} className="absolute top-0 left-0 m-1 z-[1100] hidden mylg:block">
          <HiOutlineArrowRight  />
        </Button>
        <Sidebar.Items>
          <div className="flex flex-col items-center">
            {me && (
              <div key={uid()} className="flex flex-col items-center">
                <Avatar key={uid()} src={me.photo} size={"100px"} title={me.fullname} />
                <span className=" capitalize">{me?.role}</span>
                <span>{me.fullname}</span>
              </div>
            )}
          </div>
          <Sidebar.ItemGroup className="flex flex-col ">
            {sidebarItems.map((item, index) => (
              <Link key={uid()} to={item.pending ? "" : item?.href}>
                <Sidebar.Item
                  key={uid()}
                  icon={item.icon}
                  label={item.pending ? "Pending" : ""}
                  labelColor="dark"
                  active={item.active}
                  onClick={item.clickFn ? item.clickFn : () => {}}
                >
                  {item.label}
                </Sidebar.Item>
              </Link>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
