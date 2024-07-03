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
  }, []);

  return (
    <div className="flex">
      <NavbarDash />
      <Outlet />
    </div>
  );
}
