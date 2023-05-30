import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Editing, Lookup, FilterRow, HeaderFilter } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import SelectBox from 'devextreme-react/select-box';
import TextArea from 'devextreme-react/text-area';

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
    
            <div>
                <h3>Vehicles Filter </h3>
                <div className="form">

                    <div className="col-md-3">
                        <div className="dx-field-label">Expected Value </div>
                        <div className="dx-field-value ">
                            <SelectBox
                                dataSource={expAVGclassificationDataSource}
                                displayExpr="name"
                                valueExpr="id"
                                placeholder="Select a Expected value"
                            //Modify this    //onValueChanged={(e) => }
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="dx-field-value ">
                            <TextArea height={50}
                                readOnly={true}
                                value
                            />
                        </div>


                    </div>

                    <div className="col-md-3">
                        <div className="dx-field-label">Vehicle Type </div>

                    </div>
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
                <Column dataField="vehicleId">
                      <Lookup dataSource={vehicleDataSource} valueExpr="vehicleId" displayExpr="hyoungNo" />
                </Column>          
                <Column dataField="vehicleManufacturer" caption="Vehicle Manufacturer">
                    <Lookup dataSource={vehicleManufactureDataSource} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="site" caption="Site">
                 <Lookup dataSource={siteDataSource} valueExpr="id" displayExpr="name" />
                </Column>
               
         
        </DataGrid>
    </div>
    );
};
export default ExpectedAvgDatagrid;