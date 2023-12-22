//import index from "./components/Home";
import FuelConsumptionReport from "./components/ConsumptionGrid"
import VehicleDataGrid from "./components/Vehicle/VehicleDataGrid";
import EmployeeDataGrid from "./components/Employee/Employeedatagrid";
import ExpectedAVGClassification from "./components/ExpectedAVG/expectedAVGclassification";
import ExpectedAvg from "./components/ExpectedAVG/expectedAVGdatagrid";

const AppRoutes = [

    {
        index:true,
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
        element: <ExpectedAvg />
    }


    // Add your new route
];

export default AppRoutes;
