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
    <div>
      <form onSubmit={handleLogin}>
        <h1 className="text-3xl font-medium">Login</h1>
        <div>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              className="border"
              value={loginForm.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              className="border"
              value={loginForm.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>Don't have an account? </span>{" "}
            <Link
              to={"/register"}
              className="text-purple-500 hover:text-blue-500"
            >
              Create account
            </Link>
          </div>
          <button className="p-3 border hover:bg-gray-500 hover:text-gray-50 cursor-pointer">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
