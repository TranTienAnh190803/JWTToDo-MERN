import { useContext, useEffect, useState } from "react";
import ToDoService from "../Services/ToDoService";
import { HomeContext } from "../Pages/Home";

export default function UserHome({ user }) {
  const [todo, setTodo] = useState([]);
  const [noWork, setNoWork] = useState({
    check: false,
    message: "",
  });
  const { setPopup, addSuccess } = useContext(HomeContext);

  const fetchWorks = async () => {
    const fetchResult = await ToDoService.getWork();
    if (fetchResult.success && fetchResult.works) {
      setNoWork({ check: false, message: "" });
      setTodo(fetchResult.works);
    } else if (fetchResult.success && !fetchResult.works) {
      setNoWork({ check: true, message: fetchResult.message });
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  useEffect(() => {
    fetchWorks();
  }, [addSuccess]);

  const handleVerifyWork = async (workId) => {
    const handleResult = await ToDoService.verifyWork(workId);
    alert(handleResult.message);
    if (handleResult.success) {
      fetchWorks();
    }
  };

  const handleDeleteWork = async (workId) => {
    const handleResult = await ToDoService.deleteWork(workId);
    alert(handleResult.message);
    if (handleResult.success) {
      fetchWorks();
    }
  };

  if (!user) return <></>;

  return (
    <div className="flex justify-center">
      <div className="w-8/9 bg-white rounded-3xl py-10 px-20">
        <h1 className="text-3xl font-bold">{user.fullname}'s ToDo List</h1>
        <hr />
        <div className="text-end">
          <button
            className="px-8 py-5 text-xl font-bold rounded-2xl bg-sky-700 text-white hover:bg-sky-300 hover:text-black cursor-pointer my-5"
            onClick={() => {
              setPopup(true);
            }}
          >
            Add Work
          </button>
        </div>
        <div>
          {noWork.check ? (
            <h1 className="text-red-500 text-5xl font-bold text-center">
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
                    <tr key={value._id}>
                      <td className="p-2 border">{index + 1}</td>
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
                        <button
                          className="mr-2 py-1 px-2 bg-green-500 text-white hover:bg-gray-500 hover:text-black cursor-pointer"
                          onClick={async () => {
                            await handleVerifyWork(value._id);
                          }}
                        >
                          Done
                        </button>
                        <button
                          className="py-1 px-2 bg-red-500 text-white hover:bg-gray-500 hover:text-black cursor-pointer"
                          onClick={async () => {
                            await handleDeleteWork(value._id);
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
