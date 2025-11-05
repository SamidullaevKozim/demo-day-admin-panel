import { useForm } from "react-hook-form";
import instance from "../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const nav = useNavigate();

  async function handleCreate(newData) {
    await instance.post("/newApi", newData);
    return newData;
  }

  const mutation = useMutation({
    mutationFn: handleCreate,
    onSuccess: (data) => {
      alert("Product created");

      if (data.category === "fruits") {
        nav("/fruits");
      } else if (data.category === "vegetables") {
        nav("/vegetables");
      } else if (data.category === "meats") {
        nav("/meats");
      } else {
        nav("/");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create Product
        </h2>

        <input
          type="text"
          {...register("img")}
          placeholder="Image URL"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        />

        <input
          type="text"
          {...register("title")}
          placeholder="Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        />

        <input
          type="text"
          {...register("desc")}
          placeholder="Description"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        />

        <input
          type="text"
          {...register("price")}
          placeholder="Price"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        />

        <select
          {...register("category")}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        >
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="meats">Meats</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
