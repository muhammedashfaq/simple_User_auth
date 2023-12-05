import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { RouteObjects } from "../../Routes/RouteObjests";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handlechangeinput = (event) => {
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

  const register = async (e) => {
    try {
      e.preventDefault();
      const error = {};

      if (!formData.name) {
        error.name = "please enter a name";
      }

      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        error.email = "please enter a valid email";
      }

      if (!formData.password) {
        error.password = "please enter password";
      }

      if (!Object.values(error).every((value) => value === "")) {
        setErrorMessage(error);
        return;
      } else {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          formData
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate(RouteObjects.Login);
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
        <h1 className="text-3xl font-semibold">Register to your account</h1>
        <form onSubmit={register} className="space-y-4">
          <div className="flex flex-col ">
            <label className="sr-only">Name</label>
            <input
              onChange={handlechangeinput}
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              className=" border-b-2 p-4 m-2 rounded-t-md dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ri focus:dark:border-violet-400 focus:ri"
            />
            {errorMessage.name && (
              <p className="text-red-500 text-md">{errorMessage.name}</p>
            )}
            <label className="sr-only">Email address</label>
            <input
              onChange={handlechangeinput}
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
              onChange={handlechangeinput}
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
            Register
          </button>
        </form>
        <p className="px-6 text-sm text-center dark:text-gray-400">
          Already a User?
          <a
            rel="noopener noreferrer"
            href={RouteObjects.Login}
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

export default RegisterPage;
