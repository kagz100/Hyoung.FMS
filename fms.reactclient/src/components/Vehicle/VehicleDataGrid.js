import Datagrid, { Paging, HeaderFilter, SearchPanel, Editing, FilterRow, Column, Lookup, Sorting, RequiredRule } from 'devextreme-react/data-grid';
//import SelectBox from 'devextreme-react/select-box';
//import { TextBox, Button } from 'devextreme-react';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme/dist/css/dx.light.css';
import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
//import AddVehicleModel from './AddVehicleModel';
//import DataSource from 'devextreme/data/data_source';
//import ArrayStore from 'devextreme/data/array_store';
//import VehicleTypeUIComponent from '../VehicleType/VehicleTypeUIComponent';
//import { Sorting } from '../../../../node_modules/devextreme-react/tree-list';
const apiUrl = process.env.REACT_APP_FMS_API_URL;




const VehicleDataGrid = () => {

    const [expectedAVGData, setExpectedAVGData] = useState([]);
    const [editingVehicleId, setEditingVehicleId] = useState(null);
    const [editingSiteId, setEditingSiteId] = useState(null);
    const [useFilteredDataSource, setUseFilteredDataSource] = useState(false);
    const [filteredVehicleModels, setFilteredVehicleModels] = useState([]);
    const [selectedManufacturerId, setSelectedManufacturerId] = useState(null);
    const [manufacturers, setManufacturers] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);
    const [expectedAVG, setExpectedAVG] = useState([]);
    const [site, setSite] = useState([]);

    const dataSource = new CustomStore({
        key: 'vehicleId',
        load: async () => {
            const response = await axios.get(`${apiUrl}/vehicle/getlist`);
           // console.log('Response data:', response.data);
            return response.data;
        },
        update: async (key, values) => {

            console.log('Request data:', { values, vehicleId: key });
            const originalData = await dataSource.byKey(key);
            //const updatevalues = { ...values, vehicleId: key };
           
            const updatedData = { ...originalData, ...values, vehicleId: key };
            console.log("UPdated values",updatedData);

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
                const response = await axios.get(`${apiUrl}/site/getlist`);
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
                const response = await axios.get(`${apiUrl}/employee/getlist`);
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
  
    


      const onEditorPreparing = (e) => {
        if(e.parentType === "dataRow")
        {
            //Disable defaultExpectedAverageID editor if working Site is not set 
            if(e.dataField === "defaultExpectedAverageId")
            {
                const isSiteNotSet = e.row.data.workingSiteId === undefined || e.row.data.workingSiteId === null;
                e.editorOptions.disabled = isSiteNotSet;
            }

            //disable vehicleModelId editor if vehicleManufacturerId is not set
            if(e.dataField === "vehicleModelId")
            {
                const isManufacturerNotSet = e.row.data.vehicleManufacturerId === undefined || e.row.data.vehicleManufacturerId === null;
                e.editorOptions.disabled = isManufacturerNotSet;
            }


        }
    };
const onManufacturerValueChanged =  (e) => {
    console.log("Selected Manufacturer event", e);

    if (e.value) {
        console.log("Selected Manufacturer ID", e.value);
       // const models = await fetchFilteredVehicleModels(e.value);
       // setFilteredVehicleModels(models);
       setSelectedManufacturerId(e.value);
    } else {
        setFilteredVehicleModels([]);
       setSelectedManufacturerId(null);
    }
};


const getFilteredVehicleModelstest = (options) => ({
    store: vehicleModels,
    filter: options.data ? ["vehicleManufacturerId", "=", options.data.vehicleManufacturerId] : null,
}); 

const loadExpectedAVGData = new CustomStore({
    key: "id",
    loadMode: "raw",
    load: async () => {
        const response = await axios.get(`${apiUrl}/expectedavg/getlist`);
        return response.data;
    }
});

const fetchFilteredExpectedAVGData = async (vehicleId, siteId) => {
    try {
        const response = await axios.get(`${apiUrl}/expectedavg/getlistbyvehiclebysite`, {
            params: { vehicleId, siteId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching expected average data", error);
        return [];
    }
};

const expectedAVGDatasource = new CustomStore({
    key: "id",
    loadMode: "raw",
    load: () => {
      //  console.log("Loading expected AVG data vehicle and editing site:", editingVehicleId, editingSiteId);
        if(editingVehicleId === null || editingSiteId === null) {
            console.log("Returning empty array");
            return [];
        }
        return fetchFilteredExpectedAVGData(editingVehicleId, editingSiteId);
    }
});

const onEditingStart = (e) => {
    setEditingVehicleId(e.data.vehicleId);
    setEditingSiteId(e.data.workingSiteId);
    setSelectedManufacturerId(e.data.vehicleManufacturerId);


if(e.data.vehicleManufacturerId)
{
   // fetchFilteredVehicleModels(e.data.vehicleManufacturerId).then(setFilteredVehicleModels);
}

    setUseFilteredDataSource(true);
    expectedAVGDatasource.load();
};
const onRowUpdated = () => {
    setUseFilteredDataSource(false);
    setSelectedManufacturerId(null);
};
const onEditCanceled = () => {
    setUseFilteredDataSource(false);
    setSelectedManufacturerId(null);
};
const onEditingEnd = () => {
    setEditingVehicleId(null);
    setEditingSiteId(null);
    setUseFilteredDataSource(false);
    // No need to reload loadExpectedAVGData as it's already loaded with all data
};

const onSiteValueChanged = async (e) => {

    console.log("Selected Site event", e);
    if(editingVehicleId !== null) {
        console.log("Editing Vehicle ID:", editingVehicleId);
        const filterData =  await fetchFilteredExpectedAVGData(editingVehicleId, e.value);
        // Update the expectedAVGData state to refresh the Lookup
        console.log("Filtered Expected AVG Data:", filterData);
        setExpectedAVGData(filterData);
        setEditingSiteId(e.value);
        setUseFilteredDataSource(true);

    } else{
        console.log("Resetting Expected AVG Data");
        // Reset the Lookup data when not editing or if the vehicleId is null
        setExpectedAVGData([]);
        setEditingSiteId(null);
        setUseFilteredDataSource(false);
    }
};
        


useEffect(() => {
    const fetchdata = async () => {
        const[manufacturersResponse, vehicleModelsResponse ,expectedAVGResponce,siteResponse ] = await Promise.all([
            axios.get(`${apiUrl}/VehicleManufacturer/getlist`),
            axios.get(`${apiUrl}/VehicleModel/getlist`),
            axios.get(`${apiUrl}/expectedavg/getlist`),
            axios.get(`${apiUrl}/site/getlist`)
        ]);

        setManufacturers(manufacturersResponse.data);
        setVehicleModels(vehicleModelsResponse.data);
        setExpectedAVG(expectedAVGResponce.data);
        setSite(siteResponse.data);
    };


    fetchdata();
},[]);

const getFilteredVehicleModels = (options) => {
    console.log("Options.data:", options.data);
    return{
    store: vehicleModels,
    filter: options.data ?
     ["manufacturerId", "=", options.data.vehicleManufacturerId] : null
    }
};

function setManufacturersCellValue (rowData,value){

    console.log("Row Data:", rowData);
    console.log("Value:", value);

    rowData.vehicleModelId =null;
    this.defaultSetCellValue(rowData, value);
};

    return (
        <div className="container">
            <div>
                <h1>Vehicles</h1>
            </div>
            <Datagrid
                dataSource={dataSource}
                showBorders={true}
                onEditorPreparing={onEditorPreparing}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                rowAlternationEnable={true}
                onEditingStart={onEditingStart}
                onRowUpdated={onRowUpdated}
                onEditCanceled={onEditCanceled}            
                repaintChangesOnly={true}>
                <Paging enabled={false} />

                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <Sorting mode="multiple" />
                <Editing
                    mode="row"
                    allowUpdating={true}
                    allowAdding={false}
                    allowDeleting={false}
                    selectTextOnEditStart={true}
                    startEditAction="dblClick"
                   
                    />
               
                <Column dataField="vehicleId" caption="Vehicle ID" allowEditing={false} visible={false}  defaultSortOrder="asc"/>
                <Column dataField="hyoungNo" caption="Hyoung No" allowEditing={false} width={70} />
                <Column dataField="defaultExpectedAverageId" width={200} caption="Default Expected AVG" allowEditing={true} alignment="center">
             
                     <Lookup
                          dataSource={useFilteredDataSource ? expectedAVGDatasource : loadExpectedAVGData}
                            valueExpr="id"
                            displayExpr="combinedExpectedAverage"
                                                        
                            />
                
               </Column>
                <Column dataField="workingSiteId" caption="Working Site">
                    <Lookup 
                    dataSource={workingSiteDataSource} 
                    valueExpr="id"
                     displayExpr="name" 
                     valueChanged = {onSiteValueChanged}
                     
                     />
                </Column>
                <Column dataField="averageKmL" caption="is km/l" width={70} />


                <Column dataField="defaultEmployeeId" caption="Default Employee" visible={false}>
                    <Lookup
                    dataSource={employeeDataSource} 
                    valueExpr="id" 
                    displayExpr="fullName" 
                   
                    />
                </Column>

                <Column dataField="vehicleTypeId"
                    caption="Vehicle Type"
                // editCellComponent = {VehicleTypeUIComponent}
                >
                    <Lookup
                        dataSource={vehicleTypeDataSource}
                        valueExpr="id"
                        displayExpr="name" />
                </Column>

                <Column dataField="vehicleManufacturerId" 
                caption="Vehicle Manufacturer"    
                setCellValue = {setManufacturersCellValue}   
                onValueChanged = {onManufacturerValueChanged}  
                >
                    <Lookup
                        dataSource={manufacturers}
                        valueExpr="id"
                        displayExpr="name"
                   
                    />
                </Column>
                <Column dataField="vehicleModelId" caption="Vehicle Model">

                    <Lookup
                       //dataSource={selectedManufacturerId ? filteredVehicleModels : vehicleModelDataSource}
                        dataSource ={getFilteredVehicleModels}
                        valueExpr="id"
                        displayExpr="name"
                    />
                </Column>
                 


            </Datagrid>




        </div>
    );
};
export default VehicleDataGrid;