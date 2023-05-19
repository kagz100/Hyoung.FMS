import React from 'react';
import DataGrid, { Editing, FilterRow,Column, RequiredRule, HeaderFilter, Lookup } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import EmployeeVehicleTagBox from './EmployeeVehicleTagBox';

const apiUrl = "https://localhost:7009/api";

const vehicleTemplate = (container, options) => {
    const noBreakSpace = '\u00A0';
    const text = (options.value || []).map(element => element.hyoungNo).join(', ');
    container.textContent = text || noBreakSpace;
    container.title = text;
};


const EmployeeGrid = () => {
    const dataSource = new CustomStore({
        key: 'id',
        load: async () => {
            const response = await axios.get(`${apiUrl}/employee/getemployeelist`);
            return response.data;
        },
        byKey: async (key) => {
            const response = await axios.get(`${apiUrl}/employee/${key}`);
           // console.log("Response.data: ", response.data);
            return response.data;

        },
        update: async (key, values) => {
            console.log('Request data:', { values, id: key });
            const originalData = await dataSource.byKey(key);
            const updatedVehicles = values.vehicles ? values.vehicles.map(vehicleId => ({ vehicleId })) : originalData.vehicles;
            const updatedValues = { ...values, vehicles: updatedVehicles }; // Use the updated vehicles array
            const updatedData = { ...originalData, ...updatedValues, id: key };
            // Add axios.post or axios.put here
            if (updatedData.siteId == 0) {
                delete updatedData.siteId;
            }
            console.log("Updated data: ", updatedData);

            const response = await axios.put(`${apiUrl}/employee/update/${key}`, updatedData);
        }
    });

    const siteDataSource = new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: async () => {
            const response = await axios.get(`${apiUrl}/site/GetSiteList`);
            return response.data;
        }
    

    });


    const vehicleDataSource = new CustomStore({
        key: 'vehicleId',
        loadMode: 'raw',
        load: async () => {
            const response = await axios.get(`${apiUrl}/vehicle/getsimplevehiclelist`);
            return response.data;
        }
    });

    const calculateFilterExpression = (filterValue, selectedFilterOperation, target) => {
        if (target === 'search' && typeof (filterValue) === 'string') {
            return [this.dataField, 'contains', filterValue];
        }
        return function (data) {
            return (data.Vehicles || []).indexOf(filterValue) !== -1;
        }
    };
            


    return (
        <div>
            <DataGrid
                dataSource={dataSource}
                keyExpr="id"
                showBorders={true}
                columnAutoWidth={true}
                
            >
                <FilterRow visible={true} />

                <HeaderFilter visible={true} />
                <Editing
                    mode="row"
                    allowUpdating={true}
                    allowDeleting={false}
                    selectTextOnEditStart={true}
                    allowAdding={true}
                    onR
                    startEditAction="click"
                />
                <Column dataField="id" allowEditing={false} visible={false} />
                <Column dataField="fullName" caption="Full Names">
                    <RequiredRule />
                </Column>
                <Column dataField="nationalId" caption="National ID" alignment="left" width={100} >
                    <RequiredRule />
                </Column>
                <Column dataField="employeephoneNumber" caption="Phone No" />
                <Column dataField="employeeWorkNo" caption="Work No" />
                <Column dataField="employeestatus" allowEditing={false} ></Column>
                <Column
                    dataField="vehicles"
                    width = {150}
                    caption="Default vehicles"
                    allowSorting={false}
                    editCellComponent={EmployeeVehicleTagBox}
                    cellTemplate={vehicleTemplate}
                    calculateFilterExpression={calculateFilterExpression}
                >
                    <Lookup dataSource={vehicleDataSource} valueExpr="vehicleId" displayExpr="hyoungNo" />
                </Column>
                <Column dataField="siteId" caption="Site" width={150}>
                <Lookup dataSource={siteDataSource} valueExpr="id" displayExpr="name" />
                </Column>
            </DataGrid>
        </div>
    );
};

export default EmployeeGrid;