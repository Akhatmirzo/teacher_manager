import React, { useEffect } from "react";
import ClassesNav from "../components/Navbar/ClassesNav";
import { ClassesTable } from "../components/Table/ClassesTable";
import { AddClassModal } from "../components/Modal/AddClassModal";
import { useDispatch, useSelector } from "react-redux";
import ChildLoading from "../components/Loadings/ChildLoading";
import { GetClasses } from "../redux/slices/ClassSlice";

export default function Classes() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(GetClasses())
  }, []);

  return (
    <div className="w-full">
      <ClassesNav />
      <div className="w-full h-[calc(100vh_-_64px)] relative">
        <ClassesTable tableBody={classes.classes} />
        <ChildLoading loading={classes.isLoading} />
      </div>

      <AddClassModal isModal={classes.modal} />
    </div>
  );
}