import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Fruits from "./pages/Fruits";
import Meat from "./pages/Meat";
import Vegetables from "./pages/Vegetables";
import FruitUpdate from "./pages/FruitUpdate";
import CreatePage from "./pages/CreatePage";
import VegetablesUpdate from "./pages/VegetablesUpdate";
import MeatUpdate from "./pages/MeatUpdate";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-blue-gray-50 to-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Fruits />} />
          <Route path="vegetables" element={<Vegetables />} />
          <Route path="meats" element={<Meat />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="fruitsUpdate/:id" element={<FruitUpdate />} />
          <Route path="vegetablesUpdate/:id" element={<VegetablesUpdate />} />
          <Route path="meatsUpdate/:id" element={<MeatUpdate />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
