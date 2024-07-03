import React, { useEffect, useMemo } from "react";
import StudentsNav from "../components/Navbar/StudentsNav";
import ChildLoading from "../components/Loadings/ChildLoading";
import { AddStudentModal } from "../components/Modal/AddStudentModal";
import { StudentTable } from "../components/Table/StudentTable";
import { useDispatch, useSelector } from "react-redux";
import { GetStudents } from "../redux/slices/StudentSlice";
import { auth } from "../Firebase/Firebase";

export default function Students() {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetStudents())
  }, [])

  const filterStudents = useMemo(() => {
    return students?.students?.filter((student) => student.teacherId === auth?.currentUser?.uid)
  }, [students])

  return (
    <div className="w-full">
      <StudentsNav />
      <div className="w-full h-[calc(100vh_-_64px)] relative">
        <StudentTable tableBody={filterStudents} />
        <ChildLoading loading={students.isLoading} />
      </div>
      <AddStudentModal isModal={students.modal} />
    </div>
  );
}
