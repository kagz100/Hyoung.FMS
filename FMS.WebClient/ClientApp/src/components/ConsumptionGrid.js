import React, { useState, useEffect } from 'react';
import EmployeeVehicleTagBox from './UIcomponents/EmployeeVehicleTagBox';
import DataGrid, { Column, Editing, Selection, Paging, FilterRow, Sorting, Toolbar, ColumnChooser, ColumnFixing, Lookup,Item, FilterPanel, LoadPanel, SearchPanel } from 'devextreme-react/data-grid';
import axios from "axios";
import { HeaderFilter } from 'devextreme-react/pivot-grid-field-chooser';
import SelectBox from 'devextreme-react/select-box';
import CheckBox from 'devextreme-react/check-box';
import DateBox from 'devextreme-react/date-box';
import Button from 'devextreme-react/button';
import CustomStore from 'devextreme/data/custom_store';

const apiUrl = "https://localhost:7009/api";


const ConsumptionGrid = () => {
    const [consumptionData, setConsumptionData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false); // New loading state
    const [selectedRows, setSelectedRows] = useState([]);
    const onSelectionChanged = ({ selectedRowKeys }) => {
        setSelectedRows(selectedRowKeys);
    };


    //make sure consumptionData is an array
     

    const [data, setData] = useState([consumptionData]);
    const [changes, setChanges] = useState([]);

    const onEditingChangesChange = (e) => {
        setChanges(e.changes);
    };


    const onRowUpdated = (e) => {
        setData(prevdata => prevdata.map((item) =>
            item.id === e.key ? {
                ...item,
                ...e.data,

            } : item)
        );
    };




    const EmployeeDataSource = new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: async () => {
            const response = await axios.get(`${apiUrl}/employee/GetList`);
            return response.data;
        }


    });

    const ExpectedDataSource = new CustomStore(
        {
            key: 'id',
            load: async () => {
                const response = await axios.get(`${apiUrl}/expectedavg/getlist`);
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


    const createSelectedConsumptionData = async () => {
        // start loading
        setLoading(true);
        try {
            let newGridData = [...consumptionData]; // Copy the current grid data
            // loop through each selected row

            console.log("selectedRows", selectedRows);
            for (let id of selectedRows) {
                // find the corresponding row data
                let index = newGridData.findIndex(data => data.vehicleId === id);
                let rowData = newGridData[index];
                // transform data to be sent to server
                let consumptionDataTransformed = { ...rowData }; // copy the row data
                delete consumptionDataTransformed.defaultEmployees; // remove the original employees
                consumptionDataTransformed.defaultEmployees = rowData.defaultEmployees.map(employee => employee.id); // replace with the id array
                // send POST request
                const response = await axios.post(`${apiUrl}/consumption/create`, consumptionDataTransformed);
                // log response
                console.log("response", response);
                // remove this row from the grid data
                newGridData.splice(index, 1);
            }
            // update the grid data
            setConsumptionData(newGridData);
        } catch (error) {
            console.error("error", error);
        } finally {
            // stop loading
            setLoading(false);
            // clear selection
            setSelectedRows([]);
        }
    };





    const fetchData = async () => {
        if (!selectedDate) {
            return;
        }
        setLoading(true); // Start loading
        const fromdate = selectedDate?.toISOString();
        try {
            const response = await axios.get("https://localhost:7009/api/consumption", {
                params: {
                    from: fromdate,
                },
            });
            setConsumptionData(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (

        <div>
            <LoadPanel visible={loading} />  {/* New LoadPanel */}
            <div className="row">
                <div className="col-8">
                    <DateBox defaultValue={null} type="date"
                        onValueChanged={(e) => setSelectedDate(e.value)} disabled={loading}/>
                </div>
                <div className="col-4">
                    <Button text="Load Data" onClick={fetchData} disabled={loading} />
                </div>

                <div className="col-4">
                </div>

            </div>


            <DataGrid dataSource={consumptionData} showBorders={true}
                keyExpr="vehicleId"
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                rowAlternationEnable={true}
                height={500}
                onSelectionChanged={onSelectionChanged} // handle row selection
            
               

                onRowUpdating={async (e) => {
                    e.cancel = true; //Prevent Grid default request

                    const consumptionDataTransformed = {



                    };//transform data to be sent to server

                    try {
                        await createSelectedConsumptionData(consumptionDataTransformed);
                        e.component.refresh(); //refresh grid
                    }
                    catch (error) {
                        console.error("error", error);
                    }
                }}
             

            >

                <Selection
                    mode="multiple"
                    selectAllMode= "allPages"
                    showCheckBoxesMode="onClick"
                />
                <Paging enabled={false} />

                <FilterRow visible={true} />

                <ColumnChooser enabled={true} />
                <ColumnFixing enabled={true} />
                <Sorting mode="multiple" />


                <HeaderFilter visible={true} />

                <Editing
                    mode="row"
                    allowUpdating={true}
                    useIcons={true}
                    allowAdding={false}
                    allowDeleting={true}
                    selectTextOnEditStart={true}
                    startEditAction="click" />

                <Column dataField="date"
                    width={100}
                    FilterRow={false}
                    fixed={true}
                    dataType="date"
                    caption="Date" />


                <Column dataField="id"
                    visible={false}
                    caption="Vehicle ID" />
                <Column dataField="hyoungNo"
                    fixed={true}
                    Editing =   {false}
                    caption="Hyoung No" />
                <Column caption="Employee Name " dataField="workingEmployeesID" >
                   
              <Lookup dataSource={EmployeeDataSource} displayExpr="name" valueExpr="id" />

                </Column>

                <Column caption="Employee WorkNumber" >

                    <Lookup dataSource={EmployeeDataSource} displayExpr="worknumber" valueExpr="id" />


                </Column>

                <Column dataField="maxSpeed" caption="Max Speed" />
                <Column dataField="avgSpeed" caption="AVG Speed" />
                <Column dataField="totalDistance"
                    calculateCellValue={data => data.totalDistance / 1000}
                    dataType="number"
                    caption="Distance"
                    format={{ type: 'fixedPoint', precision: 1 }}
                />


                <Column dataField="engHours" caption="Engine Ho urs"
                    calculateCellValue={data => data.engHours / 3600}
                    format={{ type: 'fixedPoint', precision: 1 }} />

                <Column dataField="totalFuel" visible={true} caption="Fuel" />

                <Column dataField="workingExpectedAverage" caption="Expected Averaged">
                    <Lookup dataSource={ExpectedDataSource}
                        valueExpr="id"
                        displayExpr="expectedAveragevalue"
                    />
                </Column>
                <Column dataField="fuelEfficiency" caption="Fuel Efficiency" />
                <Column dataField="fuelLost" caption="Fuel Lost" />

                <Column dataField="workingSiteID" caption="Site">
                    <Lookup dataSource={siteDataSource}
                        valueExpr="id"
                        displayExpr="name"
                    />
                </Column>

                <Column dataField="isNightShift" caption="Night Shift" />
                <Column dataField="Comments" caption="Comments" />

                <Toolbar>
                    <Item location="after" widget="dxButton" options={{ text: "Save Selected Data", onClick: createSelectedConsumptionData, disabled: loading }} />
                </Toolbar>
            </DataGrid>
        </div>
    );

};

export default ConsumptionGrid;