import React,{useState,useEffect} from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_FMS_API_URL;

const HistoryDetails = ({vehicleId,date}) => {
  const [historyData, setHistoryData] = useState([]);   

  useEffect(() => {
    if(vehicleId && date)
    {
        console.log("fetching history data",vehicleId,date);
        loadHistoryData(vehicleId,date);
    
      }},[vehicleId,date]);
    
      const loadHistoryData = async (vehicleId,date) => {
        try{
            const response = await axios.get(`${apiUrl}/consumption/gethistoryconsumption`, {
                params: {
                    vehicleId: vehicleId,
                    date: date
                }
            });
            setHistoryData(response.data);
        } catch (error) {
            console.log("error fetctching historical data",error);
        }
    };
    return (
   
        <DataGrid
          id="gridContainer"
          dataSource={historyData}
          keyExpr="id"
          showBorders={true}
        >
         <Column dataField="date" caption="Date" dataType="date" />
                                <Column dataField="employee" caption="Employee" />
                                <Column dataField="totalFuel" caption="Total Fuel" />
                                <Column dataField="expectedAveraged" caption="ExpectedAveraged" />
                                <Column dataField="totalDistance" caption="Total Distance" />
                                <Column dataField="engHours" caption="Engine Hours" />
                                <Column dataField="maxSpeed" caption="Max Speed" />
                                <Column dataField="avgSpeed" caption="Avg Speed" />
                                <Column dataField="fuelEfficiency" caption="Fuel Efficiency" />
                                <Column dataField="fuelLost" caption="Fuel Lost" />
                                <Column dataField="isNightShift" caption="Is Night Shift" />
                                <Column dataField="isAverageKm" caption="Is Km/l" />
                                <Column dataField="comments" caption="Comments" />
                                <Column dataField="vehicleId" caption="Vehicle ID" />
                                <Column dataField="site" caption="Site" />
        </DataGrid>
    );


};
export default HistoryDetails;  
