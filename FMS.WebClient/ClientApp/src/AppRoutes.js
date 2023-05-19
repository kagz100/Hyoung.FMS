import Home from "./components/Home";
import FuelConsumptionReport from "./components/ConsumptionGrid";
import VehicleDataGrid from "./components/VehicleDataGrid";
import EmployeeDataGrid from "./components/EmployeeDataGrid";

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
    },
    {
        path: "/Employee",
        element: <EmployeeDataGrid />
    }

    // Add your new route
];

export default AppRoutes;
