import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function DefaultSidebar() {
  return (
    <Card className="h-[100vh] sticky top-0 left-0 w-full max-w-[20rem] p-6 shadow-lg shadow-blue-gray-900/10 bg-gradient-to-b from-white to-blue-gray-50 border border-blue-gray-100 rounded-xl">
      <div className="mb-6 p-2 flex items-center justify-center">
        <Typography
          variant="h4"
          color="blue-gray"
          className="font-semibold tracking-wide"
        >
          Admin Panel
        </Typography>
      </div>

      <List className="space-y-2">
        <Link to={"/"}>
          <ListItem className="hover:bg-blue-50 transition-all duration-200 rounded-lg text-blue-gray-700 hover:text-blue-600">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 text-blue-500" />
            </ListItemPrefix>
            Fruits
          </ListItem>
        </Link>

        <Link to={"/vegetables"}>
          <ListItem className="hover:bg-green-50 transition-all duration-200 rounded-lg text-blue-gray-700 hover:text-green-600">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 text-green-500" />
            </ListItemPrefix>
            Vegetables
          </ListItem>
        </Link>

        <Link to={"/meats"}>
          <ListItem className="hover:bg-red-50 transition-all duration-200 rounded-lg text-blue-gray-700 hover:text-red-600">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 text-red-500" />
            </ListItemPrefix>
            Meat
          </ListItem>
        </Link>

        <Link to={"/create"}>
          <ListItem className="hover:bg-indigo-50 transition-all duration-200 rounded-lg text-blue-gray-700 hover:text-indigo-600">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 text-indigo-500" />
            </ListItemPrefix>
            Create Fruits
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
