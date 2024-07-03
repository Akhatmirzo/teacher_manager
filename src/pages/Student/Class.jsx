/* eslint-disable array-callback-return */
import React, { useEffect, useMemo, useState } from "react";
import { Button, Table, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { GetClass } from "../../redux/slices/ClassSlice";
import { GetLessons } from "../../redux/slices/LessonSlice";
import { GetStudents } from "../../redux/slices/StudentSlice";
import { uid } from "uid";

export default function Class() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const classData = useSelector((state) => state.classes.class);
  const modules = useSelector((state) => state.modules);
  const lessons = useSelector((state) => state.lessons.lessons);
  const [modul, setModul] = useState([]);
  const [activeModul, setActiveModul] = useState();
  const [classStudents, setClassStudents] = useState([]);
  const id = students.student.classId;

  const ChangeActiveModul = (uid) => {
    setActiveModul(uid);
  };

  useMemo(() => {
    const classStuds = students.students
      ?.filter((student) => student.classId === id)
      .sort((a, b) => a.fullname.localeCompare(b.fullname));

    setClassStudents(classStuds);
    setModul(
      modules.modules.find((module) => {
        if (module.classId === id) {
          const activeModul = module.moduls.find(
            (modul) => modul.active === true
          );
          setActiveModul(activeModul.uid);
          return module;
        }
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students, id, modules]);

  const RenderLessons = (uid) => {
    const newClassStudent = students.students.map((student, i) => {
      const newStudent = {
        ...student,
      };

      for (let i = 0; i < lessons.length; i++) {
        if (student.uid === lessons[i].userId && lessons[i].modulId === uid) {
          newStudent.lessons = lessons[i];
        }
      }

      return newStudent;
    });

    setClassStudents(newClassStudent);
  };

  useEffect(() => {
    RenderLessons(activeModul);
  }, [students, lessons, activeModul, modul]);

  useMemo(() => {
    dispatch(GetStudents());
    dispatch(GetClass(id));
    dispatch(GetLessons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <div className="flex w-full items-center justify-between flex-wrap p-2 shadow-lg">
        <h2 className=" border-b-2">Class Name: {classData?.class}</h2>
        <h2 className=" border-b-2">Class ID: {classData?.uid}</h2>
        <h2 className=" border-b-2">Teacher: {classData?.teacher}</h2>
        <h2 className=" border-b-2">
          Number of students: {classStudents?.length}
        </h2>
      </div>
      <div className="w-full flex items-center justify-center gap-2 p-2 flex-wrap">
        {modul?.moduls?.map((_, index) => (
          <Button
            key={_.uid}
            onClick={() => ChangeActiveModul(_.uid)}
            className={`${_.active ? "" : "opacity-75"} ${
              _.uid === activeModul ? "bg-green-500" : ""
            }`}
          >
            {_.title}
          </Button>
        ))}
      </div>
      <Table striped>
        <Table.Head key={uid()}>
          <Table.HeadCell key={uid()} className="w-[20px]">t/r</Table.HeadCell>
          <Table.HeadCell key={uid()}>Fullname</Table.HeadCell>
          {Array(11)
            .fill()
            .map((_, index) => (
              <Table.HeadCell className="text-center" key={uid()}>
                {index + 1}
              </Table.HeadCell>
            ))}
        </Table.Head>
        <Table.Body key={uid()} className="divide-y">
          {classStudents?.map((student, index) => (
            <Table.Row key={uid()} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell key={uid()}>{index + 1}</Table.Cell>
              <Table.Cell key={uid()} className=" whitespace-nowrap">
                {student.fullname}
              </Table.Cell>
              {student?.lessons && student.lessons.lessons.map((lesson) => (
                <Table.Cell key={uid()} className="text-center myxl:p-2">
                  <TextInput
                    type="text"
                    maxLength={1}
                    defaultValue={lesson.score}
                    disabled
                    className="border-none w-full"
                  />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
