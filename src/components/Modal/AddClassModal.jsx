import { Button, Modal } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { GetClasses, toggleModal } from "../../redux/slices/ClassSlice";
import { useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { uid } from "uid";
import { GetModules } from "../../redux/slices/ModulSlice";

export function AddClassModal({ isModal }) {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teachers.me);
  const [inputs, setInputs] = useState({
    class: null,
    subject: null,
    modul: 11,
  });

  const handleInputsValue = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClass = {
      ...inputs,
      teacherId: auth.currentUser.uid,
      teacher: teacher.fullname,
      uid: uid(),
    };
    try {
      await setDoc(doc(db, `classes`, newClass.uid), newClass);

      const modulsCount = Array(inputs.modul)
        .fill()
        .map((modul, index) => {
          return {
            title: `Module ${index + 1}`,
            number: index + 1,
            uid: uid(),
            active: index === 0 ? true : false,
          };
        });

      const newModul = {
        classId: newClass.uid,
        moduls: modulsCount,
        uid: uid(),
      };

      await setDoc(doc(db, `modules`, newModul.uid), newModul);
      toast.success("Create successful!");

      setInputs({
        class: null,
        subject: null,
      });

      dispatch(GetClasses());
      dispatch(GetModules())
      dispatch(toggleModal());
    } catch (error) {
      console.log(error);
      toast.error("Create failed");
    }

    // Add new class to the database here
  };

  return (
    <>
      <Modal show={isModal} onClose={() => dispatch(toggleModal())}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Class name" />
              </div>
              <TextInput
                id="email1"
                type="text"
                placeholder="Class name"
                name="class"
                required
                onChange={handleInputsValue}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="subject" value="subject" />
              </div>
              <TextInput
                id="subject"
                type="text"
                placeholder="subject"
                name="subject"
                required
                onChange={handleInputsValue}
              />
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
