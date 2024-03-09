import React, { useCallback, useEffect, useState } from "react";
//import Map from 'devextreme-react/map';
import {Map,PolyLine,GoogleApiWrapper } from 'google-maps-react';
import GpsServiceAPI from '../../GpsServiceAPI';
import { Button } from "devextreme-react/button";

const MapContainerStyle = {
    height: "500px",
    width: "100%",
    position: "relative"

}


const MapDetails = ({ vehicleId, date,google}) => {

    const [mapData, setMapData] = useState([]);
    const [center ,setCenter] = useState({ lat: 0.0236, lng: 37.9062 });
  
  const [isMapDataLoaded, setIsMapDataLoaded] = useState(false);
    
 


    const fetchMapData = useCallback(async () => {
        try {
     

            await GpsServiceAPI.login();
            const trackData = await GpsServiceAPI.FetchTrackData(vehicleId, date);
            const sortedData = trackData.sort((a, b) => new Date(a.utc) - new Date(b.utc));

            const polylinePath  = sortedData.map(item => ({
                lat: item.position.latitude,
                lng: item.position.longitude
            }));
            setMapData(polylinePath);

            if(polylinePath.length > 0){
                setCenter(polylinePath[0]);
            }

        }
        catch (error) {
            console.log("error fetching map data", error);
        }

    }, [vehicleId, date]);
    console.log("mapData", mapData);

    useEffect(() => {
        if (vehicleId && date) {
            setIsMapDataLoaded(true);
            fetchMapData();
        }
        else{
            setIsMapDataLoaded(false);
        }
    }, [vehicleId, date]);

    const clear = () => {
        
    }

   


return (
    <div>      
        <Map
        google = {google}
          MapContainerStyle={MapContainerStyle}
           zoom={8}
           center={center}
     >
        {mapData.length > 0 &&
         <PolyLine path={mapData}
           options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillcolor: "#FF0000",
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                zIndex: 1,
                fillOpacity: 0.35

              }}
         
         
         
         />}
      </Map>  
    </div>

);
    

};

export const WrappedMapDetails  = GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })(MapDetails);

  export default MapDetails;

