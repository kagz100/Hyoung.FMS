
import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Editing, Lookup, FilterRow, HeaderFilter } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import axios from 'axios';
import SelectBox from 'devextreme-react/select-box';
import TextArea from 'devextreme-react/text-area';

const apiUrl = "https://localhost:7009/api";

const CreateExpectedAVG = ({ selectedVehicles, numberBoxValue, selectedClassificationId }) => {
    return (
       
            <DataGrid
                dataSource={selectedVehicles.map(vehicle => ({
                    ...vehicle,
                    selectedClassificationId,
                    numberBoxValue,
                }))}
                showBorders={true}
            >
            <Column dataField="vehicleId" caption="Vehicle ID" allowEditing={false} width={100 } />
                <Column dataField="hyoungNo" caption="Hyoung No" />
            <Column dataField="expectedValue" caption="Expected Averaged"  alignment="center" />
            <Column dataField="classification" caption="Selected Classification" />
                <Column dataField="workingSiteId" caption="Working Site" />
            </DataGrid>
    
    );
};

export default CreateExpectedAVG;
