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
    <Card className="h-[100vh] sticky w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 top-0 left-0">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <Link to={"/fruits"}>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Fruits
          </ListItem>
        </Link>
        <Link to={"/vegetables"}>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Vegetables
          </ListItem>
        </Link>
        <Link to={"/meats"}>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Meat
          </ListItem>
        </Link>
        <Link to={"/fruitsCreate"}>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Create Fruits
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
