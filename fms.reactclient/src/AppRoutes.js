//import index from "./components/Home";
import FuelConsumptionReport from "./pages/Consumption/ConsumptionGrid";
import VehicleDataGrid from "./components/Vehicle/VehicleDataGrid";
import EmployeeDataGrid from "./components/Employee/Employeedatagrid";
import ExpectedAVGClassification from "./components/ExpectedAVG/expectedAVGclassification";
import ExpectedAvg from "./components/ExpectedAVG/expectedAVGdatagrid";
import CreateExpectedAvg from "./pages/ExpectedAvg/ExpectedAvgParentComponent";
import VehicleModelDataGrid from "./pages/VehicleModel/VehicleModelDatagrid";   

const AppRoutes = [

    {
        index:true,
        path: "/consumption-grid",
        element: <FuelConsumptionReport />
    },

    {
        path: "/VehicleModel",
        element: <VehicleModelDataGrid />
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
        element: <ExpectedAvg />
    },
    {
        path: "/CreateExpectedAvg",
        element: <CreateExpectedAvg />
    }


    // Add your new route
];

export default AppRoutes;
