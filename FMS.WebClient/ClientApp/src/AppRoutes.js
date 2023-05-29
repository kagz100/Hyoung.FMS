import Home from "./components/Home";
import FuelConsumptionReport from "./components/ConsumptionGrid";
import VehicleDataGrid from "./components/VehicleDataGrid";
import EmployeeDataGrid from "./components/EmployeeDataGrid";
import ExpectedAVGClassification from "./components/ExpectedAVGClassification";
import ExpectedAvg from "./components/ExpectedAvgDatagrid"; 

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
    },
    {
        path: "/Expectedavgclass",
        element: <ExpectedAVGClassification />
    },
    {
        path: "/ExpectedAvg",
        element:<ExpectedAvg/>
    }


    // Add your new route
];

export default AppRoutes;
