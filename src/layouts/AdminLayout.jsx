import React, { useEffect } from "react";
import NavbarDash from "../components/Navbar/NavbarDash";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetMe, GetTeachers } from "../redux/slices/TeacherSlice";

export default function AdminLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTeachers());
    dispatch(GetMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "F5" ||
        (e.ctrlKey && e.key === "r") ||
        (e.metaKey && e.key === "r") ||
        (e.key === "R" && e.metaKey && e.shiftKey)
      ) {
        e.preventDefault();
        // toast.warn("Page refresh is disabled.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  

  return (
    <div className="flex">
      <NavbarDash />
      <Outlet />
    </div>
  );
}
