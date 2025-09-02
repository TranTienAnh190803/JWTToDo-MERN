import { useEffect, useState } from "react";
import UserService from "../Services/UserService";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
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
      <nav className="h-20 w-full fixed bg-gray-950 text-gray-50 flex justify-between items-center px-10">
        <h1 className="text-3xl font-bold">ToDo List</h1>
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
    </>
  );
}
