import { Button, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { GetStudents, toggleModal } from "../../redux/slices/StudentSlice";
import { GetClasses } from "../../redux/slices/ClassSlice";
import { generatePassword, generateUniqueEmail } from "../../utils/Generate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { secondaryAuth } from "../../Firebase/SecondaryFirebase";
import { uid } from "uid";
import { GetModules } from "../../redux/slices/ModulSlice";
import CreateImage from "../../utils/CreateImage";

export function AddStudentModal({ isModal }) {
  const [inputs, setInputs] = useState({
    fullname: "",
    classId: null,
    email: null,
    password: null,
    modulId: null,
  });
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes);
  const modules = useSelector((state) => state.modules.modules);
  const [modul, setModul] = useState([]);

  useEffect(() => {
    dispatch(GetClasses());
    dispatch(GetModules());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.classId) {
      toast.error("Please select a class");
      return;
    }
    if (!inputs.modulId) {
      toast.error("Please select a module");
      return;
    }

    const teacherId = auth.currentUser.uid;

    const email = generateUniqueEmail(inputs.fullname);

    const password = generatePassword();

    const lessons = [
      {
        uid: uid(),
        lesson: "1",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "2",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "3",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "4",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "5",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "6",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "7",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "8",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "9",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "10",
        score: 0,
      },
      {
        uid: uid(),
        lesson: "11",
        score: 0,
      },
    ];

    const newStudent = {
      fullname: inputs.fullname,
      teacherId: teacherId,
      classId: inputs.classId,
      email,
      password,
      role: "student",
      score: 0
    };

    const name = newStudent.fullname.split(" ")[0].toLowerCase();
    const getImage = await CreateImage(name)

    if (getImage !== 0) {
      newStudent.photo = getImage;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );

      await setDoc(doc(db, `students`, res.user.uid), {
        uid: res.user.uid,
        ...newStudent,
      });

      let modulInc = 999999999;
      for (let i = 0; i < modul.moduls.length; i++) {
        if (modul.moduls[i].uid === inputs.modulId)
          modulInc = modul.moduls[i].number;

        const newLesson = {
          classId: newStudent.classId,
          userId: res.user.uid,
          uid: uid(),
          modulId: modul.moduls[i].uid,
          lessons,
        }

        if (modul.moduls[i].number >= modulInc) {
          await setDoc(doc(db, `lessons`, newLesson.uid), newLesson);
        }
      }

      await setDoc(doc(db, `roles`, res.user.uid), {
        userId: res.user.uid,
        role: newStudent.role,
      });
      toast.success("Registration successful!");

      setInputs({
        fullname: "",
        classId: null,
        email: null,
        password: null,
      });

      dispatch(toggleModal());
      dispatch(GetStudents());
    } catch (error) {
      console.log(error);
    }
  };

  const selectClass = (e) => {
    setInputs({ ...inputs, classId: e.target.value });

    const modul = modules?.find((module) => module.classId === e.target.value);
    setModul(modul || []);
  };

  return (
    <>
      <Modal show={isModal} onClose={() => dispatch(toggleModal())}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Fullname" />
              </div>
              <TextInput
                id="email1"
                type="text"
                placeholder="fullname"
                name="fullname"
                required
                onChange={(e) =>
                  setInputs({ ...inputs, fullname: e.target.value })
                }
              />
            </div>

            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select student Class" />
              </div>
              <Select
                id="countries"
                required
                name="class"
                onChange={selectClass}
              >
                <option>none</option>
                {classes.classes.map((item) => (
                  <option key={item.uid} value={item.uid}>
                    {item.class}
                  </option>
                ))}
              </Select>
            </div>
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="modul" value="Select student Modul" />
              </div>
              <Select
                id="modul"
                required
                name="modul"
                onChange={(e) =>
                  setInputs({ ...inputs, modulId: e.target.value })
                }
              >
                <option>none</option>
                {modul.moduls?.map((item) => (
                  <option key={item.uid} value={item.uid}>
                    {item.title}
                  </option>
                ))}
              </Select>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => dispatch(toggleModal())}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
