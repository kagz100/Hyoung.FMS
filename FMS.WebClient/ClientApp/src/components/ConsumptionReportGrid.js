import React, { useState, useEffect } from 'react';
import 'devextreme/dist/css/dx.light.css';
import DataGrid, { Column, Paging, FilterRow } from 'devextreme-react/data-grid';

const ConstumptionReportGrid = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // replace this with your API url to fetch the consumption report Data
        const apirURL = 'https://localhost:7009/api/Consumption';

        // add any required parameters for your api
        const fuelConsumptionReportID = 218;
        const from = '2023-04-18';
        const to = '2023-04-19';

        const response = await fetch(
            `${apirURL}?fuelConsumptionReportId=${fuelConsumptionReportID}&from=${from}&to=${to}`
        );

        const result = await response.json();

        //const text = await response.text();
        //console.log("API Response text: ", text);

        setData(result);
    };

    return (
        <DataGrid dataSource={data} showBorders={true}>
            <FilterRow visible={true} />
            <Paging defaultPageIndex={20} />
            <Column dataField="vehicleId" caption="Vehicle Name" />
            <Column dataField="totalFuel" caption="Total Fuel" />
            <Column dataField="hyoungNo" caption="Hyoung No" />
        </DataGrid>
    );
};

export default ConstumptionReportGrid;
