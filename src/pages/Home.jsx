import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import NotFound from "../components/NotFound/NotFound";
import AdminLayout from "../layouts/AdminLayout";
import Students from "./Students";
import Classes from "./Classes";
import ClassTable from "./ClassTable";
import { auth } from "../Firebase/Firebase";
import CheckRole from "../hooks/CheckRole";
import StudentLayout from "../layouts/StudentLayout";
import StudentDash from "./Student/StudentDash";
import { useDispatch } from "react-redux";
import { GetTeachers, toogleLoading } from "../redux/slices/TeacherSlice";
import Class from "./Student/Class";
import { GetStudent, GetStudents } from "../redux/slices/StudentSlice";
import { GetClasses } from "../redux/slices/ClassSlice";
import { GetModules } from "../redux/slices/ModulSlice";
import { GetLessons } from "../redux/slices/LessonSlice";

export default function Home() {
  const [layout, setLayout] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function checkLayout() {
    dispatch(toogleLoading(true));
    try {
      const uid = auth.currentUser.uid;
      const meRole = await CheckRole(uid);
      setLayout(meRole === "teacher" ? "teacher" : "student");

      if (meRole === "student") {
        dispatch(GetStudent(uid));
        dispatch(GetModules());
        dispatch(GetLessons());
      }

      if (meRole === "teacher") {
        dispatch(GetStudents());
        dispatch(GetTeachers());
        dispatch(GetClasses());
        dispatch(GetModules());
      }

      if (meRole) {
        navigate(`/${meRole}`);
      }else if (meRole === null) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toogleLoading(false));
    }
  }

  useEffect(() => {
    checkLayout();
    dispatch(GetStudents());
  }, [auth]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Iltimos Saytni yangilang</h1>} />
        <Route
          path={`/teacher`}
          element={layout === "teacher" && <AdminLayout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="classes" element={<Classes />} />
          <Route path="classes/:id" element={<ClassTable />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/student"
          element={layout === "student" && <StudentLayout />}
        >
          <Route index element={<StudentDash />} />
          <Route path="class" element={<Class />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className="w-screen h-screen bg-[#fffffff4] absolute top-0 left-0 items-center justify-center z-[999999] hidden mylg:flex">
        <h1 className="text-3xl text-center">Resposive holati tayyor emas!</h1>
      </div>
    </div>
  );
}
