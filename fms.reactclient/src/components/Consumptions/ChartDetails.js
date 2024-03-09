import React, { useEffect, useState } from "react";
import { Chart, Series, ArgumentAxis, ValueAxis, Tooltip, Legend, CommonAxisSettings, Crosshair, HorizontalLine, Label, VerticalLine } from "devextreme-react/chart";
import DropDownBox from 'devextreme-react/drop-down-box';
import TagBox from "devextreme-react/tag-box";
import RangeSelector, { Size, Chart as ChartOptions, Margin, Scale, Behavior, RangeSelectorTypes, } from 'devextreme-react/range-selector';
import { VisualRange } from 'devextreme-react/common/charts';

const ChartDetails = ({ editData}) => {

    const { vehicleId, date } = editData.editData;
    const [variableData, setVariableData] = useState([]);
    const [selectedVariables, setSelectedVariables] = useState([]);

    useEffect(() => {
        if (vehicleId && date) {
            console.log("fetching variable data", vehicleId, date);
          //  fetchVariableData(vehicleId, date);
        }
    }, [vehicleId, date]);







const variableNames = variableData.length > 0
    ? Object.keys(variableData[0].variables).map(key => ({ value: key, label: key }))
    : [];


console.log("variable options", variableNames);

const handleVariableSelection = (e) => {
    setSelectedVariables(e.addedItems[0]);
};

const onValueChanged = (selectedItems) => {
    setSelectedVariables(selectedItems.value);
};


const chartData = selectedVariables.flatMap(variable =>
    variableData.map(data => {
        const localtime = new Date(data.utc).toLocaleTimeString();
        const entry = {
            time: localtime,
            value: data.variables[variable],
            variable: variable,
        };
        //  console.log("Chart entry:", entry);
        return entry;
    })
).flat();
console.log("chartdata", chartData);

const crosshairFormat = {
    type: 'longTime',
    precision: 0,
}


return (
    <div>
        <div className="dx-fieldset">
            <div className="dx-field">
                <div className="dx-field-label">Select Variable</div>
                <div className="dx-field-value">
                    <TagBox
                        dataSource={variableNames}
                        valueExpr="value"
                        displayExpr="label"
                        value={selectedVariables}
                        onValueChanged={onValueChanged}
                        showSelectionControls={true}
                        applyValueMode="instantly"
                        searchEnabled={false}
                        selectAllMode=""
                        showMultiTagOnly={false}
                        show />

                </div>
            </div>
        </div>

        {selectedVariables.length > 0 && (
            <Chart dataSource={chartData} height={400} width={'100%'}>
                <ArgumentAxis argumentType="datetime" tickInterval={{ hours: 1 }} />
                <ValueAxis title={chartData.map(x => (x.variable))} />
                <Legend />
                <Tooltip enabled={true} />

                <Crosshair enabled={true}>
                    <HorizontalLine visible={true} />
                    <VerticalLine visible={true} > <Label visible={true} format={crosshairFormat} /></VerticalLine>

                </Crosshair>
                <CommonAxisSettings endOnTick={false} />
                {selectedVariables.map((variable, index) => (
                    <Series
                        key={index}
                        valueField="value"
                        argumentField="time"
                        name={variable}
                        type="line"
                    />

                ))}
            </Chart>

        )


        }

        {selectedVariables.length > 0 && (
            <RangeSelector >


            </RangeSelector>



        )}
    </div>
)

        };
export default ChartDetails;
