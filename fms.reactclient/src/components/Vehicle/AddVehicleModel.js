import React, { useState } from 'react';
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';

import { TextBox, Button } from 'devextreme-react';
import axios from 'axios';
import {
    Validator,
    RequiredRule
} from 'devextreme-react/validator';

const AddVehicleModel = ({
    addVehicleModelVisible,
    setAddVehicleModelVisible,
    newVehicleModelName,
    setNewVehicleModelName,
    saveNewVehicleModel,
}) => {
    return (
        <Popup
            visible={addVehicleModelVisible}
            onHiding={() => setAddVehicleModelVisible(false)}
            title="Add Vehicle Model"
            width={300}
            height={250}
            hideOnOutsideClick={true}
            showTitle={true}
            dragEnabled={false}
        >
            <Position at="bottom" my="center" collision="fit" />
            <div className="dx-field">
                <div className="dx-field-label">Name</div>
                <div className="dx-field-value">
                    <TextBox
                        value={newVehicleModelName}
                        onValueChanged={(e) => setNewVehicleModelName(e.value)}
                    />
                    <RequiredRule message="Name is required" />
                </div>
            </div>
            <Button text="Save" type="default" onClick={saveNewVehicleModel} />
        </Popup>
    );
};

export default AddVehicleModel;