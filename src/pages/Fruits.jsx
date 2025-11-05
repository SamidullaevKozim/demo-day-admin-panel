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
const Fruits = () => {
  async function handleGet() {
    const res = await instance.get("/newApi");
    return res.data;
  }

  async function handleDelete(id) {
    await instance.delete(`/newApi/${id}`);
  }

  const { error, isLoading, data } = useQuery({
    queryKey: ["getFruits"],
    queryFn: handleGet,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      alert("info deleted");
      queryClient.invalidateQueries(["getFruits"]);
    },
  });

  const fruits = data?.filter((item) => item.category === "fruits");

  if (error) return <h1>{error.message}</h1>;
  if (isLoading) return <h1>Loading..</h1>;

  return (
    <div>
      {fruits?.map((fruit) => (
        <Card key={fruit.id} className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={fruit.img}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {fruit.title}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {fruit.price} som
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              {fruit.desc}
            </Typography>
          </CardBody>
          <Button
            onClick={() => {
              mutation.mutate(fruit.id);
            }}
          >
            delete
          </Button>
          <Link to={`/fruitsUpdate/${fruit.id}`}>
            <Button>Update</Button>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Fruits;
