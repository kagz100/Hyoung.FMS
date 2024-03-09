import axios from 'axios';

//login infor 

const LOGIN_URL = process.env.REACT_APP_GPSGATE_APP_LOGIN_URL;
const TRACKS_URL = process.env.REACT_APP_GPSGATE_APP_TRACK_URL;
const USERNAME = process.env.REACT_APP_GPSGATE_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_GPSGATE_APP_PASSWORD;

const login =   async () => {
    console.log("login data ");

    try{
        const response = await axios.post(LOGIN_URL, {
            username: USERNAME,
            password: PASSWORD
        },{
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
            }
        });
       const token = response.data.token;

       sessionStorage.setItem('authToken', token);
       console.log("token",token);
       return token;
    }catch(error){
        console.log("error login",error);
        throw error;
       
    }


};


const FetchTrackData = async (vehicleId,date) => {
    try{

        const token = sessionStorage.getItem('authToken');
        //parse date to yyyy-mm-dd
          const _date = new Date(date);
           const testdate = new Date("2023-08-11");
          const formattedDate = `${_date.getFullYear()}-${String(_date.getMonth() + 1).padStart(2, '0')}-${String(_date.getDate()).padStart(2, '0')}`;         

        const response = await axios.get(`${TRACKS_URL}${178}/tracks`, {
            params: {
                date: testdate,
                filtered: false
              
            },
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });

      
        return response.data;
    } catch (error) {
        console.log("Service:error fetching track data",error);
        throw error;
    }
};

export default {login,FetchTrackData};