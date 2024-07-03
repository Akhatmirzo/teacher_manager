"use client";
import { Navbar } from "flowbite-react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/ClassSlice";

export default function ClassesNav() {
  const dispatch = useDispatch()

  return (
    <Navbar fluid rounded className="bg-[#f9fafb] w-full">
      <Navbar.Brand>
        <Navbar onClick={() => dispatch(toggleModal())} className=" cursor-pointer">Add Classes</Navbar>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link className=" cursor-pointer">Filter</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
