import { useEffect, useState } from "react";
import ToDoService from "../Services/ToDoService";

export default function UserHome({ user }) {
  const [todo, setTodo] = useState([]);
  const [noWork, setNoWork] = useState({
    check: false,
    message: "",
  });

  const fetchWorks = async () => {
    const fetchResult = await ToDoService.getWork();
    if (fetchResult.success && fetchResult.works) {
      setTodo(fetchResult.works);
    } else if (fetchResult.success && !fetchResult.works) {
      setNoWork({ check: true, message: fetchResult.message });
    } else {
      alert(fetchResult.message);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  if (!user) return <></>;

  return (
    <div className="flex justify-center">
      <div className="w-8/9 bg-white rounded-3xl py-10 px-20">
        <h1 className="text-3xl font-bold">{user.fullname}'s ToDo List</h1>
        <hr className="mb-10" />
        <div>
          {noWork.check ? (
            <h1 className="text-red-500 text-5xl font-bold">
              {noWork.message}
            </h1>
          ) : (
            <table className="table-auto w-full">
              <thead>
                <tr className="font-bold">
                  <td className="p-2 border">#</td>
                  <td className="p-2 border">Work</td>
                  <td className="p-2 border">Added Date</td>
                  <td className="p-2 border">State</td>
                  <td className="p-2 border">Completed Date</td>
                  <td className="p-2 border"></td>
                </tr>
              </thead>
              <tbody>
                {todo.map((value, index) => {
                  return (
                    <tr>
                      <td className="p-2 border">{index}</td>
                      <td className="p-2 border">{value.work}</td>
                      <td className="p-2 border">
                        {`${ToDoService.getDate(
                          value.addedDate
                        )} - ${ToDoService.getTime(value.addedDate)}`}
                      </td>
                      <td className="p-2 border">{value.state}</td>
                      <td className="p-2 border">
                        {value.completedDate
                          ? `${ToDoService.getDate(
                              value.completedDate
                            )} - ${ToDoService.getTime(value.completedDate)}`
                          : ""}
                      </td>
                      <td className="p-2 border">
                        <button className="mr-2 py-1 px-2 bg-green-500 text-white hover:bg-gray-500 hover:text-black cursor-pointer">
                          Done
                        </button>
                        <button className="py-1 px-2 bg-red-500 text-white hover:bg-gray-500 hover:text-black cursor-pointer">
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
