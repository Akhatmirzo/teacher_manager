import React from 'react'
import { StudentNavbar } from '../components/Navbar/StudentNavbar/StudentNavbar'
import { Outlet } from 'react-router-dom'

export default function StudentLayout() {
  return (
    <div>
      <StudentNavbar />
      <Outlet />
    </div>
  )
}
