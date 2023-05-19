import Datagrid, {Paging,HeaderFilter,SearchPanel,Editing,FilterRow,Column,Lookup, RequiredRule} from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import { TextBox, Button } from 'devextreme-react';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme/dist/css/dx.light.css';
import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
import AddVehicleModel from './AddVehicleModel';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

const apiUrl = "https://localhost:7009/api";




const VehicleDataGrid = () => {
    const dataSource = new CustomStore({
        key: 'vehicleId',
        load: async () => {
            const response = await axios.get(`${apiUrl}/vehicle/getvehiclelist`);
            return response.data;
        },
        update: async (key, values) => {
                 
            console.log('Request data:', { values, vehicleId: key });
            const originalData = await dataSource.byKey(key);
            const updatedData = { ...originalData, ...values ,vehicleId:key };

            // const response = await axios.put(`${apiUrl}/vehicle/UpdateVehicle/${key}`, values);
            const response = await axios.put(`${apiUrl}/vehicle/UpdateVehicle/${key}`, updatedData);
           return response.data;
        },
        byKey: async (key) => {
            const response = await axios.get(`${apiUrl}/vehicle/getvehiclelist`);
            const originalData = response.data.find((item) => item.vehicleId === key);
            return originalData;
        }

    });
  //Add data source for lookup columns

    // Fetch working site data
    const workingSiteDataSource = {
        store: new CustomStore({

            key: 'id',
            loadMode: 'raw',
            load: async () => {
                const response = await axios.get(`${apiUrl}/site/GetSiteList`);
                return response.data;
            }
        })
    };

    // Fetch employee data
    const employeeDataSource = {
        store: new CustomStore({

            key: 'id',
            loadMode: 'raw',
            load: async () => {
                const response = await axios.get(`${apiUrl}/employee/getemployeelist`);
                return response.data;
            }
        })
    };

    // Fetch vehicle type data
    const vehicleTypeDataSource = {
        store: new CustomStore({

            key: 'id',
            loadMode: 'raw',
            load: async () => {
                const response = await axios.get(`${apiUrl}/VehicleType/GetVehicleType`);
                                 return response.data;
            }
        })
    };
    // Fetch vehicle model data
    const vehicleModelDataSource = {
        store: new CustomStore({

            key: 'id',
            loadMode: 'raw',
            load: async () => {
                const response = await axios.get(`${apiUrl}/VehicleModel/GetVehicleModel`);
                return response.data;
            }
        })
    };
    // Fetch vehicle Manufacturer data based 
        const vehicleManufacturers = {
        store: new CustomStore({
            key: 'id',
            loadMode: 'raw',
            load: async () => {
                const response = await axios.get(`${apiUrl}/VehicleManufacturer/GetVehicleManufacturer`);
                return response.data;
            }
      
          
          })
    };
// Load vehicle manufacturers data


    return (
        <div className="container">
        <div>
            <h1>Vehicles</h1>
        </div>
            <Datagrid
                dataSource={dataSource}
                showBorders={true}

                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                rowAlternationEnable={true}
                repaintChangesOnly={true}>
                <Paging enabled={false} />

                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <Editing
                    mode="batch"
                    allowUpdating={true}
                    allowAdding={false}
                    allowDeleting={false}
                    selectTextOnEditStart={true}
                    startEditAction="click" />

                <Column dataField="vehicleId" caption="Vehicle ID" allowEditing={false} />
                <Column dataField="hyoungNo" caption="Hyoung No" allowEditing={false} />
                <Column dataField="expectedAveraged" caption="Expected Averaged" allowEditing={true} alignment="center" width="70" />

                <Column dataField="workingSiteId" caption="Working Site">
                    <Lookup dataSource={workingSiteDataSource} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="averageKmL" caption="Vehicle using km/l" />


                <Column dataField="defaultEmployeeId" caption="Default Employee">
                    <Lookup dataSource={employeeDataSource} valueExpr="id" displayExpr="fullName" />
                </Column>

                <Column dataField="vehicleTypeId" caption="Vehicle Type">
                    <Lookup
                        dataSource={vehicleTypeDataSource}
                        valueExpr="id"
                        displayExpr="name" />
                </Column>

                <Column dataField="vehicleManufacturerId" caption="Vehicle Manufacturer">
                    <Lookup
                        dataSource={vehicleManufacturers}
                        valueExpr="id"
                        displayExpr="name"
                    />
                </Column>
                <Column dataField="vehicleModelId" caption="Vehicle Model">
                   
                    <Lookup dataSource={vehicleModelDataSource}
                        valueExpr="id"
                        displayExpr="name" />
                 
                </Column>

                                   
                       </Datagrid>
                
            />


        </div>
    );
};
export default VehicleDataGrid;