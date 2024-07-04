import React, { useEffect } from 'react'
import { StudentNavbar } from '../components/Navbar/StudentNavbar/StudentNavbar'
import { Outlet } from 'react-router-dom'

export default function StudentLayout() {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === "F5") || (e.ctrlKey && e.key === "r") || (e.metaKey && e.key === "r")) {
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
    <div>
      <StudentNavbar />
      <Outlet />
    </div>
  )
}
