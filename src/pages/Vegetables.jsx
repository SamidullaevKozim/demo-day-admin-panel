import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../utils/axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
const Vegetables = () => {
  async function handleGet() {
    const res = await instance.get("/newApi");
    return res.data;
  }

  async function handleDelete(id) {
    await instance.delete(`/newApi/${id}`);
  }

  const { error, isLoading, data } = useQuery({
    queryKey: ["getVegetables"],
    queryFn: handleGet,
  });

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      alert("product delete");
      queryClient.invalidateQueries(["getVegetables"]);
    },
  });

  const queryClient = useQueryClient();

  const vegetables = data?.filter((item) => item.category === "vegetables");

  if (error) return <h1>{error.message}</h1>;

  if (isLoading) return <h1>Loading..</h1>;

  return (
    <div>
      {vegetables?.map((vegetable) => (
        <Card key={vegetable.id} className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={vegetable.img}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {vegetable.title}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {vegetable.price} som
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              {vegetable.desc}
            </Typography>
          </CardBody>
          <Button
            onClick={() => {
              mutation.mutate(vegetable.id);
            }}
          >
            Delete
          </Button>
          <Link to={`/vegetablesUpdate/${vegetable.id}`}>
            <Button>Update</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Vegetables;
