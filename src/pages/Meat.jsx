import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../utils/axios";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

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

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      alert("product deleted");
      queryQlient.invalidateQueries("getMeat");
    },
  });

  const queryQlient = useQueryClient();

  const meats = data?.filter((item) => item.category === "meats");

  if (isLoading) return <h1>Loading..</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <div>
      {meats?.map((meat) => (
        <Card key={meat.id} className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={meat.img}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {meat.title}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {meat.price} som
              </Typography>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal opacity-75"
            >
              {meat.desc}
            </Typography>
          </CardBody>
          <Button
            onClick={() => {
              mutation.mutate(meat.id);
            }}
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default Meat;
