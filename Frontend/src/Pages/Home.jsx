import { useEffect, useState } from "react";
import UserService from "../Services/UserService";
import { Link, useNavigate } from "react-router-dom";
import AdminHome from "../Components/AdminHome";
import UserHome from "../Components/UserHome";

export default function Home() {
  document.title = "Home";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchLoggedinUser = async () => {
    if (UserService.isAuthenticate()) {
      const fetchUserResult = await UserService.getLoggedinUser();
      if (fetchUserResult.success) {
        setUser(fetchUserResult.user);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchLoggedinUser();
  }, []);

  return (
    <>
      <nav className="h-20 w-full fixed top-0 left-0 right-0 bg-gray-950 text-gray-50 flex justify-between items-center px-10">
        <h1 className="text-3xl font-bold cursor-pointer">ToDo App</h1>
        {user ? (
          <div>
            <span className="mr-5">Hello {user.fullname}</span>{" "}
            <button className="bg-red-500 p-3 cursor-pointer" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <Link className="bg-green-500 p-3" to={"/login"}>
            Login
          </Link>
        )}
      </nav>
      <div className="mt-50 min-h-screen">
        {UserService.isAuthenticate() ? (
          UserService.isAdmin() ? (
            <AdminHome />
          ) : (
            <UserHome />
          )
        ) : (
          <div className="flex justify-center">
            <h1 className="text-5xl text-sky-700 font-bold">Please, Login!</h1>
          </div>
        )}
      </div>
      <footer className="w-full bg-gray-950 flex justify-center">
        <div className="text-5xl text-white font-bold p-10 text-center">
          <h1 className="mb-5">Trần Tiến Anh</h1>
          <h1>MERN Stack TODO</h1>
        </div>
      </footer>
    </>
  );
}
