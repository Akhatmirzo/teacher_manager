"use client";
import { Navbar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/StudentSlice";

export default function StudentsNav() {
  const dispatch = useDispatch();
  return (
    <Navbar fluid rounded className="bg-[#f9fafb] w-full">
      <Navbar.Brand>
        <Navbar onClick={() => dispatch(toggleModal())} className=" cursor-pointer">Add Student</Navbar>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link className=" cursor-pointer">Notificaation</Navbar.Link>
        <Navbar.Link className=" cursor-pointer">Filter</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
