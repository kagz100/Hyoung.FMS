import React, { useState, useEffect } from 'react';
import EmployeeVehicleTagBox from '../../components/Employee/employeevehicleTagbox';
import DataGrid, { Column , Paging, FilterRow, Sorting, ColumnChooser, ColumnFixing, Editing ,Popup,Lookup } from 'devextreme-react/data-grid';
import axios from "axios";
import CustomStore from 'devextreme/data/custom_store';
import { HeaderFilter } from 'devextreme-react/pivot-grid-field-chooser';
import 'devextreme-react/text-area';
import sampleData from '../../components/sampleconsumptiondata';
//import ConsumptionEditPopUp from './ConsumptionEditPopUp';
import DateBox from 'devextreme-react/date-box';
import Button from 'devextreme-react/button';
import LoadPanel from 'devextreme-react/load-panel';
import EditDetails from '../../components/Consumptions/EditDetails';
const apiUrl = process.env.REACT_APP_FMS_API_URL;


const Consumptiongrid = () => {
    const [consumptionData, setConsumptionData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false); // New loading state
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [currentSiteId, setCurrentSiteId] = useState(null);   
    const[activeTab, setActiveTab] = useState(0);
    const [selectedData, setSelectedData] = useState(null);
    const [detailData, setDetailData] = useState(null); // Consider initializing state




        const employeeDataSource = new CustomStore({
         
            key: 'id',
            loadMode: 'raw',
            load: async () => {   
                const response = await axios.get(`${apiUrl}/employee/getlist`);
                return response.data;
            }
        });
    
        const siteDataSource = new CustomStore({

            key: 'id',
            loadMode: 'raw',
            load: async () => {
                const response = await axios.get(`${apiUrl}/site/getlist`);
                return response.data;
            }
        });
    

    const onEditingStart = (e) => {
       const editData = e.data; //Capture the Entire Row Data
       setSelectedData(editData);
        //call the expectedavg/getlistbyvehiclebysite api to get the expected average value for the selected vehicle and site
       // loadExpectedAveragedDataBySiteID(vehicleId, siteId);
       // loadEmployeeData(siteId);
       // loadHistoryData(vehicleId, startdate);
    };

 const loadEmployeeData = async (siteId) => {

    setCurrentSiteId(siteId);


    };


    const loadExpectedAveragedData = new CustomStore({
        key : 'id', 
        loadMode: 'raw',
        load: async () => {
            const response = await axios.get(`${apiUrl}/expectedavg/getlist`);
            return response.data;
        }

    });


     
    const [historyData, setHistoryData] = useState([]);

    const loadHistoryData = async (vehicleId, startdate) => {

        try {
            const response = await axios.get(`${apiUrl}/consumption/gethistoryconsumption`,
                {
                    params: { vehicleId: vehicleId }
                });
            setHistoryData(response.data);
          
        }
        catch (error) 
        {
            console.error("Error Fetching History Data :", error);

        }
    };


    const fetchData = async () => {

        if (!selectedDate) {

            return;

        }

        setLoading(true); // Start loading

          setConsumptionData(sampleData);

          setLoading(false); // End loading



    };



    useEffect(() => {

        fetchData();

    }, [selectedDate]);



    const onEditingffStart = async (e) => {

        console.log( 'e'+e);
        const detailData = await fetchData(e.key); // Ensure fetchData is defined to accept a key
        setDetailData(detailData);
        // Removed the redundant fetchData call
    };



    return (

        <div>
            <LoadPanel visible={loading} />  {/* New LoadPanel */}
            <div className="row">
                <div className="col-8">
                    <DateBox defaultValue={null} type="date"
                        onValueChanged={(e) => setSelectedDate(e.value)} disabled={loading} />
                </div>
                <div className="col-4">
                    <Button text="Load Data" onClick={fetchData} disabled={loading} />
                </div>
            </div>


            <DataGrid id='consumption'   dataSource={consumptionData} showBorders={true}
                keyExpr="vehicleId"
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                onEditingStart={onEditingStart}
                rowAlternationEnable={true}
                height={700}

            >
                <Paging defaultPageIndex={100} />

                <FilterRow visible={true} />

                <ColumnChooser enabled={true} />
                <ColumnFixing enabled={true} />
                <Sorting mode="multiple" />


                <HeaderFilter visible={true} />
                 
                 <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    useIcons={true}
                   // onEditingStart = {onEditclick}
                 >
                    <Popup title="Consumption Info"
                     showTitle={true}
                     width={1400}
                      height='auto'
                      contentRender= {() =><EditDetails editData={selectedData} /> }
                             />

            
                </Editing>


                <Column dataField="date"
                    width={100}
                    FilterRow={false}
                    fixed={true}
                    dataType="date"
                    caption="Date" />


                <Column dataField="vehicleId" visible={false} caption="Vehicle ID" />
                <Column dataField="hyoungNo" fixed={true} caption="Hyoung No" />
                <Column dataField='defaultEmployees'  caption="Employee Details" width={200}allowSorting={false} >                  
                        <Lookup dataSource={employeeDataSource} valueExpr="id" displayExpr="fullName" />
                </Column>
                <Column dataField="maxSpeed" caption="Max Speed" />
                <Column dataField="avgSpeed" caption="AVG Speed" />
                <Column dataField="totalDistance"

                    dataType="number"
                    caption="Distance"
                    cellRender={({ value }) => (value / 1000).toFixed(2)

                    }
                />
                <Column dataField="engHours"
                    caption="Engine Hours"
                    format={{ type: 'fixedPoint', precision: 1 }}
                    cellRender={({ value }) => (value / 3600).toFixed(2)}
                />
                <Column dataField="totalFuel"
                    visible={true}
                    caption="Fuel" />
                <Column dataField="expectedAveraged" caption="Expected Averaged" >
                {/* <Lookup dataSource={expectedAveragedDataSource} valueExpr="id" displayExpr="expectedAveragevalue" /> */}
                </Column>
                <Column dataField="fuelEfficiency" caption="Fuel Efficiency" />
                <Column dataField="fuelLost" caption="Fuel Lost" />

                <Column dataField="siteId" caption="Site" >
                    <Lookup dataSource={siteDataSource} valueExpr="id" displayExpr="name" />
                </Column>

                <Column dataField="isNightShift" caption="Night Shift" />
                <Column dataField="Comments" caption="Comments" />
                <Column dataField="isAverageKm" caption="Is Km/l" />
           
            </DataGrid>




        </div>
    );

};

export default Consumptiongrid;