import Home from "./components/Home";
import FuelConsumptionReport from "./components/ConsumptionGrid";
import ConsumptionReportGrid from "./components/ConsumptionReportGrid";

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
    }// Add your new route
];

export default AppRoutes;
