import Home from "./components/Home";
import FuelConsumptionReport from "./components/ConsumptionGrid";
import ConsumptionReportGrid from "./components/ConsumptionReportGrid";
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
        path: "/Consumption-Report-Grid",
        element: <ConsumptionReportGrid />
    }
    ,
    {
        path: "/Vehicle",
        element: <VehicleDataGrid />
    }

    // Add your new route
];

export default AppRoutes;
