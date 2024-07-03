import { Label, Select } from "flowbite-react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { toast } from "react-toastify";
import CreateImage from "../utils/CreateImage";

export default function Register() {
  const auth = getAuth();
  const [inputs, setInput] = React.useState({
    role: null,
    fullname: null,
    email: null,
    password: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );

      const newUser = {
        uid: res.user.uid,
        email: inputs.email,
        role: inputs.role,
        fullname: inputs.fullname,
      };

      const name = newUser.fullname.split(" ")[0].toLowerCase();
      const getImage = await CreateImage(name);

      if (getImage !== 0) {
        newUser.photo = getImage;
      }

      await setDoc(doc(db, `${inputs.role}s`, res.user.uid), {
        uid: res.user.uid,
        ...newUser,
      });

      await setDoc(doc(db, `roles`, res.user.uid), {
        userId: res.user.uid,
        role: newUser.role,
      });

      toast.success("Registration successful!");

      setInput({
        fullname: "",
        email: null,
        password: null,
        role: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select your Role" />
            </div>
            <Select
              id="countries"
              required
              onChange={(e) => setInput({ ...inputs, role: e.target.value })}
            >
              <option>none</option>
              <option value={"teacher"}>Teacher</option>
              <option disabled value={"student"}>
                Student
              </option>
            </Select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Fullname
            </label>
            <input
              className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="fullname"
              type="text"
              placeholder="Fullname"
              required
              value={inputs.fullname}
              onChange={(e) =>
                setInput({ ...inputs, fullname: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
              type="email"
              placeholder="Email"
              required
              value={inputs.email}
              onChange={(e) => setInput({ ...inputs, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
              required
              value={inputs.password}
              onChange={(e) =>
                setInput({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-3"
            to={"/"}
          >
            Already have an account? Login here.
          </Link>
        </form>
      </div>
    </div>
  );
}
