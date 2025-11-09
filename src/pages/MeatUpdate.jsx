import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const MeatUpdate = () => {
  let { id } = useParams();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleGetMeatsId() {
    const res = await instance.get(`/newApi/${id}`);
    return res.data;
  }

  async function handleUpdateMeats({ id, ...updatedData }) {
    await instance.put(`/newApi/${id}`, updatedData);
  }

  const mutation = useMutation({
    mutationFn: handleUpdateMeats,
    onSuccess: () => {
      alert("product updated");
      nav("/meats");
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["getMeatsId", id],
    queryFn: handleGetMeatsId,
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
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-gray-50 to-white py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 backdrop-blur-xl shadow-xl border border-blue-gray-100 rounded-2xl p-8 w-full max-w-md space-y-6 transition-all"
      >
        <h2 className="text-3xl font-semibold text-blue-gray-800 text-center mb-2">
          Update Product
        </h2>

        <div className="space-y-4">
          <input
            {...register("img")}
            type="text"
            placeholder="Image URL"
            className="w-full border border-blue-gray-200 rounded-lg px-4 py-2 text-blue-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
          />

          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="w-full border border-blue-gray-200 rounded-lg px-4 py-2 text-blue-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
          />

          <textarea
            {...register("desc")}
            placeholder="Description"
            className="w-full border border-blue-gray-200 rounded-lg px-4 py-2 text-blue-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all resize-none h-24"
          />

          <input
            {...register("price")}
            type="text"
            placeholder="Price"
            className="w-full border border-blue-gray-200 rounded-lg px-4 py-2 text-blue-gray-700 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className={`w-full text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-200 ${
            mutation.isPending
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Updating..." : "Update"}
        </button>
      </form>
      <button
        onClick={() => nav("/meats")}
        className="fixed bottom-6 right-6 bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-full shadow-lg shadow-indigo-200/50 transition-all duration-200"
      >
        Back
      </button>
    </div>
  );
};

export default MeatUpdate;
