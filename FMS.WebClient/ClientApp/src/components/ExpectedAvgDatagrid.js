import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Editing, Lookup, FilterRow, HeaderFilter } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import SelectBox from 'devextreme-react/select-box';

const apiUrl = "https://localhost:7009/api";

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
            insert: async (values) => {
                const response = await axios.post(`${apiUrl}/expectedavg/create`, values);
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
    //const siteDataSource = new CustomStore(
    //    {
    //        key: 'id',
    //        load: async () => {
    //            const response = await axios.get(`${apiUrl}/site/getsitelist`);
    //            return response.data;
    //        }
    //    });
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
                const response = await axios.get(`${apiUrl}/vehiclemanufacture/getlist`);
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

        <div class="row">
            <div class="col">
               <SelectBox
                dataSource={vehicleTypeDataSource}
                displayExpr="name"
                valueExpr="id"
                placeholder="Select a Vehicle Type"
                onValueChanged={(e) => setSelectedVehicleType(e.value)}
                />
              </div>
           <div class="col">
            <div class="row">
                 <label>Expected Value: </label>
                <input type="text" value={expectedValue} onChange={(e) => setExpectedValue(e.target.value)} />
                <button onClick={handleApplyExpectedValue}>Apply Expected Value</button>
            
                </div>
             </div>

        

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
                mode="batch"
                allowUpdating={true}
                allowDeleting={false}
                allowAdding={true}
                 useIcons={true}/>

            <Column dataField="id" caption="ID" width={50} allowEditing={false} />
            <Column dataField="vehicleId" caption="Vehicle">
                <Lookup dataSource={vehicleDataSource} valueExpr="id" displayExpr="hyoungNo" />
            </Column>
            <Column dataField="expectedAverage1" caption="Expected AVG" />
            <Column dataField="expAVGclassificationId" caption="Classification" width={100}>
                <Lookup
                    dataSource={expAVGclassificationDataSource}
                    valueExpr="id" displayExpr="name" />
            </Column>
            <Column dataField="siteId" caption="Site" >
                <Lookup dataSource={siteDataSource}
                    valueExpr="id"
                    displayExpr="name" />
            </Column>
        </DataGrid>
    </div>
    );
};
export default ExpectedAvgDatagrid;