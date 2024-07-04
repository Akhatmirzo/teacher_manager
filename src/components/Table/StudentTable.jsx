import { Table } from "flowbite-react";
import { BiShow } from "react-icons/bi";
import { db } from "../../Firebase/Firebase";
import { GetStudents } from "../../redux/slices/StudentSlice";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { GetLessons } from "../../redux/slices/LessonSlice";
import { useEffect } from "react";
import { uid } from "uid";

export function StudentTable({ tableBody }) {
  const dispatch = useDispatch();
  const lessons = useSelector(state => state.lessons.lessons)
  
  const showPass = (index) => {
    const password = window.document.getElementById("password"+index);
    password.type = password.type === "password" ? "text" : "password";
  };

  const removeStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteDoc(doc(db, "students", id));
        await deleteDoc(doc(db, "roles", id));

        const studentLessons = lessons.filter(lesson => lesson.userId === id);

        for (const lesson of studentLessons) {
          await deleteDoc(doc(db, "lessons", lesson.id));
        }

        dispatch(GetStudents());
        dispatch(GetLessons());
        toast.success("Delete student successfully");
      } catch (error) {
        console.log(error);
        toast.error("Delete failed");
      }
    }
  };

  useEffect(() => {
    dispatch(GetLessons())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-[calc(100vh_-_64px)] overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell key={uid()} className="w-[24px] p-2">T/r</Table.HeadCell>
          <Table.HeadCell key={uid()}>Fullname</Table.HeadCell>
          <Table.HeadCell key={uid()}>email</Table.HeadCell>
          <Table.HeadCell key={uid()}>password</Table.HeadCell>
          <Table.HeadCell key={uid()}>
            <span className="sr-only">Remove</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tableBody &&
            tableBody.map((item, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-2">{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-2/6">
                  {item.fullname}
                </Table.Cell>
                <Table.Cell className=" w-2/6">{item.email}</Table.Cell>
                <Table.Cell className=" w-2/12 p-0">
                  <div className="flex items-center">
                    <input
                      id={"password"+index}
                      type="password"
                      disabled
                      className="w-full border-none"
                      value={item.password}
                    />
                    <BiShow
                      size={30}
                      onClick={() => showPass(index)}
                      className=" cursor-pointer mr-3"
                    />
                  </div>
                </Table.Cell>
                <Table.Cell className="flex items-center gap-2">
                  <button className=" font-medium text-cyan-600 hover:underline dark:text-cyan-500 p-2">
                    Edit
                  </button>
                  <button
                    onClick={() => removeStudent(item.uid)}
                    className=" font-medium text-cyan-600 hover:underline dark:text-cyan-500 p-2"
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}
