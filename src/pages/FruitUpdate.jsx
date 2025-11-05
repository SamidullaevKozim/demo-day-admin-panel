import { useNavigate, useParams } from "react-router-dom";
import instance from "../utils/axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const FruitUpdate = () => {
  const { id } = useParams();
  let nav = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleFruitsGetId() {
    const res = await instance.get(`/newApi/${id}`);
    return res.data;
  }

  async function handleUpdateFruits({ id, ...updatedData }) {
    await instance.put(`/newApi/${id}`, updatedData);
  }

  const mutation = useMutation({
    mutationFn: handleUpdateFruits,
    onSuccess: () => {
      alert("Product updated");
      nav("/fruits");
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["getFruitsId", id],
    queryFn: handleFruitsGetId,
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    mutation.mutate({ id, ...formData });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Update product
        </h2>

        <input
          {...register("img")}
          type="text"
          placeholder="Image URL"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        />

        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        />

        <input
          {...register("desc")}
          type="text"
          placeholder="Description"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        />

        <input
          {...register("price")}
          type="text"
          placeholder="Price"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-all duration-200"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default FruitUpdate;
