import React , { useState, useEffect } from 'react';
import DataGrid, { Column, Paging, FilterRow } from 'devextreme-react/data-grid';
import axios from "axios";

const ConsumptionGrid = () => 
{
    const [consumptionData, setConsumptionData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {

                const fuelconsumptionID = 218;
                const fromdate = '2023-04-18';
                const todate = '2023-04-19';


                const response = await axios.get("https://localhost:7009/api/consumption", {
                    params: {
                        fuelconsumptionID,
                        from: fromdate,
                        to: todate,
                    },
                });
                setConsumptionData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
      
    },[]);

return (
    <DataGrid dataSource={consumptionData} showBorders = {true}>
   <FilterRow visible={true} />
        <Paging defaultPageIndex={50} />
        <Column dataField="date" caption="Date" />
        <Column dataField="vehicleId" caption="Vehicle Name" />
        <Column dataField="hyoungNo" caption="Hyoung No" />
        <Column dataField="defaultEmployee" caption="Default Employee" />
        <Column dataField="employeeWorkNumber" caption="Employee Work Number" />

        <Column dataField="maxSpeed" caption="Max Speed" />
        <Column dataField="avgSpeed" caption="AVG Speed" />
        <Column dataField="totalDistance" caption="Total Distance" />
        <Column dataField="engHours" caption="Total Eng Hours" />
        <Column dataField="totalFuel" caption="Total Fuel" />
        <Column dataField="expectedAveraged" caption="Expected Averaged"/>
        <Column dataField="fuelEfficiency" caption="Fuel Efficiency" />
        <Column dataField="fuelLost" caption="Fuel Lost" />

        <Column dataField="site" caption="Site" />

        <Column dataField="isNightShift" caption="Night Shift" />

    </DataGrid>
  );

};

export default ConsumptionGrid;