import { Button, Navbar } from "flowbite-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Avatar from "../../Avatars/Avatar";
import { auth } from "../../../Firebase/Firebase";

export function StudentNavbar() {
  const student = useSelector((state) => state.students.student);
  const location = useLocation();
  const navItems = [
    { label: "Home", to: "", active: true },
    { label: "Class", to: "class", active: false },
  ];

  useMemo(() => {
    document.title = `${location.pathname.replace("/", "")}`;

    const path = location.pathname;

    navItems.map((navItem, index) => {
      if (path === "/student/" + navItem.to) {
        navItem.active = true;
      } else if (path === "/student" + navItem.to) {
        navItem.active = true;
      } else {
        navItem.active = false;
      }
      return navItem;
    });
    // eslint-disable-next-line
  }, [location]);
  return (
    <Navbar fluid rounded className=" shadow-lg">
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Student
        </span>
      </Navbar.Brand>
      <div className="flex items-center gap-3 md:order-2">
        <div>
          <Avatar src={student.photo} size={'40px'} title={student.fullname} />
        </div>
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navItems.map((item, index) => {
          return (
            <Navbar.Link key={index} active={item.active}>
              <Link to={item.to}>{item.label}</Link>
            </Navbar.Link>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
}
