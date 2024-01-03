
import React from 'react';
import TagBox from 'devextreme-react/tag-box';

class employeevehicleTagbox extends React.Component {
    onValueChanged = (e) => {
        this.props.data.setValue(e.value);
    }

    onSelectionChanged = (e) => {
        this.props.data.component.updateDimensions();
    }

    render() {
        return (
            <TagBox
                dataSource={this.props.data.column.lookup.dataSource}
                defaultValue={this.props.data.value}
                valueExpr="vehicleId"
                displayExpr="hyoungNo"
                showSelectionControls={true}
                maxDisplayedTags={3}
                applyValueMode="useButtons"
                searchEnabled={true}
                onValueChanged={this.onValueChanged}
                onSelectionChanged={this.onSelectionChanged}
            />
        );
    }
}

export default employeevehicleTagbox;
