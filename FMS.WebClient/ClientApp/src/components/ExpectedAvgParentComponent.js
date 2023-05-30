
import VehicleFilterPanel from './ExpectedAvg/VehicleFilterPanel';
import CreateExpectedAVG from './ExpectedAvg/CreateExpectedAVG';
import SelectBox from 'devextreme-react/select-box';
import { NumberBox } from 'devextreme-react/number-box';
import axios from "axios";
import CustomStore from 'devextreme/data/custom_store';
import TextArea from 'devextreme-react/text-area';

import 'devextreme/dist/css/dx.light.css';
import React, { useState, useRef, useEffect } from 'react';

const apiUrl = "https://localhost:7009/api";


const ExpectedAvgParentComponent = () => {
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [numberBoxValue, setNumberBoxValue] = useState(null);
    const [selectedClassificationId, setSelectedClassificationId] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null); //assuming selectedVehicle is set somewhere
    const [textAreaValue, setTextAreaValue] = useState('');
    const [expectedClassificationData, setExpectedClassificationData] = useState([]);
    const [tempSelectedVehicles, setTempSelectedVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${apiUrl}/ExpectedAVGClassification/getlist`);
            setExpectedClassificationData(response.data);
        };

        fetchData();
    }, []);

    const expectedClassificationDataSource = {
        store: new CustomStore({
            key: 'id',
            loadMode: 'raw',
            load: async () => {
                const response = await axios.get(`${apiUrl}/ExpectedAVGClassification/getlist`);
                return response.data;
            }
        })
    };

    const clearVehicles = () => {
        setSelectedVehicles([]);
    };

    const addVehicle = () => {
        console.log("Add button pressed. Vehicles:", tempSelectedVehicles);
        const newVehicles = tempSelectedVehicles.map(vehicle => ({
            ...vehicle, // keep all existing properties of the vehicle
            classification: selectedClassificationId, // add the value from the select box
            expectedValue: numberBoxValue // add the value from the number box
        }));
        setSelectedVehicles([...selectedVehicles, ...newVehicles]);
        setTempSelectedVehicles([]); // Clear temp selection
    };

    return (
        <div>
            <div className="option-Panel">
                <div className="option">
                    <button className="btn btn-primary" onClick={() => {
                        console.log("Add button pressed. Selected vehicle:", selectedVehicle);
                        addVehicle(selectedVehicle)
                    }}>Add</button>
                    <button className="btn btn-warning" onClick={clearVehicles}>Clear</button>
                </div>
                <div className="option-container">
                    <h4>Vehicle Filter Options </h4>
                    <div className="option">


                        <div className="dx-field-label">Expected Value </div>
                        <div className="dx-field-value">
                            <NumberBox
                                onValueChanged={(e) => setSelectedClassificationId(e.value)} />
                        </div>
                    </div>
                    <div className="option">
                        <SelectBox
                            dataSource={expectedClassificationData}
                            displayExpr="name"
                            valueExpr="id"
                            placeholder="Select a Expected value"
                            onValueChanged={(e) => {
                                const selectedObject = expectedClassificationData.find(item => item.id === e.value);
                                const description = selectedObject ? selectedObject.description : '';
                                setNumberBoxValue(e.value);
                                setTextAreaValue(description);
                            }} />

                    </div>
                    <div className="dx-field-value ">
                        <TextArea height={50}
                            readOnly={true}
                            value={textAreaValue}
                        />
                    </div>


                    <div>
                    </div>
                </div>



            </div>
           
      {/*    setSelectedVehicles={() => setSelectedVehicles}*/}
         {/*    setSelectedClassificationId={() => setSelectedClassificationId}*/}
         {/*    setNumberBoxValue={() => setNumberBoxValue}*/}
         {/*    setSelectedVehicles={setSelectedVehicles}*/}
          {/*    addVehicle={addVehicle}*/}
       {/*    setSelectedClassificationId={setSelectedClassificationId}*/}
         {/*    setNumberBoxValue={setNumberBoxValue}*/}

           {/*/>*/}
               <VehicleFilterPanel
                setSelectedVehicles={setTempSelectedVehicles} // pass setTempSelectedVehicles instead
                setSelectedClassificationId={() => setSelectedClassificationId}
                setNumberBoxValue={() => setNumberBoxValue}
            />
            <CreateExpectedAVG
                selectedVehicles={selectedVehicles}
                clearVehicles={clearVehicles}  // pass down the clearVehicles function as a prop
            />

        </div>
    );
};



export default ExpectedAvgParentComponent;