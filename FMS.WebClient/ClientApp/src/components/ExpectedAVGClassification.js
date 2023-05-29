import React from 'react';
import DataGrid, { Column, Paging, FilterRow, Sorting, ColumnChooser, ColumnFixing, Lookup, FilterPanel, SearchPanel, Editing } from 'devextreme-react/data-grid';
import axios from 'axios';
import CustomStore from 'devextreme/data/custom_store';

const apiUrl = "https://localhost:7009/api";

const ExpectedAVGClassification = () => {
    const dataSource = new CustomStore({
        key: 'id',
        load: async () => {
            const response = await axios.get(`${apiUrl}/ExpectedAVGClassification/getlist`);
            return response.data;
        },
        update: async (key, values) => {
            const originalItem = await dataSource.byKey(key);
            const updatedItem = { ...originalItem, ...values, id: key };

            console.log("updatedItem", updatedItem )
            const response = await axios.put(`${apiUrl}/ExpectedAVGClassification/update/${key}`, updatedItem);
            return response.data;
        },
        insert: async (values) => {
            const response = await axios.post(`${apiUrl}/ExpectedAVGClassification/create`, values);
            return response.data;
        },
        byKey: async (key) => {
            const response = await axios.get(`${apiUrl}/ExpectedAVGClassification/getlist`);
            const originalData = response.data.find((item) => item.id === key);
            return originalData;
        }
    });

    const onRowInserted = (e) => {
        e.component.navigateToRow(e.key);
    };

    return (
        <DataGrid dataSource={dataSource} // here
            keyExpr="id"
            showBorders={true}
            columnAutoWidth={true}
            onRowInserted={onRowInserted}
        >
            <Editing
                mode="row"
                allowUpdating={true}
                allowDeleting={false}
                selectTextOnEditStart={true}
                allowAdding={true}
                startEditAction="click"
            />

            <Column dataField="id"
                caption="ID"
                width={50}
                allowEditing={false} />
            <Column dataField="name" caption="Name" />
            <Column dataField="description" caption="Description" />
        </DataGrid>
    );
};

export default ExpectedAVGClassification;
