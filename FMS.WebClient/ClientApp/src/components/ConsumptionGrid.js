import React , { useState, useEffect } from 'react';
import DataGrid, { Column, Paging, FilterRow, Sorting, ColumnChooser, ColumnFixing, FilterPanel,SearchPanel } from 'devextreme-react/data-grid';
import axios from "axios";
import { HeaderFilter } from 'devextreme-react/pivot-grid-field-chooser';
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';

const ConsumptionGrid = () => 
{
    const [consumptionData, setConsumptionData] = useState([]);

    const FuelCellRenderer = (cellData) => {
        const intValue = Math.round(cellData.value);
        return <div>{intValue}</div>;
    };


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
    <DataGrid dataSource={consumptionData} showBorders={true}
        keyExpr="vehicleId"
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        rowAlternationEnable={true}
    >
        <Paging defaultPageIndex={100} />

        <FilterRow visible={true} />
        <FilterPanel visible={true} />
       
        <ColumnChooser enabled={true} />
        <ColumnFixing enabled={true} />
        <Sorting mode="multiple" />


        <HeaderFilter visible={true} />

        <SearchPanel visible={true}
            width={240}
            placeholder="Search..." />

        <Column dataField="date"
            width={100}
            FilterRow={false}
            fixed={true}
            dataType="date"
            caption="Date" />
            

        <Column dataField="vehicleId"
             visible={true}
            caption="Vehicle ID" />
        <Column dataField="hyoungNo"
            fixed={true}
            caption="Hyoung No" />
        <Column caption="Employee Details" >
        <Column dataField="defaultEmployee" caption="Name" />
        <Column dataField="employeeWorkNumber" caption="Work Number" />
        </Column>
        <Column dataField="maxSpeed" caption="Max Speed" />
        <Column dataField="avgSpeed" caption="AVG Speed" />
        <Column dataField="totalDistance"

            dataType="number"
            caption="Distance" />
        <Column dataField="engHours" caption="Engine Hours" />
        <Column dataField="totalFuel"
            visible={true}
            caption="Fuel" />
        <Column dataField="expectedAveraged" caption="Expected Averaged"/>
        <Column dataField="fuelEfficiency" caption="Fuel Efficiency" />
        <Column dataField="fuelLost" caption="Fuel Lost" />

        <Column dataField="site" caption="Site" />

        <Column dataField="isNightShift" caption="Night Shift" />
        <Column dataField="comments" caption="Comments" />

    </DataGrid>
  );

};

export default ConsumptionGrid;