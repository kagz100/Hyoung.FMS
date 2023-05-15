import Home from "./components/Home";
import FuelConsumptionReport from "./components/ConsumptionGrid";
import VehicleDataGrid from "./components/VehicleDataGrid";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  
    {
        path: "/consumption-grid",
        element: <FuelConsumptionReport />
    },

 
    {
        path: "/Vehicle",
        element: <VehicleDataGrid />
    }

    // Add your new route
];

export default AppRoutes;
