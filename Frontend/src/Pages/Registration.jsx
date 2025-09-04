import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";

export default function Registration() {
  document.title = "Registration";
  const navigate = useNavigate();
  const [registrationForm, setRegistrationForm] = useState({});

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegistrationForm({ ...registrationForm, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const registerResult = await UserService.register(registrationForm);
    if (registerResult.success) {
      const loginResult = await UserService.login({
        username: registrationForm.username,
        password: registrationForm.password,
      });
      if (loginResult.success) {
        const token = loginResult.jwtToken;
        localStorage.setItem("token", token);
        alert(registerResult.message);
        navigate("/");
        window.location.reload();
      } else {
        alert(loginResult.message);
      }
    } else {
      alert(registerResult.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[url('assets/Bunny.jpg')] bg-cover bg-center">
      <form
        onSubmit={handleRegister}
        className="border-2 rounded-2xl p-8 bg-white/50"
      >
        <h1 className="text-5xl font-bold text-center">Registration</h1>
        <hr className="mt-3 mb-5" />
        <div className="my-3">
          <div className="flex justify-between items-center my-3">
            <label className="font-medium mr-5">Fullname: </label>
            <input
              type="text"
              name="fullname"
              className="border px-2 py-1 w-80"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between items-center my-3">
            <label className="font-medium mr-5">Username: </label>
            <input
              type="text"
              name="username"
              className="border px-2 py-1 w-80"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between items-center my-3">
            <label className="font-medium mr-5">Age: </label>
            <input
              type="number"
              name="age"
              className="border px-2 py-1 w-80"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between items-center my-3">
            <label className="font-medium mr-5">Address: </label>
            <input
              type="text"
              name="address"
              className="border px-2 py-1 w-80"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between items-center my-3">
            <label className="font-medium mr-5">Password: </label>
            <input
              type="password"
              name="password"
              className="border px-2 py-1 w-80"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between items-center my-3">
            <label className="font-medium mr-5">Confirmed Password: </label>
            <input
              type="password"
              name="confirmedPassword"
              className="border px-2 py-1 w-80"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <p className="my-5">
            Already Have An Account.{" "}
            <Link to={"/login"} className="text-purple-500 hover:text-sky-500">
              Login
            </Link>
          </p>
          <button className="w-full border p-3 bg-gray-800 text-white hover:bg-gray-500 hover:text-black cursor-pointer">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
