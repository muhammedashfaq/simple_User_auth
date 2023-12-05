import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RouteObjects } from "../../Routes/RouteObjests";
import axios from "axios";

const Loginpage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));

    setErrorMessage((pre) => ({
      ...pre,
      [name]: "",
    }));
  };

  const loginsubmit = async (e) => {
    try {
      e.preventDefault();

      const errors = {};
      if (!formData.email) {
        errors.email = "Enter email";
      }
      if (!formData.password) {
        errors.password = "Enter Password";
      }
      if (!Object.values(errors).every((value) => value === "")) {
        setErrorMessage(errors);
        return;
      } else {
        const response = await axios.post(
          "http://localhost:5000/auth/login",
          formData
        );

        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.data);
          navigate(RouteObjects.Home);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col w-full max-w-md p-12 space-y-4 text-center dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-3xl font-semibold">Log In to your account</h1>
        <form onSubmit={loginsubmit} className="space-y-4">
          <div className="flex flex-col ">
            <label className="sr-only">Email address</label>
            <input
              onChange={handlechange}
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              className="border-b-2 p-4 m-2 rounded-t-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ri focus:dark:border-violet-400 focus:ri"
            />
            {errorMessage.email && (
              <p className="text-red-500 text-md">{errorMessage.email}</p>
            )}
            <label className="sr-only">Password</label>
            <input
              onChange={handlechange}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="border-b-2  p-4 m-2 rounded-b-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ri focus:dark:border-violet-400 focus:ri"
            />
            {errorMessage.password && (
              <p className="text-red-500 text-md">{errorMessage.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-8 py-3 space-x-2 font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
          >
            Sign in
          </button>
        </form>
        <p className="px-6 text-sm text-center dark:text-gray-400">
          Don't have an account yet?
          <a
            rel="noopener noreferrer"
            href={RouteObjects.Register}
            className="hover:underline dark:text-violet-400"
          >
            Sign up
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default Loginpage;
