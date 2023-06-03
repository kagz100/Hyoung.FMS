import React from 'react';
import DataGrid, { Column, Paging, Scrolling,Selection } from 'devextreme-react/data-grid' 

import DropDownBox from 'devextreme-react/drop-down-box';

const dropDownOptions = { width: 200};

export default class VehicleTypeUIComponent extends React.Component {

    constructor(props) {
        super(props);
            console.log('props:', props);  // Logs the incoming props
        this.state = {
            selectedRowKeys: [props.data.value],
            isDropDownBoxOpened: false
        };
      
    };

    boxOptionChanged=(e)=> {
        if (e.name === "opened") {
            this.setState({
                isDropDownBoxOpened: e.value
            });
        }
    }

    contentRender=()=>{
        return (
            <DataGrid
                datasource={this.props.data.column.lookup.dataSource}
                            
               // remoteOperations={true}
                height={200}
                selectedRowKeys={this.state.selectedRowKeys}
                hoverStateEnable={true}
                onSelectionChanged={this.onSelectionChange}
                focusedRowEnable={true}
                defaultFocusedRowKey={this.state.selectedRowKeys[0]}

            >
                <Column dataField="id" visible={false} />
                <Column dataField="name" caption="Name" />
                <Column dataField="abbvr" caption="abbvr" />
                <Paging enabled={true} defaultPageSize={10} />
                <Scrolling mode="virtual" />
                <Selection mode="single" />

            </DataGrid>
        );
    }

    onSelectionChange = (selectionChangedArgs) => {
        console.log('selectedRowKeys:', selectionChangedArgs.selectedRowKeys); // Logs the selected row keys
        this.setState({
            selectedRowKeys: selectionChangedArgs.selectedRowKeys,
            isDropDownOpened: false,
        });
        this.props.data.setValue(this.state.selectedRowKeys[0]);
    }

    render = () => {
        console.log('DropDownBox props:', {
            onOptionChanged: this.boxOptionChanged,
            opened: this.state.isDropDownBoxOpened,
            dropDownOptions: dropDownOptions,
            dataSource: this.props.data.column.lookup.dataSource,
            value: this.state.selectedRowKeys[0],
            displayExpr: 'name',
            valueExpr: 'id',
            contentRender: this.contentRender
        });
        return (
            <DropDownBox
                onOptionChanged={this.boxOptionChanged}
                opened={this.state.isDropDownOpened}
                dropDownOptions={dropDownOptions}
                dataSource={this.props.data.column.lookup.dataSource}
                value={this.state.selectedRowKeys[0]}
                displayExpr="name"
                valueExpr="id"
                contentRender={this.contentRender}>
            </DropDownBox>
            );
        }
   }
       
