import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Editing, Lookup, FilterRow, HeaderFilter } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import SelectBox from 'devextreme-react/select-box';
import TextArea from 'devextreme-react/text-area';

const apiUrl = process.env.REACT_APP_FMS_API_URL;

const ExpectedAvgDatagrid = () => {


    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    const [selectedSite, setSelectedSite] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [expectedValue, setExpectedValue] = useState('');
    const [selectVehicleManufacture,setVehicleManufacture] = useState('');

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const dataSourceInit = new CustomStore({
            key: 'id',
            load: async () => {
                const response = await axios.get(`${apiUrl}/expectedavg/getlist`);
                return response.data;
            },
        
            update: async (key, values) => {
                const originalItem = await dataSource.byKey(key);
                const updatedItem = { ...originalItem, ...values, id: key };
                const response = await axios.put(`${apiUrl}/expectedavg/update/${key}`, updatedItem);
                return response.data;
            },
            byKey: async (key) => {
                const response = await axios.get(`${apiUrl}/expectedavg/getlist`);
                return response.data.find(item => item.id === key);
            }
        });

        setDataSource(dataSourceInit);
    }, []);
        const onRowInserted = (e) => {
            e.component.navigateToRow(e.key);
        };



    const handleApplyExpectedValue = () => {

        //apply the expected value to all filtered rows int the expectedavgdatagrid 
        const filteredData = filteredData(dataSource);
        filteredData.forEach(row => {
            row.expextedValue1 = expectedValue;

        });

        setDataSource(...dataSource);
    }



    const expAVGclassificationDataSource = new CustomStore(
        {
            key: 'id',
            load: async () => {
                const response = await axios.get(`${apiUrl}/ExpectedAVGClassification/getlist`);
                return response.data;
            }
        });

    const vehicleDataSource = new CustomStore(
        {
            key: 'id',
            load: async () => {
                const response = await axios.get(`${apiUrl}/vehicle/getlist`);
                return response.data;
            }
        });

    const siteDataSource = new CustomStore(
        { 
            key: 'id', 
            load: async () => {
                const response = await axios.get(`${apiUrl}/site/getlist`);
                return response.data;
            }
        });
    const vehicleManufactureDataSource = new CustomStore(
        {
            key: 'id',
            load: async () => {
                const response = await axios.get(`${apiUrl}/vehiclemanufacturer/getlist`);
                return response.data;
            }
        });
    const vehicleModelDataSource = new CustomStore(
        {
            key: 'id',
            load: async () => {
                const response = await axios.get(`${apiUrl}/vehiclemodel/getlist`);
                return response.data;
            }
        });
    const vehicleTypeDataSource = new CustomStore(
        {
            key: 'id',
            load: async () => {
                const response = await axios.get(`${apiUrl}/vehicletype/getlist`);
                return response.data;
            }
        });

    return (

        <div className="row">      
        <DataGrid
            dataSource={dataSource}
            keyExpr="id"
            showBorders={true}
            onRowInserted={onRowInserted}
            columnAutoWidth={true}

        >
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />

            <Editing
                mode="row"
                allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={false}
                 useIcons={true}/>

            <Column dataField="id" caption="ID" width={50} allowEditing={false} />
                <Column dataField="hyoungNo" caption="Hyoung No" allowEditing={false} />
                <Column dataField="expectedAverageClassificationName" caption="Expected Average Classification" allowEditing={false} />
                <Column dataField="vehicleManufacturer" caption="Vehicle Manufacturer" allowEditing={false} />
                <Column dataField="vehicleType" caption="Vehicle type" allowEditing={false} />
                <Column dataField="site" caption="Site" allowEditing={false} />
                <Column dataField="expectedAveragevalue" caption="expectedAveragevalue" allowEditing={true} alignment="center" />

               
         
        </DataGrid>
    </div>
    );
};
export default ExpectedAvgDatagrid;