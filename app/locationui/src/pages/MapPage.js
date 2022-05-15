import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, getZoom, InfoWindow} from 'react-google-maps';
import { makeStyles } from "@material-ui/core/styles";
import { getTableData, getTableCount } from "api";



const PAGE_SIZE = 15;

export default function MapPage() {


  const [itemsMap, setItemsMap] = useState([]);
  const [loading, setLoading] = useState(false);

  // Number of rows which exist on the service
  const [zoominteger, setZoomInit] = useState(2);
  const [selectedMarker, setSelectedMark]= useState(null);
  



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    FilterButton: {
      marginRight: theme.spacing(8)
    },
    title: {
      marginLeft: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  
  


  const loadData = async (req, zoomi, skip = 0) => {
    try {
      setLoading(true);

      const _itemsMap = await getTableData({
        $top: PAGE_SIZE,
        $skip: skip
      });
         const itemsMapWithIds = _itemsMap.map((item, index) => {
        item.id = index;
        return item;
      });
      const itemsarr= [{"ID":3,"lat":14.16704,"lng":75.040298,"name":"Sagar_Karnataka","desc":"Branch2"},
      {"ID":14,"lat":12.9716,"lng":77.5946,"name":"Bangalore","desc":"Branch2"},
      {"ID":15,"lat":19.0760,"lng":72.8777,"name":"Mumbai","desc":"Branch2"},
      {"ID":6,"lat":8.893212,"lng":76.614143,"name":"Kollam_Kerala","desc":"Branch5"}
        
          ];
          setItemsMap(itemsMapWithIds);
          let setItem = itemsarr;

       const itemarr2=[ {"ID":66,"lat":26.2006,"lng":92.9376,"name":"Assam","desc":"Branch"},
       {"ID":77,"lat":28.2180,"lng":94.7278,"name":"Arunachal","desc":"Branch"},
       {"ID":88,"lat":22.5726,"lng":88.3639,"name":"Kolkata","desc":"Branch"}];   
       

    

    setZoomInit(zoomi);
      
    } finally {
      setLoading(false);
    }
  };

  

 

  const handlePageChanged = ({ page }) => {
    loadData(false, page * PAGE_SIZE);
  };
  const mapStyles = {
    width: '50%',
    height: '50%'
  }
  
  const markerStyle = {
    height: '50px',
    width: '50px',
    marginTop: '-50px'
  }
  
  
  const imgStyle = {
    height: '100%'
  }
  useEffect(() => {
    // when component mounted
    // loadData(true);
  }, []);

  

  function _onZoomChange(){
    const zoomi = this.getZoom();
   
    if (zoomi>=5){
     loadData(false, zoomi);
    }
    
 }
   const fnGetItems = async (req) =>{
    const _itemsMap = await getTableData({
        $top: PAGE_SIZE,
        $skip: 0
      });
         const itemsMapWithIds = _itemsMap.map((item, index) => {
        item.id = index;
        return item;
      });

   
      setItemsMap(itemsMapWithIds);
    

   };



  function Map(){
    return(
        <GoogleMap
         zoom= {zoominteger}
         center={{ lat: 21.1458, lng: 79.0882 }} 
         bootstrapURLKeys={{ key: 'AIzaSyCiSxeH-zkWE0WbH_I1iElcOaXYeF8Ecb4'}} 
         onZoomChanged={_onZoomChange}
         
         >
             <Marker
                  key={230}
                  position={{
                      lat: 20.5937,
                      lng: 78.9629
                  }}
                  />
             <Marker
                  key={240}
                  position={{
                      lat: 60.4720,
                      lng: 8.4689
                  }}
                  />
              <Marker
                  key={280}
                  position={{
                      lat: 56.1304,
                      lng: 106.3468
                  }}
                  />    
              <Marker
                  key={250}
                  position={{
                      lat: 36.2048,
                      lng: 138.2529
                  }}
                  />          

             {itemsMap.map(itemsMap=>(
                  <Marker
                  key={itemsMap.ID}
                  position={{
                      lat: itemsMap.lat,
                      lng: itemsMap.lng
                  }}
                  onClick={()=>{
                      setSelectedMark(itemsMap);
                  }}
                  />

             ))}

             {selectedMarker && (
             <InfoWindow
                position={{
                      lat: selectedMarker.lat,
                      lng: selectedMarker.lng
                  }}
                  onCloseClick={()=>{
                    setSelectedMark(null);
                   }}
                  
                  >
                      <div>
                          <h3>{selectedMarker.location}</h3>
                          <h3>ID:{selectedMarker.ID}</h3>
                          <p>Revenue($):{selectedMarker.cost}</p>
                          
                      </div>


             </InfoWindow>

             )}

         </GoogleMap>
         
    );
}

  const WrappedMap = withScriptjs(withGoogleMap(Map));

  return (
    <div style={{width: "100vw", height: "100vh"}}>
        <WrappedMap
         googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyCiSxeH-zkWE0WbH_I1iElcOaXYeF8Ecb4'}
         loadingElement = {<div style={{height: "100%"}}/>}
         containerElement = {<div style={{height: "100%"}}/>}
         mapElement = {<div style={{height: "100%"}}/>}
        />

    </div>
  );
}
