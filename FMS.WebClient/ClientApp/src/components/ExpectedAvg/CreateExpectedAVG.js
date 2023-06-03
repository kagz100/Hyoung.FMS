
import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Editing, Lookup, FilterRow, HeaderFilter } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import SelectBox from 'devextreme-react/select-box';
import TextArea from 'devextreme-react/text-area';
import Button from 'devextreme-react/button';
import { toast, ToastContainer } from 'react-toastify';
import Toast from '../../../../../node_modules/devextreme-react/toast';
import notify from 'devextreme/ui/notify';
import config from '../../../../../node_modules/devextreme/core/config';


const apiUrl = "https://localhost:7009/api";
const CreateExpectedAVG = ({ selectedVehicles, clearVehicles }) => {

    const [toastConfig, setToastConfig] = useState({ isVisible: false, type: 'success', message: '' });

    

//    setToastConfig({ isVisible: false, type: '', message: '' });


const onHiding = () => {
    setToastConfig({ ...toastConfig, isVisible: false });
}


    const saveRecords = async () => {

        try {
            const dataToSend = selectedVehicles.map(vehicle => {
                return {       
                    vehicleId: vehicle.data.vehicleId,
                    classification: vehicle.classification,
                    expectedValue: vehicle.expectedValue,
                    workingSiteId: vehicle.data.workingSiteId
                };
            });
            console.log("data to send", dataToSend);
            const data = Array.isArray(dataToSend) ? dataToSend : [dataToSend];
            const response = await axios({
                method: 'post',
                url: `${apiUrl}/ExpectedAVG/create`,
                data: data,  // send data as an array
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setToastConfig({ isVisible: true, type: 'success', message: "Expected Averaged Created Successfully" });
               // toast.success("Expected Averaged Created Successfully");
                clearVehicles();
            }
            else {
             
                toast.error("Error Occured");
            }
        }
        catch (error) {
            setToastConfig({ isVisible: true, type: 'error', message: error.message });           // console.error(error);
        }
       

    };
    return (
        <div>
        <DataGrid
            dataSource={selectedVehicles.map(vehicle => ({
                ...vehicle.data,
                classification:vehicle.classification,
                expectedValue: vehicle.expectedValue 
            }))}
            showBorders={true}
        >
            <Column dataField="vehicleId" caption="Vehicle ID" allowEditing={false} width={100} />
            <Column dataField="hyoungNo" caption="Hyoung No" />
            <Column dataField="expectedValue" caption="Expected Averaged" alignment="center" />
            <Column dataField="classification" caption="Selected Classification" />
            <Column dataField="workingSiteId" caption="Working Site" />
            </DataGrid>
            <div className="row align-items-end">
                <div className="col">
                    <label className="col-form-label" ></label>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success" onClick={saveRecords} disabled={selectedVehicles.length === 0}>Save</button>
                </div>
            </div>

            <Toast
                visible={toastConfig.isVisible}
                message={toastConfig.message}
                type={toastConfig.type}
                duration={3000}
                position="bottom-center"
                onHiding={onHiding}
                 width={500}
            ></Toast>
            </div>
    );
};

export default CreateExpectedAVG;
