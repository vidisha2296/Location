import React,{useState,useEffect} from 'react'
import { useContext } from "react";
import  {AuthContext} from '../context/AuthContext'
function useGetData() {
    const [vehicles ,setVehicles] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const {token} = useContext(AuthContext)

    useEffect(async() => {
        setLoading('Loading.....');
        setVehicles(null);
        setError(null);
        const res= await fetch("https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token} `,
            },
          });
          const dataItem  = await res.json();
          console.log(dataItem.data);
          setVehicles(dataItem.data);
       
    }, [])

  return{
    vehicles
  }
}

export default useGetData