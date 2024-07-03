/* eslint-disable array-callback-return */
import React, { useEffect, useMemo, useState } from "react";
import { Button, Table, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetClass } from "../redux/slices/ClassSlice";
import { GetStudents } from "../redux/slices/StudentSlice";
import UpdateLesson from "../hooks/UpdateLesson";
import { toast } from "react-toastify";
import { GetLessons } from "../redux/slices/LessonSlice";
import UpdateModul from "../hooks/UpdateModul";
import { GetModules } from "../redux/slices/ModulSlice";
import ChildLoading from "../components/Loadings/ChildLoading";
import PrimaryLoading from "../components/Loadings/PrimaryLoading";

export default function ClassTable() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const modules = useSelector((state) => state.modules);
  const lessons = useSelector((state) => state.lessons.lessons);
  const [modul, setModul] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const [activeModul, setActiveModul] = useState();
  const [primaryLoad, setPrimaryLoad] = useState(false);

  const handleKeyPress = (e) => {
    if (!/[0-3]/.test(e.key)) {
      e.preventDefault();
    }
  };

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

  useMemo(() => {
    dispatch(GetStudents());
    dispatch(GetClass());
    dispatch(GetLessons());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChangeFn = async (e, lessons, lessonId) => {
    const { value } = e.target;

    if (value) {
      setPrimaryLoad(true);
      const updatedLessons = lessons.lessons.map((lesson) =>
        lesson.uid === lessonId ? { ...lesson, score: value } : lesson
      );

      const newLessons = {
        ...lessons,
        lessons: updatedLessons,
      };

      const FnValue = await UpdateLesson(newLessons);

      if (FnValue === 0) {
        dispatch(GetLessons());
        setPrimaryLoad(false);
        toast.success("Score updated successfully");
      } else {
        toast.error("Error updating score");
      }
    } else {
      toast.warn("Unable to update");
    }
  };

  const RenderLessons = (uid) => {
    const newClassStudent = classStudents.map((student, i) => {
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

  const handleDouble = async (uid) => {
    let newModel = {};
    const moduls = modul.moduls;

    const newMod = [];
    moduls.forEach((el) => {
      if (el.uid === uid) {
        newMod.push({
          ...el,
          active: true,
        });
      } else {
        newMod.push({
          ...el,
          active: false,
        });
      }
    });

    newModel = {
      ...modul,
      moduls: newMod,
    };
    await UpdateModul(newModel);

    dispatch(GetModules());
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto">
      <div className="w-full flex items-center justify-center gap-2 p-2 flex-wrap">
        {modul?.moduls?.map((_, index) => (
          <Button
            key={_.uid}
            onClick={() => (_.active ? ChangeActiveModul(_.uid) : () => {})}
            onDoubleClick={() => (_.active ? () => "" : handleDouble(_.uid))}
            className={`${_.active ? "" : "opacity-75"}`}
          >
            {_.title}
          </Button>
        ))}
      </div>
      <form className="w-full h-screen">
        <Table striped>
          <Table.Head>
            <Table.HeadCell className="w-[20px]">t/r</Table.HeadCell>
            <Table.HeadCell>Fullname</Table.HeadCell>
            {Array(11)
              .fill()
              .map((_, index) => (
                <Table.HeadCell className="text-center" key={index}>
                  {index + 1}
                </Table.HeadCell>
              ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {classStudents?.map((student, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className=" whitespace-nowrap">
                  {student.fullname}
                </Table.Cell>
                {student.lessons &&
                  student.lessons.lessons.map((lesson) => (
                    <Table.Cell className="text-center myxl:p-2">
                      <TextInput
                        type="text"
                        maxLength={1}
                        defaultValue={lesson.score}
                        onChange={(e) =>
                          onChangeFn(e, student.lessons, lesson.uid)
                        }
                        onKeyPress={handleKeyPress}
                        className="border-none w-full"
                      />
                    </Table.Cell>
                  ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </form>

      <ChildLoading loading={modules.isLoading} />
      <PrimaryLoading loading={primaryLoad} />
    </div>
  );
}
