import React, { useEffect, useState, useCallback } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  Polyline
} from 'react-google-maps';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import '../../App.css';
import { useLocation } from 'react-router-dom';
const Map = ()=> {
  const location = useLocation();
  // console.log(location.state)
  let paths = []
  paths.push(location.state)
 console.log(paths[0].latitude)
 console.log(paths[0].longitude)
//  var path = [
//     // { lat: 18.566516, lng: -68.435996 },
//     { lat: paths[0].latitude , lng: paths[0].longitude},
    
//   ];
var path = [
  
  { lat: paths[0].latitude, lng: paths[0].longitude },
  
];

    const [progress, setProgress] = useState(null);
    const velocity = 27; // 100km per hour
    let initialDate;
    let interval = null;
    const icon1 = {
        url: "https://images.vexels.com/media/users/3/154573/isolated/preview/bd08e000a449288c914d851cb9dae110-hatchback-car-top-view-silhouette-by-vexels.png",
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 20),
        scale: 0.7,
      };
    
    const center = parseInt(path.length -1 );
    console.log(center)
    const centerPathLat = path[center].lat;
    const centerpathLng = path[center].lng ;
  
    useEffect(() => {
        calculatePath();

        return () => {
            console.log("CLEAR........");
            interval && window.clearInterval(interval);
        }
    }, [path]);

    const getDistance = () => {
        // seconds between when the component loaded and now
        const differentInTime = (new Date() - initialDate) / 1000; // pass to seconds
        return differentInTime * velocity; // d = v*t -- thanks Newton!
    };
    
    const moveObject = () => {
        const distance = getDistance();
        if (!distance) {
          return;
        }
    
        let progress = path.filter(
          (coordinates) => coordinates.distance < distance
        );
        console.log(progress)
    
        const nextLine = path.find(
          (coordinates) => coordinates.distance >distance
        );
    
        
        if (!nextLine) {
          setProgress(progress)
          window.clearInterval(interval);
          console.log("Trip Completed!! Thank You !!")
          return; // it's the end!
        }
        const lastLine = progress[progress.length - 1];
    
        const lastLineLatLng = new window.google.maps.LatLng(
          lastLine.lat,
          lastLine.lng
        );
    
        const nextLineLatLng = new window.google.maps.LatLng(
          nextLine.lat,
          nextLine.lng
        );
    
        // distance of this line
        const totalDistance = nextLine.distance - lastLine.distance;
        const percentage = (distance - lastLine.distance) / totalDistance;
    
        const position = window.google.maps.geometry.spherical.interpolate(
          lastLineLatLng,
          nextLineLatLng,
          percentage
        );

        mapUpdate();
        setProgress(progress.concat(position))
    };

    const calculatePath = () => {
        path = path.map((coordinates, i, array) => {
          if (i === 0) {
            return { ...coordinates, distance: 0 }; // it begins here!
          }
          const { lat: lat1, lng: lng1 } = coordinates;
          const latLong1 = new window.google.maps.LatLng(lat1, lng1);
    
          const { lat: lat2, lng: lng2 } = array[0];
          const latLong2 = new window.google.maps.LatLng(lat2, lng2);
    
          // in meters:
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
            latLong1,
            latLong2
          );
    
          return { ...coordinates, distance };
        });
    };
    
    const startSimulation = useCallback(
        () => {
            if(interval) {
                window.clearInterval(interval);
            }
            setProgress(null);
            initialDate = new Date();
            interval = window.setInterval(moveObject, 1000);
        },
        [interval, initialDate],
    );

    const mapUpdate = () => {
        const distance = getDistance();
        if (!distance) {
            return;
        }

        let progress = path.filter(
            (coordinates) => coordinates.distance < distance
        );

        const nextLine = path.find(
            (coordinates) => coordinates.distance > distance
        );

        let point1, point2;

        if (nextLine) {
            point1 = progress[progress.length - 1];
            point2 = nextLine;
        } else {
            // it's the end, so use the latest 2
            point1 = progress[progress.length - 2];
            point2 = progress[progress.length - 1];
        }

        const point1LatLng = new window.google.maps.LatLng(point1.lat, point1.lng);
        const point2LatLng = new window.google.maps.LatLng(point2.lat, point2.lng);

        const angle = window.google.maps.geometry.spherical.computeHeading(
            point1LatLng,
            point2LatLng
        );
        const actualAngle = angle - 90;

        const marker = document.querySelector(`[src="${icon1.url}"]`);

        if (marker) {
            // when it hasn't loaded, it's null
            marker.style.transform = `rotate(${actualAngle}deg)`;
        }
    }
    
    return(
      <Card variant="outlined">
        <div className='btnCont'>
          <Button variant="contained" onClick={startSimulation}>Start Simulation</Button>
        </div>
        
        <div className='gMapCont'>
          <GoogleMap
              defaultZoom={17}
              defaultCenter={{ lat: centerPathLat, lng: centerpathLng }}
          >
            <Polyline
                path={path}
                options={{
                strokeColor: "#0088FF",
                strokeWeight: 6,
                strokeOpacity: 0.6,
                defaultVisible: true,
                }}
            />

            {/* {paths.map((stop, index) => (

                <Marker
                    key={index}
                    position={{
                        lat: stop.lat,
                        lng: stop.lng
                    }}
                    title={stop.id}
                    label={`${index + 1}`}
                />
            ))} */}

            {progress && (
                <>
                <Polyline
                    path={progress}
                    options={{ strokeColor: "orange" }}
                />

                <Marker
                    icon={icon1}
                    position={progress[progress.length - 1]}
                />
                </>
            )}
          </GoogleMap>
        </div>
      </Card>  
      // <>dddd</>
    )
};

export default withScriptjs(
  withGoogleMap(
    Map
  )
)