import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ setLoading }) {
  const [inputs, setInput] = useState({
    email: null,
    password: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = inputs;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        //
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/invalid-credential") {
          toast.error("Error: Invalid Password");
        } else {
          toast.error("Error: " + errorCode);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
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
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to={""}
            >
              Forgot Password?
            </Link>
          </div>

          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-3"
            to={"/register"}
          >
            Don't have an account? Register
          </Link>
        </form>
      </div>
    </div>
  );
}
