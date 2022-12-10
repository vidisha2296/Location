
import Login from "./Login";
import App from "./App";
import config from './components/gMap/config';
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import WrappedMap from './components/gMap/Map';
function Main() {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.mapsKey}`;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="/map" element={<WrappedMap 
                 googleMapURL={mapURL}
                 loadingElement={<div style={{ height: `100%` }} />}
                 containerElement={<div className='mapContainer'  />}
                 mapElement={<div style={{ height: `100%` }} />}
          />} />
          {/* <Route path="register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
