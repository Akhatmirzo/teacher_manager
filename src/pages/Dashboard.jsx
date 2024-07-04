import React, { useMemo, useState } from "react";
import { Card, Label, Select, TextInput } from "flowbite-react";
import ChildLoading from "../components/Loadings/ChildLoading";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { GetStudents } from "../redux/slices/StudentSlice";
import { toast } from "react-toastify";
import useDebounce from "../hooks/useDebounce";
import LevelBadge from "../components/Badges/LevelBadge";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [classSelect, setClassSelect] = useState([]);
  const classes = useSelector((state) => state.classes);
  const students = useSelector((state) => state.students);
  const [compLoad, setCompLoad] = useState(false);
  const [upgradeScore, setUpgradeScore] = useState({
    score: "",
    student: {},
  });
  const debouncedValue = useDebounce(upgradeScore, 100);

  async function getStudent(id) {
    const classStuds = students?.students
      ?.filter((student) => student.classId === id)
      .sort((a, b) => a.fullname.localeCompare(b.fullname));

    return classStuds;
  }

  const setSelectClass = async (e) => {
    const id = e.target.value;

    if (id) {
      const classStudents = await getStudent(id);

      setClassSelect(classStudents);
    }
  };

  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const ChangeScore = async (student, score) => {
    if (student && score && score >= 0) {
      let newStudent = {
        ...student,
        score: Number(score),
      };

      try {
        await updateDoc(doc(db, "students", student.uid), newStudent);

        dispatch(GetStudents());
        toast.success("Add new Score to student");
      } catch (error) {
        console.log(error);
        toast.error("Failed to add new Score to student");
      }
    }
  };

  const incrementScore = async (student) => {
    let newStudent = {
      ...student,
      score: Number(student.score + 1),
    };

    try {
      await updateDoc(doc(db, "students", student.uid), newStudent);

      dispatch(GetStudents());

      setClassSelect(
        classSelect?.map((selectStudent) => {
          if (selectStudent.uid === student.uid) {
            return newStudent;
          }
          return selectStudent;
        })
      );

      toast.success("Add new Score to student");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add new Score to student");
    }
  };

  const decrementScore = async (student) => {
    if (student) {
      setCompLoad(true);
      let newStudent = {
        ...student,
        score: Number(student.score - 1),
      };
      try {
        await updateDoc(doc(db, "students", student.uid), newStudent);
        dispatch(GetStudents());

        setClassSelect(
          classSelect?.map((selectStudent) => {
            if (selectStudent.uid === student.uid) {
              return newStudent;
            }
            return selectStudent;
          })
        );

        toast.success("Subtracted Score to student");
      } catch (error) {
        console.log(error);
        toast.error("Failed to subtract Score to student");
      } finally {
        setCompLoad(false);
      }
    }
  };

  useMemo(() => {
    const { score, student } = debouncedValue;
    ChangeScore(student, score);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="w-full h-screen p-2 overflow-y-auto overflow-x-hidden relative">
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Select your class" />
        </div>
        <Select id="countries" required onChange={setSelectClass}>
          <option>none</option>

          {classes.classes.map((item) => (
            <option key={uid()} value={item.uid}>
              {item.class}
            </option>
          ))}
        </Select>
      </div>

      <div className="w-full py-2 flex gap-3 flex-wrap justify-center">
        {classSelect.length > 0 ? (
          classSelect.map((classStud) => (
            <Card
              className="w-max p-2 relative"
              key={uid()}
              imgSrc={
                classStud.photo ||
                `https://avatar.iran.liara.run/public/boy?username=${
                  classStud.fullname.split(" ")[0] +
                    classStud.fullname.split(" ")[1] || ""
                }`
              }
              horizontal
            >
              <div className="flex items-center gap-2 flex-row-reverse">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {classStud.fullname}
                </h2>
                <h3 className="text-xl font-bold tracking-tight text-[#656363] dark:text-white capitalize">
                  {classStud.role}
                </h3>
              </div>
              <div>
                <h3 className="text-lg font-bold font-mono mb-2">
                  Score:
                  <span>{classStud.score}</span>
                </h3>

                <div className="w-[180px] h-[70px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-full p-2 flex items-center justify-between">
                  <button
                    type="button"
                    title="increment"
                    onClick={() => decrementScore(classStud)}
                    className="min-w-[50px] h-full shadow-lg rounded-full transition-all active:bg-[#edeaea92]"
                  >
                    <span className="text-5xl text-center leading-8">-</span>
                  </button>

                  <TextInput
                    type="text"
                    maxLength={3}
                    onKeyPress={handleKeyPress}
                    defaultValue={classStud.score}
                    disabled
                    onChange={(e) =>
                      setUpgradeScore({
                        ...upgradeScore,
                        score: e.target.value,
                        student: classStud,
                      })
                    }
                    className="border-none w-full"
                  />

                  <button
                    type="button"
                    onClick={() => incrementScore(classStud)}
                    className="min-w-[50px] h-full shadow-lg rounded-full transition-all active:bg-[#edeaea92]"
                  >
                    <span className="text-4xl text-center leading-6">+</span>
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-end">
                <LevelBadge score={classStud.score} />
              </div>
            </Card>
          ))
        ) : (
          <h2 className="text-xl text-center">Not Found</h2>
        )}
      </div>

      <ChildLoading loading={classes.isLoading || compLoad} />
    </div>
  );
}
