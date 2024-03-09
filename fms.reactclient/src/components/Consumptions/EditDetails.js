import React, { useCallback, useEffect,useState } from "react";
import  Accordion ,{Item} from "devextreme-react/accordion";
import  HistoryDetails from "./HistoryDetails";
import FormDetails from "./FormDetails";
import axios from "axios";
import ChartDetails from "./ChartDetails";
import GpsServiceAPI from "../../GpsServiceAPI";
import MapDetails from "./WrappedMapDetails";



const apiUrl = process.env.REACT_APP_FMS_API_URL;

const EditDetails = ({ editData }) => {

  //console.log ("EditForm Editting Data",editData)

  const [gpsLiveData, setGPSLiveData] = useState([]);
  const [variableData, setVariableData] = useState([]);


 // const { id } = editData.params; 

  


  const fetchGPSLiveData = async () => {
  
        try{         
          await GpsServiceAPI.login();
          const data = await GpsServiceAPI.FetchTrackData(editData.vehicleId,editData.date);
          setVariableData(data);  
          console.log("variable data",data);
      } catch(error)
      {
          console.error("Error Fetching data",error);
      }

  };


  const renderHistoryDetails = () => <HistoryDetails vehicleId={editData.vehicleId} date={editData.date} />;  
  const renderChartDetails = () => <ChartDetails vehicleId={editData.vehicleId} date={editData.date} gpsData={variableData} />;
  const renderMapDetails = () => <MapDetails vehicleId={editData.vehicleId} date={editData.date} gpsData={variableData} />;
   
  useEffect(() => {
    if (editData.vehicleId && editData.date) 
    {

fetchGPSLiveData();
    }

      }, [editData]);

  return (
    <div>

       <FormDetails editData={editData} />
      {/* Other Componets */}
      <div>

<Accordion
collapsible={true}
multiple={true}
>

  <Item title="History Details" render={renderHistoryDetails} />
  <Item title="Chart Details" render={renderChartDetails} />
  <Item title="Map Details" render={renderMapDetails}  />

</Accordion>

      </div>
    </div>
  );
}

export default EditDetails;