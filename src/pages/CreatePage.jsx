import { useForm } from "react-hook-form";
import instance from "../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {
  const nav = useNavigate();

  async function handleCreate(newData) {
    await instance.post("/newApi", newData);
    return newData;
  }

  const mutation = useMutation({
    mutationFn: handleCreate,
    onSuccess: (data) => {
      toast.success("product created!")

      if (data.category === "fruits") {
        nav("/");
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
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-br from-blue-gray-50 to-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-xl border border-blue-gray-100 shadow-xl shadow-blue-gray-900/5 rounded-2xl p-8 w-full max-w-md space-y-6 transition-all duration-300 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-blue-gray-800 text-center mb-4">
          Create Product
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            {...register("img")}
            placeholder="Image URL"
            className="w-full border border-blue-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all bg-white/70"
          />

          <input
            type="text"
            {...register("title")}
            placeholder="Title"
            className="w-full border border-blue-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all bg-white/70"
          />

          <input
            type="text"
            {...register("desc")}
            placeholder="Description"
            className="w-full border border-blue-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all bg-white/70"
          />

          <input
            type="text"
            {...register("price")}
            placeholder="Price"
            className="w-full border border-blue-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all bg-white/70"
          />

          <select
            {...register("category")}
            className="w-full border border-blue-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all bg-white/70 text-blue-gray-700"
          >
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="meats">Meats</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md ${
            mutation.isPending
              ? "bg-indigo-300 cursor-not-allowed text-white"
              : "bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg"
          }`}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
