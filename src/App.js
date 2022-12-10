import React, { useEffect ,useState} from 'react';
import './App.css';
import WrappedMap from './components/gMap/Map';
import {
  child,
  get,
  getDatabase,
  ref,
  onValue
} from "firebase/database";
import { Navigate, useNavigate } from 'react-router-dom';
import { Card,Typography } from '@mui/material';
import config from './components/gMap/config';
import useFetch from './hooks/useFetch';
import Header from './components/Header/Header';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LinearProgress from '@mui/material/LinearProgress';
import useGetData from './hooks/useGetData';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from '@mui/material/Collapse';
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const db = getDatabase();

 function App() {
  const [datas,setDatas]= useState (null);
  const { data: paths} = useFetch('https://61a4a0604c822c0017041d33.mockapi.io/shuttle/v1/path');
  const { data: stops } = useFetch('https://61a4a0604c822c0017041d33.mockapi.io/shuttle/v1/stops');
  const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.mapsKey}`;
  
  const [ open, setOpen ] = useState(false)
  const [patr,setPatr]= useState(null)
  const nagivate= useNavigate()
  // const [array,setArray]= useState([]);
  const handleClick = () => {
      setOpen(!open)
  }
 
   const {vehicles} = useGetData()
   console.log(vehicles,'ththhtrhaa')
   
//    useEffect(()=>{
//     const employeeRef = ref(db, `117-KA 05 AH 9754/location`);
//     onValue(employeeRef , (snapshot) => {
//       console.log(snapshot.val(),'Dash');
//       // setPaths(snapshot.val())
//       setDatas(snapshot.val())
//     });
//   },[])
//   let arr = [];

// // const obj = {name: 'Tom'};

// arr.push(datas);

// console.log(arr);

const handleGetLocation =(Id,Regno)=>{
      console.log(Id,Regno)
      
      const employeeRef = ref(db, `${Id}-${Regno}/location`);
      onValue(employeeRef , (snapshot) => {
        console.log(snapshot.val(),'Dashboard');
        // setPatr(snapshot.val())
        // let arr =[]
        // arr.push(patr)
  // console.log(arr,'rrrr')
   nagivate('/map',{state:snapshot.val()})
        // setDatas(snapshot.val())
      //  arr.push(patr)
      });
    //  setArray(patr)
    }
  
   
  return (
    <div className="App">
 
{/* {vehicles && vehicles.length >0  ? 


<>
{vehicles.map((item)=>{
return (
 item.vehicles.map((veh)=>{
 return(
  <Card style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
    <Typography >{veh.registrationNumber}</Typography>
  </Card>
 )
  
 })
)
})}
</>
     
        :null}   */}

      
      {/* { paths && stops ?
        <WrappedMap
            paths={arr}
            stops={stops}
            googleMapURL={mapURL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className='mapContainer'  />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          : 
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        } */}
        {vehicles && vehicles.length >0  ?
        <>
      <List component='nav' aria-labelledby='nested-list-subheader'>
                {vehicles.map(doc => {
                    return (
                        // <CustomizedListItem key={doc.id} doc={doc} stops={stops} mapURL={mapURL}/>
                        <div>
                        <div>
                          <ListItem  key={doc.id} onClick={handleClick}>
                              <ListItemText primary={doc.name} />
                              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </ListItem>
                          <Collapse
                              key={doc.id}
                              in={open}
                              timeout='auto'
                              unmountOnExit
                          >
                              <List component='li' disablePadding key={doc.id}>
                                  {doc.vehicles.map((sheet,index) => {
                                      return (
                                          <ListItem  key={sheet.id}>
                                              <ListItemIcon>
                                                  {/* <InsertDriveFileTwoToneIcon /> */}
                                              </ListItemIcon>
                                              <ListItemText key={index.id} primary={sheet.registrationNumber}  onClick={()=>handleGetLocation(sheet.id,sheet.registrationNumber)}/>
                                          </ListItem>
                                      )
                                  })}
                              </List>
                          </Collapse>
                          <Divider />
                        </div>
                        
                          
                      </div> 
                    )
                })}
            </List>
            </>
        :null}
      
    </div>
  );
}

export default App;
