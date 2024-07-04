/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { Button, Table, TextInput } from "flowbite-react";
import { BiShow } from "react-icons/bi";
import Avatar from "../../components/Avatars/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { GetClass } from "../../redux/slices/ClassSlice";
import { auth } from "../../Firebase/Firebase";
import { uid } from "uid";
import CircleProgressBar from "../../components/Progresses/CircleProgressBar";
import PrimaryLoading from "../../components/Loadings/PrimaryLoading";
import LevelBadge from "../../components/Badges/LevelBadge";

export default function StudentDash() {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.students.student);
  const loading = useSelector((state) => state.students.isLoading);
  const classData = useSelector((state) => state.classes.class);
  const modules = useSelector((state) => state.modules);
  const lessons = useSelector((state) => state.lessons);
  const [lesson, setLesson] = useState({});
  const [modul, setModul] = useState([]);
  const [activeModul, setActiveModul] = useState();
  const [progress, setProgress] = useState(0);
  const showPass = () => {
    const password = window.document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
  };

  const ChangeActiveModul = (uid) => {
    setActiveModul(uid);
  };

  const handleLessonChange = (uid) => {
    const userId = auth.currentUser.uid;
    const findLesson = lessons.lessons.find(
      (lesson) => lesson.modulId === uid && lesson.userId === userId
    );
    setLesson(findLesson);
  };

  useEffect(() => {
    const id = student.classId;
    dispatch(GetClass(id));

    setModul(
      // eslint-disable-next-line array-callback-return
      modules.modules.find((module) => {
        if (module.classId === id) {
          const activeModul = module.moduls.find(
            (modul) => modul.active === true
          );
          setActiveModul(activeModul.uid);
          handleLessonChange(activeModul.uid);
          return module;
        }
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student, modules]);

  useMemo(() => {
    handleLessonChange(activeModul);
  }, [activeModul]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (student.score > 0) {
        setProgress((prevProgress) =>
          prevProgress === student.score ? prevProgress : prevProgress + 1
        );
      } else {
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [student]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center justify-center gap-2 p-2 flex-wrap">
        {modul?.moduls?.map((_, index) => (
          <Button
            key={_.uid}
            onClick={() => ChangeActiveModul(_.uid)}
            // onDoubleClick={() => (_.active ? () => "" : handleDouble(_.uid))}
            className={`${_.active ? "" : "opacity-75"} ${
              _.uid === activeModul ? "bg-green-500" : ""
            }`}
          >
            {_.title}
          </Button>
        ))}
      </div>
      <div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Fullname</Table.HeadCell>
            {Array(11)
              .fill()
              .map((_, index) => (
                <Table.HeadCell className="text-center text-[10px]" key={index}>
                  {index + 1} lesson
                </Table.HeadCell>
              ))}
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell key={uid()} className=" whitespace-nowrap">
                {student.fullname}
              </Table.Cell>
              {lesson?.lessons &&
                lesson.lessons.map((lesson) => (
                  <Table.Cell key={uid()} className="text-center myxl:p-2">
                    <TextInput
                      key={uid()}
                      type="text"
                      maxLength={1}
                      defaultValue={lesson.score}
                      disabled
                      className="border-none w-full"
                    />
                  </Table.Cell>
                ))}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <div className="w-full h-[525px] shadow-lg overflow-x-hidden overflow-y-auto">
        <div className="w-max h-full flex flex-col items-center shadow-lg py-3 px-5 relative">
          <div className="flex items-center flex-col gap-3">
            <Avatar
              src={student.photo}
              size={"150px"}
              title={student.fullname}
            />

            <div>
              <h2>Fullname: {student.fullname}</h2>
              <h2>Email: {student.email}</h2>
              <h2 className="flex items-center">
                Password:
                <input
                  id="password"
                  type="password"
                  className="w-full border-none"
                  value={student.password}
                />
                <BiShow
                  size={30}
                  onClick={showPass}
                  className=" cursor-pointer mr-3"
                />
              </h2>
              <h2>
                Role: <span className="capitalize">{student.role}</span>
              </h2>
              <h2>Class: {classData?.class}</h2>
              <h2>Teacher: {classData?.teacher}</h2>
              <h2>Subject: {classData?.subject}</h2>

              <LevelBadge score={student.score} />
            </div>

            <div>
              <CircleProgressBar
                progress={progress}
                size={150}
                strokeWidth={15}
              />
            </div>
          </div>
        </div>
      </div>

      <PrimaryLoading loading={loading} />
    </div>
  );
}
