import React, { useEffect, useState } from "react";
import axios from "axios";

import Form, {
    ButtonItem,
    GroupItem,
    SimpleItem,
    Item,
    Label,
    CompareRule,
    EmailRule,
    PatternRule,
    RangeRule,
    RequiredRule,
    StringLengthRule,
    AsyncRule,
    CustomRule,
    FormTypes,
  } from 'devextreme-react/form';
  import { Lookup } from "devextreme-react";
import CustomStore from 'devextreme/data/custom_store';
import { FormItem} from 'devextreme-react/form';
const apiUrl = process.env.REACT_APP_FMS_API_URL;



const FormDetails = (editData ) => {

    console.log("SiteID", editData.editData.siteId);

    const [expectedAveragedDataSource, setExpectedAveragedDataSource] = useState([]);
    const[employeeData, setEmployeeData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [defaultEmployee, setDefaultEmployee] = useState(null);



    const loadDefaultEmployee = async (vehicleId) => {

        console.log("Vehicle ID", vehicleId);
        try{
            const response = await axios.get(`${apiUrl}/vehicle/getvehiclebyid`, {
                params: { id: vehicleId }
            });
            console.log("Default Employee", response.data.defaultEmployee.fullName);

            setDefaultEmployee(response.data.defaultEmployee.fullName);
            
        } catch (error)
        {
            console.error("Error Fetching Default Employee", error);
        }
    };

    const loadExpectedAveragedDataBySiteID = async (vehicleId, siteId) => {
        try{
            const response = await axios.get(`${apiUrl}/expectedavg/getlistbyvehiclebysite`, 
            {
                params: { vehicleId:editData.editData.vehicleId, siteId: editData.editData.siteId }
            });
            setExpectedAveragedDataSource(response.data);
            return response.data;
        } catch (error) 
        {
            console.error("Error Fetching Expected Average :", error);
        }
    };
    const enableOptions = { readOnly: true };

 const onValueChange = (e) => {

 }

 const getemployeeData = async (siteId) => {
    try{
        const response = await axios.get(`${apiUrl}/employee/getemployeebysiteid`, {
            params: { siteId: siteId }
        });
        const modifiedata = response.data.map(emp => ({
            ...emp,
            displayString: `${emp.fullName}: ${emp.vehicles.slice(0, 2).map(v => v.hyoungNo).join(", ")
            }`
        }));
        setEmployeeData(modifiedata);
    } catch (error)
    {
        console.error("Error Fetching Employee Data", error);
    }
};

const OnEmployeeChange = async (e) => {
    const selectededEmployeeId = e.value;
    const selectedEmployee = employeeData.find(emp => emp.id === selectededEmployeeId);
    if(selectedEmployee)
    {
        setSelectedEmployee(selectedEmployee);
    }
};

useEffect(() => {
    if(editData.editData.siteId)
    {
        getemployeeData(editData.editData.siteId);
        loadDefaultEmployee(editData.editData.vehicleId);
    }
},[editData.editData.siteId , editData.editData.vehicleId]);



        const commentEditorOptions = { height: 100 };
        const employeeEditorOptions = { dataSource: employeeData, valueExpr: "id", displayExpr: "displayString", defaultValue :defaultEmployee ,onValueChanged: OnEmployeeChange};


    return (

<Form
    title={`Edit ${editData.editData.hyoungNo}`}
 formData={editData.editData} >
<GroupItem colCount={2} >
<GroupItem caption='Employee Details' >
    <SimpleItem dataField="defaultEmployees" caption='Default Employee'  editorType="dxSelectBox"  editorOptions={employeeEditorOptions} > 
    </SimpleItem>

    {/** Employee value change**/}
    <Item dataField="employeeWorkNo" caption='Work Number' editorOptions={{readOnly:true,value: selectedEmployee?.employeeWorkNo }} >
</Item>   
    <Item dataField="employeephoneNumber" caption='Phone Number' editorOptions={{readOnly:true,value: selectedEmployee?.employeephoneNumber  }} />
</GroupItem>
<Item itemType="group" caption='Operation Details'  >
    <Item dataField="isNightShift" caption='Is Night Shift' />
    <Item dataField="isAverageKm" caption='Is Km/l' />
    <Item dataField="comments" caption='Comments' editorType='dxTextArea' colSpan={2} editorOptions={{commentEditorOptions}} />

</Item>
<Item itemType="group" caption='Vehicle Telemetry Details' >
    <Item dataField="totalDistance" caption='Distance'  editorType="dxNumberBox" editorOptions={{
            format: "#0.## km",
            value: editData.editData.totalDistance / 1000,
            placeholder: "km"
    }}
            />
    <Item dataField="engHours" caption='Engine Hours'  editorType="dxNumberBox" editorOptions={{
            format: "#0.## hrs",
            value: editData.editData.engHours / 3600,
            placeholder: "hrs"
    }}/>
    <Item dataField="maxSpeed" caption='Max Speed' editorType="dxNumberBox" 
    editorOptions={{
        format: "#0.## km/h",
        placeholder: "km/h"
}} />
    <Item dataField="avgSpeed" caption='Avg Speed' editorType="dxNumberBox"editorOptions={{
            format: "#0.## km/h",
            placeholder: "km/h"
    }}/>
</Item>
<Item itemType="group" caption='Fuel Details'>

    <Item dataField="totalFuel" caption='Total Fuel used' editorType="dxNumberBox"editorOptions={{
            format: "#0.## liters",
            placeholder: "liters"
    }} />
    <Item dataField="expectedAveraged" caption='Expected Averaged'  >
        <Lookup dataSource={expectedAveragedDataSource} valueExpr="id" displayExpr="expectedAveraged" />
    </Item>
    <Item dataField="fuelEfficiency" caption='Fuel Efficiency' editorType="dxNumberBox" />
    <Item dataField="fuelLost" caption='Fuel Lost' editorOptions={{ readOnly: true }}  />

</Item>

</GroupItem>
</Form>
    );
    };
export default FormDetails;