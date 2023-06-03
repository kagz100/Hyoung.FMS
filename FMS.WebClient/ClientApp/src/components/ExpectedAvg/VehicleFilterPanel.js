import Datagrid, { Paging, HeaderFilter, SearchPanel, Editing, FilterRow, Column, Lookup, Sorting,Selection, RequiredRule } from 'devextreme-react/data-grid';

import { Button } from 'devextreme-react';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme/dist/css/dx.light.css';
import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
import TextArea from 'devextreme-react/text-area';
//import { NumberBox } from '../../../../../node_modules/devextreme-react/index';

// { Selection } from '../../../../../node_modules/devextreme-react/tree-list';
//import { TextBox } from '../../../../../node_modules/devextreme-react/index';
//import { Sorting } from '../../../../node_modules/devextreme-react/tree-list';
const apiUrl = "https://localhost:7009/api";



const VehicleFilterPanel = ({ setSelectedVehicles }) => {


    
    const dataSource = new CustomStore({
        key: 'vehicleId',
        load: async () => {
            const response = await axios.get(`${apiUrl}/vehicle/getlist`);
            return response.data;
        },
        update: async (key, values) => {

            console.log('Request data:', { values, vehicleId: key });
            const originalData = await dataSource.byKey(key);
            const updatedData = { ...originalData, ...values, vehicleId: key };

            // const response = await axios.put(`${apiUrl}/vehicle/UpdateVehicle/${key}`, values);
            const response = await axios.put(`${apiUrl}/vehicle/UpdateVehicle/${key}`, updatedData);
            return response.data;
        },
        byKey: async (key) => {
            const response = await axios.get(`${apiUrl}/vehicle/getlist`);
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
                const response = await axios.get(`${apiUrl}/site/GetList`);
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
                const response = await axios.get(`${apiUrl}/VehicleType/getlist`);
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
                const response = await axios.get(`${apiUrl}/VehicleModel/getlist`);
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
                const response = await axios.get(`${apiUrl}/VehicleManufacturer/getlist`);
                return response.data;
            }


        })



    };
    // Load Expected classfication data

    const dataGridRef = useRef(null);

    const getSelectedVehicles = (e) => {
        // get the instance of the DataGrid
        const dataGridInstance = dataGridRef.current.instance;

        // get the visible rows
        const visibleRows = dataGridInstance.getVisibleRows();

        // filter the visible rows for only the ones that are selected
        const selectedVisibleVehicles = visibleRows.filter(row => row.isSelected);

        setSelectedVehicles(selectedVisibleVehicles);
    };



    return (
        <div className="container">
            
            <Datagrid
                ref={dataGridRef}
                dataSource={dataSource}
                showBorders={true}
                onSelectionChanged={getSelectedVehicles}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                rowAlternationEnable={true}

                repaintChangesOnly={true}
               // onSelectionChanged={(e) => setSelectedVehicles(e.selectedRowsData)}
                onSelectionChanged={getSelectedVehicles}
            >

                <Paging enabled={true} />
                <Paging defaultPageSize={50} />
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <Sorting mode="multiple" />
                <Selection mode="multiple"
                showCheckBoxesMode="always"
                />

                <Column dataField="vehicleId" caption="Vehicle ID" allowEditing={false} visible={false} />
                <Column dataField="hyoungNo" caption="Hyoung No" allowEditing={false} width={70} />
                <Column dataField="expectedAveraged" width={150} caption="Expected Averaged" allowEditing={true} alignment="center" width="70" />

                <Column dataField="workingSiteId" caption="Working Site">
                    <Lookup dataSource={workingSiteDataSource} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="averageKmL" caption="is km/l" width={70} />


                <Column dataField="vehicleTypeId"
                    caption="Vehicle Type"
                            >
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




        </div>
    );
};
export default VehicleFilterPanel;