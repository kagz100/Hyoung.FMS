import Home from "./components/Home";
import FuelConsumptionReport from "./components/ConsumptionGrid";
import VehicleDataGrid from "./components/VehicleDataGrid";
import EmployeeDataGrid from "./components/EmployeeDataGrid";
import ExpectedAVGClassification from "./components/ExpectedAVGClassification";
import ExpectedAvg from "./components/ExpectedAvgDatagrid"; 
import CreateExpectedAvg from "./components/ExpectedAvgParentComponent";


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
    },
    {
        path: "/CreateExpectedAvg",
        element: <CreateExpectedAvg />
    }


    // Add your new route
];

export default AppRoutes;
