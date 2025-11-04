import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Fruits from "./pages/Fruits";
import Meat from "./pages/Meat";
import Vegetables from "./pages/Vegetables";
import FruitsCreate from "./pages/FruitsCreate";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="fruits" element={<Fruits />} />
        <Route path="vegetables" element={<Vegetables />} />
        <Route path="meats" element={<Meat />} />
        <Route path="fruitsCreate" element={<FruitsCreate />} />
      </Route>
    </Routes>
  );
};

export default App;
