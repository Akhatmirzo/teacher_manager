import { Button, Navbar } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../../Avatars/Avatar";
import { auth } from "../../../Firebase/Firebase";
import { IoReloadCircle } from "react-icons/io5";
import { GetStudent, GetStudents } from "../../../redux/slices/StudentSlice";
import { GetModules } from "../../../redux/slices/ModulSlice";
import { GetLessons } from "../../../redux/slices/LessonSlice";
import { uid } from "uid";

export function StudentNavbar() {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.students.student);
  const location = useLocation();
  const [navItems, setNavItems] = useState([
    { label: "Home", to: "", active: true },
    { label: "Class", to: "class", active: false },
  ]);

  const navActive = () => {
    document.title = `${location.pathname.replace("/", "")}`;

    const path = location.pathname.split("/")[2] || "";

    const nav = navItems.map((navItem, index) => {
      if (path === navItem.to) {
        navItem.active = true;
      } else {
        navItem.active = false;
      }
      return navItem;
    });

    setNavItems(nav);
  };

  useMemo(() => {
    navActive();
    // eslint-disable-next-line
  }, [location]);

  const reloadComponent = () => {
    const uid = auth.currentUser.uid;
    dispatch(GetStudent(uid));
    dispatch(GetStudents());
    dispatch(GetModules());
    dispatch(GetLessons());
    navActive();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "F5" ||
        (e.ctrlKey && e.key === "r") ||
        (e.metaKey && e.key === "r")
      ) {
        e.preventDefault();
        reloadComponent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navbar fluid rounded className=" shadow-lg">
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Student
        </span>
      </Navbar.Brand>
      <div className="flex items-center gap-3 md:order-2">
        <div>
          <Avatar src={student.photo} size={"40px"} title={student.fullname} />
        </div>
        <div className="">
          <IoReloadCircle
            size={30}
            className="cursor-pointer transition-all active:duration-300 active:rotate-[360deg]"
            onClick={reloadComponent}
          />
        </div>
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navItems.map((item, index) => {
          return (
            <Navbar.Link key={uid()} active={item.active}>
              <Link key={uid()} to={item.to}>
                {item.label}
              </Link>
            </Navbar.Link>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
}
