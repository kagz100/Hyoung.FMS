import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Paging, FilterRow, Sorting, ColumnChooser, ColumnFixing, FilterPanel, SearchPanel } from 'devextreme-react/data-grid';
import axios from "axios";
import { HeaderFilter } from 'devextreme-react/pivot-grid-field-chooser';
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';
import DateBox from 'devextreme-react/date-box';
import Button from 'devextreme-react/button';

const ConsumptionGrid = () => {
    const [consumptionData, setConsumptionData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchData = async () => {
        if (!selectedDate) {
            return;
        }
        const fromdate = selectedDate?.toISOString();
        const response = await axios.get("https://localhost:7009/api/consumption", {
            params: {
                from: fromdate,
            },
        });
        setConsumptionData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    return (

    <div>
        <div className="row">
            <div className="col-8">
                <DateBox defaultValue={null} type="date" onValueChanged={(e) => setSelectedDate(e.value)} />
            </div>
            <div className="col-4">
                <Button text="Load Data" onClick={fetchData} />
            </div>
        </div>
   

    <DataGrid dataSource={consumptionData} showBorders={true}
        keyExpr="vehicleId"
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        rowAlternationEnable={true}
    >
        <Paging defaultPageIndex={100} />

        <FilterRow visible={true} />
       
        <ColumnChooser enabled={true} />
        <ColumnFixing enabled={true} />
        <Sorting mode="multiple" />


        <HeaderFilter visible={true} />

     

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
                <Column dataField="engHours" caption="Engine Hours" format={{ type: 'fixedPoint', precision: 1 } } />
        <Column dataField="totalFuel"
            visible={true}
            caption="Fuel" />
        <Column dataField="expectedAveraged" caption="Expected Averaged"/>
        <Column dataField="fuelEfficiency" caption="Fuel Efficiency" />
        <Column dataField="fuelLost" caption="Fuel Lost" />

        <Column dataField="site" caption="Site" />

        <Column dataField="isNightShift" caption="Night Shift" />
        <Column dataField="Comments" caption="Comments" />

        </DataGrid>
   </div>
  );

};

export default ConsumptionGrid;