import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";

export default function Registration() {
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
    <>
      <form onSubmit={handleRegister}>
        <h1 className="text-3xl font-bold">Registration</h1>
        <div>
          <div>
            <label>Fullname: </label>
            <input
              type="text"
              name="fullname"
              className="border"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              className="border"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Age: </label>
            <input
              type="number"
              name="age"
              className="border"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Address: </label>
            <input
              type="text"
              name="address"
              className="border"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              name="password"
              className="border"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Confirmed Password: </label>
            <input
              type="password"
              name="confirmedPassword"
              className="border"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <p>
            Already Have An Account.{" "}
            <Link to={"/login"} className="text-purple-500 hover:text-sky-500">
              Login
            </Link>
          </p>
          <button className="border p-3 hover:bg-gray-500 hover:text-gray-50 cursor-pointer">
            Register
          </button>
        </div>
      </form>
    </>
  );
}
