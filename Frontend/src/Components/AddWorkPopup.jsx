import { useContext, useState } from "react";
import { HomeContext } from "../Pages/Home";
import ToDoService from "../Services/ToDoService";

export default function Popup() {
  const { setPopup, addSuccess, setAddSuccess } = useContext(HomeContext);
  const [work, setWork] = useState({
    work: "",
    deadline: null,
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setWork({ ...work, [name]: value });
  };

  const handleAddWork = async (e) => {
    e.preventDefault();
    const handleResult = await ToDoService.addWork(work);
    alert(handleResult.message);
    if (handleResult.success) {
      setAddSuccess(!addSuccess);
      setPopup(false);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex justify-center items-center"
      onClick={() => {
        setPopup(false);
      }}
    >
      <div
        className="p-10 bg-white w-1/2 rounded-3xl overflow-hidden relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="p-3 text-3xl font-bold bg-red-500 text-black absolute top-0 right-0 hover:bg-gray-500 hover:text-white cursor-pointer"
          onClick={() => {
            setPopup(false);
          }}
        >
          X
        </button>
        <form onSubmit={handleAddWork}>
          <h1 className="text-3xl font-bold">Add Work</h1>
          <hr className="mb-10" />
          <div className="mb-5">
            <p className="font-bold mb-2">Work: </p>
            <input
              type="text"
              name="work"
              className="border px-2 py-1 w-full"
              value={work.work}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-10">
            <p className="font-bold mb-2">Deadline: </p>
            <input
              type="datetime-local"
              name="deadline"
              className="border px-2 py-1 w-full"
              value={work.deadline}
              onChange={handleInputChange}
            />
          </div>
          <button className="w-full py-3 bg-green-600 text-white hover:bg-gray-500 hover:text-black cursor-pointer">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
