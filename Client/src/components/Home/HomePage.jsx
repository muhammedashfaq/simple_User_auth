import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { RouteObjects } from "../../Routes/RouteObjests";

const HomePage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const getauserData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/protected/getauserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        setUserData(response.data.userdetails);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong1");
    }
  };
  useEffect(() => {
    getauserData();
  }, []);
  return (
    <>
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <h1 className="text-2xl items-center ">{userData?.email}</h1>
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leadi sm:text-5xl">
            Welcome To Home {userData?.name}
          </h1>
          <button
            className="mt-10 bg-blue-600"
            onClick={() => {
              localStorage.removeItem("token");
              navigate(RouteObjects.Login);
              window.location.reload;
            }}
          >
            Logout
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
