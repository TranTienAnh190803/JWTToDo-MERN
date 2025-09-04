import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";

export default function Login() {
  document.title = "Login";
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginResult = await UserService.login(loginForm);
    if (loginResult.success) {
      const token = loginResult.jwtToken;
      localStorage.setItem("token", token);
      alert(loginResult.message);
      navigate("/");
      window.location.reload();
    } else {
      alert(loginResult.message);
    }
  };

  return (
    <div
      className={`h-screen flex justify-center items-center bg-[url('/assets/Cat.jpg')] bg-cover bg-center`}
    >
      <form
        onSubmit={handleLogin}
        className="border-2 rounded-2xl p-8 bg-white/50"
      >
        <h1 className="text-5xl font-bold text-center">Login</h1>
        <hr className="mt-3 mb-8" />
        <div>
          <div className="flex justify-between items-center my-3">
            <label className="font-medium mr-5">Username: </label>
            <input
              type="text"
              name="username"
              className="border px-2 py-1"
              value={loginForm.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between items-center my-3">
            <label className="font-medium mr-5">Password: </label>
            <input
              type="password"
              name="password"
              className="border px-2 py-1"
              value={loginForm.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-5">
            <span>Don't have an account? </span>{" "}
            <Link
              to={"/register"}
              className="text-purple-500 hover:text-blue-500"
            >
              Create account
            </Link>
          </div>
          <button className="w-full p-3 bg-gray-800 text-white hover:bg-gray-500 hover:text-gray-50 cursor-pointer">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
