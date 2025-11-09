import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../utils/axios";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Meat = () => {
  async function handleGet() {
    const res = await instance.get("/newApi");
    return res.data;
  }

  async function handleDelete(id) {
    await instance.delete(`/newApi/${id}`);
  }

  const { error, isLoading, data } = useQuery({
    queryKey: ["getMeat"],
    queryFn: handleGet,
  });

  const queryQlient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      alert("product deleted");
      queryQlient.invalidateQueries(["getMeat"]);
    },
  });

  const meats = data?.filter((item) => item.category === "meats");

  if (isLoading) return <h1>Loading..</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-gray-50 to-white py-10 px-6">
      <div className="overflow-x-auto shadow-lg rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-gray-100">
        <table className="min-w-full divide-y divide-blue-gray-200">
          <thead className="bg-blue-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-blue-gray-700">Description</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-blue-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-gray-200">
            {meats?.map((meat) => (
              <tr key={meat.id} className="hover:bg-blue-gray-50 transition-all">
                <td className="px-6 py-4">
                  <img
                    src={meat.img}
                    alt={meat.title}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4 text-blue-gray-800 font-medium">{meat.title}</td>
                <td className="px-6 py-4 text-indigo-600 font-semibold">{meat.price} som</td>
                <td className="px-6 py-4 text-blue-gray-600 text-sm">{meat.desc}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <Button
                    onClick={() => mutation.mutate(meat.id)}
                    color="red"
                    variant="filled"
                    size="sm"
                    className="rounded-lg px-3 py-1 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Delete
                  </Button>
                  <Link to={`/meatsUpdate/${meat.id}`}>
                    <Button
                      color="indigo"
                      variant="gradient"
                      size="sm"
                      className="rounded-lg px-3 py-1 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Update
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Meat;
