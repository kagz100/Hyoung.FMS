import React, { useState,useEffect } from 'react';
import DataGrid, {FilterRow, HeaderFilter, SearchPanel, Column,  Editing, Paging,  Lookup, RequiredRule} from 'devextreme-react/data-grid';
import axios from 'axios';
import CustomStore from 'devextreme/data/custom_store';
import 'devextreme/dist/css/dx.light.css';


const apiUrl = process.env.REACT_APP_FMS_API_URL;

const VehicleModelDataGrid = () =>  {
    const [vehicleModels, setVehicleModels] = useState([]);
    const [vehicleManufacturers, setVehicleManufacturers] = useState([]);

    useEffect(() => {
        axios.get(`${apiUrl}/VehicleManufacturer/getlist`)
            .then(response => setVehicleManufacturers(response.data))
            .catch(error => console.error('Error fetching manufacturers', error));
    }, []);
      
    const vehicleModelDataSource = new CustomStore({
        key: 'id',
        load:async () => axios.get(`${apiUrl}/VehicleModel/getlist`).then(response => response.data),
        insert: async (values) => axios.post(`${apiUrl}/VehicleModel/CreateVehicleModel`, values),
        update: (key, values) => axios.put(`${apiUrl}/VehicleModel/UpdateVehicleModel/${key}`, values),
        remove: (key) => axios.delete(`${apiUrl}/VehicleModel/DeleteVehicleModel/${key}`)
    });

    return (
        <div className="container">
        <h1>Vehicle Models</h1>
        <DataGrid
            dataSource={vehicleModelDataSource}
            
            showBorders={true}
            repaintChangesOnly={true}
            onRowUpdated={e => setVehicleModels([...vehicleModels])}
            onRowInserted={e => setVehicleModels([...vehicleModels, e.data])}
            onRowRemoved={e => setVehicleModels(vehicleModels.filter(model => model.id !== e.data.id))}

        >
              <Paging enabled={true} pageSize={50} />
              <HeaderFilter visible={true} />
              <FilterRow visible={true} />

                <SearchPanel visible={true} highlightCaseSensitive={true} />

              <Editing mode="row" allowUpdating={true} allowDeleting={true} allowAdding={true} />
              <Column dataField="name" caption="Model Name">
                    <RequiredRule />
                </Column>
                
                <Column dataField="manufacturerId" caption="Manufacturer">
                    <Lookup dataSource={vehicleManufacturers} valueExpr="id" displayExpr="name" />
                    <RequiredRule />
                </Column>

            </DataGrid>
        </div>
    );
};

export default VehicleModelDataGrid;