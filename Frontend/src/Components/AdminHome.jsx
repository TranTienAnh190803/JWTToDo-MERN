import { useEffect, useState } from "react";
import UserService from "../Services/UserService";

export default function AdminHome() {
  const [users, setUsers] = useState([]);
  const [noUser, setNoUser] = useState({
    check: false,
    message: "",
  });

  const fetchAllUsers = async () => {
    if (UserService.isAdmin()) {
      const fetchResult = await UserService.getAllUser();
      if (fetchResult.success && fetchResult.users) {
        setUsers(fetchResult.users);
      } else if (fetchResult.success && !fetchResult.users) {
        setNoUser({ check: true, message: fetchResult.message });
      } else {
        alert(fetchResult.message);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (UserService.isAdmin()) {
      if (confirm("Do You Want To Delete This User.")) {
        const deleteResult = await UserService.deleteUser(userId);
        alert(deleteResult.message);
        if (deleteResult.success) {
          window.location.reload();
        }
      }
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-8/9 bg-white rounded-3xl py-10 px-20">
        <div className="w-full">
          <h1 className="text-3xl font-bold">Admin</h1>
          <hr className="mb-10" />
          {noUser.check ? (
            <div>
              <h1 className="text-red-500 text-5xl font-bold">
                {noUser.message}
              </h1>
            </div>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="font-bold">
                  <td className="p-2 border">#</td>
                  <td className="p-2 border">Username</td>
                  <td className="p-2 border">Fullname</td>
                  <td className="p-2 border">Age</td>
                  <td className="p-2 border">Address</td>
                  <td className="p-2 border"></td>
                </tr>
              </thead>
              <tbody>
                {users.map((value, index) => {
                  return (
                    <tr>
                      <td className="p-2 border">{index}</td>
                      <td className="p-2 border">{value.username}</td>
                      <td className="p-2 border">{value.fullname}</td>
                      <td className="p-2 border">{value.age}</td>
                      <td className="p-2 border">{value.address}</td>
                      <td className="p-2 border">
                        <button
                          className="bg-red-500 text-white hover:bg-gray-500 hover:text-black p-2 cursor-pointer"
                          onClick={() => {
                            handleDeleteUser(value._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
