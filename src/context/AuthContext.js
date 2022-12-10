import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  ref,
  onValue
} from "firebase/database"
const db = getDatabase();
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState()
  const [locationDar, setLocationDar]= useState(null)
  async function login(username, password) {
    console.log(username,password)
    // return auth.signInWithEmailAndPassword(username, password)
  
  const location = window.location.hostname;
  const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
              username:username,
              password:password
          })
  };
  try {
      const fetchResponse = await fetch('https://staging-api.tracknerd.io/v1/auth/login', settings);
      const data = await fetchResponse.json();
      setCurrentUser(data.user.id)
      setToken(data.token)
      console.log(data)
      return data;
  } catch (e) {
      return e;
  }    
      
  }
   function locationD(vehicleID, VehicleregistrationNumber) {
    console.log(vehicleID, VehicleregistrationNumber)
    // return auth.signInWithEmailAndPassword(username, password)
    const employeeRef = ref(db, `1104-KA 16 D 3208/location`);
    onValue(employeeRef , (snapshot) => {
      console.log(snapshot.val());
      setLocationDar(snapshot.val())
    });
   
      
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login,token,locationD,locationDar}}>
      {children}
    </AuthContext.Provider>
  );
};
