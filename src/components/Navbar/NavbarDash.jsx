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
import { useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import { IoReloadCircle } from "react-icons/io5";
import { GetStudents } from "../../redux/slices/StudentSlice";
import { GetTeachers } from "../../redux/slices/TeacherSlice";
import { GetClasses } from "../../redux/slices/ClassSlice";
import { GetModules } from "../../redux/slices/ModulSlice";

export default function NavbarDash() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const me = useSelector((state) => state.teachers.me);

  const [sidebarItems, setSidebarItems] = useState([
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
  ]);

  const dispatch = useDispatch();
  const path = useMemo(() => {
    const path = "/teacher";
    const items = sidebarItems.map((sidebarItem) => {
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

    setSidebarItems(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const reloadComponent = () => {
    dispatch(GetStudents());
    dispatch(GetTeachers());
    dispatch(GetClasses());
    dispatch(GetModules());
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "F5" ||
        (e.ctrlKey && e.key === "r") ||
        (e.metaKey && e.key === "r")
      ) {
        e.preventDefault();
        reloadComponent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="w-[60px] h-screen hidden mylg:block">
        <Button key={uid()} onClick={() => setOpen(!open)} className=" m-1">
          <HiOutlineArrowRight />
        </Button>
      </div>
      <Sidebar
        key={uid()}
        aria-label="Default sidebar example"
        className={`min-w-[250px] h-screen transition-all duration-300 relative mylg:absolute top-0 left-[${
          open ? "0" : "-100%"
        }] mylg:z-[1000]`}
      >
        <Button
          key={uid()}
          onClick={() => setOpen(!open)}
          className="absolute top-0 left-0 m-1 z-[1100] hidden mylg:block"
        >
          <HiOutlineArrowRight />
        </Button>

        <div className=" absolute top-3 right-3">
          <IoReloadCircle
            size={30}
            className="cursor-pointer transition-all active:duration-300 active:rotate-[360deg]"
            onClick={reloadComponent}
          />
        </div>
        <Sidebar.Items>
          <div className="flex flex-col items-center">
            {me && (
              <div key={uid()} className="flex flex-col items-center">
                <Avatar
                  key={uid()}
                  src={me.photo}
                  size={"100px"}
                  title={me.fullname}
                />
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
