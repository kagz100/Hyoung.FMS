
import VehicleFilterPanel from './ExpectedAvg/VehicleFilterPanel';
import CreateExpectedAVG from './ExpectedAvg/CreateExpectedAVG';
import SelectBox from 'devextreme-react/select-box';
import { NumberBox } from 'devextreme-react/number-box';
import axios from "axios";
import CustomStore from 'devextreme/data/custom_store';
import TextArea from 'devextreme-react/text-area';
//import { Toast } from 'devextreme-react/toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Validator,
    RequiredRule
} from 'devextreme-react/validator';
import Toast from 'devextreme-react/toast';

import 'devextreme/dist/css/dx.light.css';
import React, { useState, useRef, useEffect } from 'react';
import config from '../../../../node_modules/devextreme/core/config';

const apiUrl = "https://localhost:7009/api";


const ExpectedAvgParentComponent = () => {

    const [toastConfig, setToastConfig] = useState({ isVisible: false, type: 'success', message: '' });

    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [numberBoxValue, setNumberBoxValue] = useState(null);
    const [selectedClassificationId, setSelectedClassificationId] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null); //assuming selectedVehicle is set somewhere
    const [textAreaValue, setTextAreaValue] = useState('');
    const [expectedClassificationData, setExpectedClassificationData] = useState([]);
    const [tempSelectedVehicles, setTempSelectedVehicles] = useState([]);



    const onHiding = () => {
        setToastConfig({ ...toastConfig, isVisible: false });
    }
    // Log changes to tempSelectedVehicles
    useEffect(() => {

    }, [tempSelectedVehicles]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${apiUrl}/ExpectedAVGClassification/getlist`);
            setExpectedClassificationData(response.data);
        };

        fetchData();
    }, []);


    const clearVehicles = () => {
        setSelectedVehicles([]);

    };

    const addVehicle = () => {
        if (selectedClassificationId === null || selectedClassificationId === 0|| numberBoxValue === null)
        {
            //toast.error('Please select a classification and provide a value.');
            console.log('Please select a classification and provide a value.');
            setToastConfig({ isVisible: true, type: 'error', message: 'Please select a classification and provide a value.' });        


            return; 
        }

console.log("Add button pressed. Vehicles:", tempSelectedVehicles);
        //adding vehicle to the list
        const newVehicles = tempSelectedVehicles.map(vehicle => ({
            ...vehicle, // keep all existing properties of the vehicle
            classification:selectedClassificationId, // add the value from the select box
            expectedValue: numberBoxValue, // add the value from the number box

        }));

        //check for duplicates

        for (let newVehicle of newVehicles) {
            const isDuplicate = selectedVehicles.some((vehicle) => {
                return (
                    vehicle.data.vehicleId === newVehicle.data.vehicleId &&
                    vehicle.data.workingSiteId === newVehicle.data.workingSiteId &&
                    vehicle.classification === newVehicle.classification
                );
            });

            if (isDuplicate) {
                const duplicateMessage = 'The selected vehicle already exists for the specified site and classification.';
              //  toastRef.current.show(duplicateMessage, 'warning');
                setToastConfig({ isVisible: true, type: 'error', message: duplicateMessage });        

                console.log('Duplicate:', duplicateMessage);
                return;
            }
        }

        setSelectedVehicles([...selectedVehicles, ...newVehicles]);
      // setTempSelectedVehicles([]); // Clear temp selection
    };
    

    return (

        <div>
            <div className="option-Panel">
                <h4>Vehicle Filter Options </h4>
                <div className="row g-3 align-items-center ">

                        <div className="col-auto"><label className="col-form-label">Expected Value </label> </div>
                        <div className="col-auto">
                            <NumberBox 
                            onValueChanged={(e) => setNumberBoxValue(e.value)}                        
                                className="form-control"
                                 width={50}          
                        >
                            <Validator>
                                <RequiredRule message="Enter value" />
                            </Validator>
                        </NumberBox>
                       
                    </div>
                    <div className="col-auto">
                        <SelectBox
                            dataSource={expectedClassificationData}
                            displayExpr="name"
                            valueExpr="id"
                            placeholder="Select a Expected Classification"
                            validationRules={[{ type: 'required', message: 'Please select a classification' }]}
                            onValueChanged={(e) => {
                                const selectedObject = expectedClassificationData.find(item => item.id === e.value);
                                const description = selectedObject ? selectedObject.description : '';
                                setSelectedClassificationId(e.value);
                                setTextAreaValue(description);
                            }} />

                    </div>

                    <div className="col ">
                        <TextArea height={45}
                            readOnly={true}
                            value={textAreaValue}
                        />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" onClick={() => {
                          //  console.log("Add button pressed. Selected vehicle:", selectedVehicle);
                            addVehicle(tempSelectedVehicles)
                        }}>Add</button>

                    </div>

                    <div>
                    </div>
                </div>



            </div>
           
      
              <VehicleFilterPanel
                setSelectedVehicles={setTempSelectedVehicles} // pass setTempSelectedVehicles instead
               
            />
            <div className="row align-items-end  ">
                <div className="col">
                    <label className="col-form-label" >Clear below data</label>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning" onClick={clearVehicles}>Clear</button>
             </div>


            </div>
            <div className="row">
            <CreateExpectedAVG
                selectedVehicles={selectedVehicles}
                clearVehicles={clearVehicles} 
                />

            </div>
        </div>
    );
};



export default ExpectedAvgParentComponent;